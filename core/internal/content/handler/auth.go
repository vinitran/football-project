package handler

import (
	"fmt"
	"time"

	b "core/internal/content/bob"
	"core/internal/content/service"
	"core/internal/db"
	"core/pkg/auth"
	"core/pkg/errorx"
	"core/pkg/jwtx"

	"github.com/aarondl/opt/omit"
	"github.com/aarondl/opt/omitnull"
	"github.com/labstack/echo/v4"
	"github.com/redis/go-redis/v9"
	"github.com/samber/do"
)

type GroupAuth struct {
	cfg *Config
}

func (group *GroupAuth) Login(c echo.Context) error {
	var payload UserLoginPayload
	if err := c.Bind(&payload); err != nil {
		return restAbort(c, nil, errorx.Wrap(err, errorx.Invalid))
	}

	err := payload.validate()
	if err != nil {
		return restAbort(c, nil, err)
	}

	serviceUser, err := do.Invoke[*service.ServiceUser](group.cfg.Container)
	if err != nil {
		return restAbort(c, nil, err)
	}

	isExistUSer, err := serviceUser.ExistByUsername(c.Request().Context(), payload.Username.GetOrZero())
	if err != nil {
		return restAbort(c, nil, err)
	}

	if !isExistUSer {
		return restAbort(c, "user is invalid", err)
	}

	passwordHash, err := serviceUser.PasswordByUsername(c.Request().Context(), payload.Username.GetOrZero())
	if err != nil {
		return restAbort(c, nil, err)
	}

	err = auth.CheckPasswordHash(passwordHash, payload.Password.GetOrZero())
	if err != nil {
		return restAbort(c, nil, err)
	}

	serviceJWTAuthority, err := do.Invoke[*jwtx.Authority](group.cfg.Container)
	if err != nil {
		return restAbort(c, nil, err)
	}

	dbRedis, err := do.Invoke[*redis.Client](group.cfg.Container)
	if err != nil {
		return restAbort(c, nil, err)
	}

	cache, err := db.NewCacheRedis(dbRedis)
	if err != nil {
		return restAbort(c, nil, err)
	}

	tokenSigned, err := db.UseCache(c.Request().Context(), cache, fmt.Sprintf("jwt: %s", payload.Username.GetOrZero()), 24*time.Hour, func() (string, error) {
		_, tokenSigned, err := serviceJWTAuthority.IssueToken(c.Request().Context(), payload.Username.GetOrZero(), nil, nil)
		if err != nil {
			return "", err
		}
		return tokenSigned, nil
	})

	return restAbort(c, tokenSigned, err)
}

func (group *GroupAuth) Register(c echo.Context) error {
	var payload UserRegisterPayload
	if err := c.Bind(&payload); err != nil {
		return restAbort(c, nil, errorx.Wrap(err, errorx.Invalid))
	}

	err := payload.validate()
	if err != nil {
		return restAbort(c, nil, err)
	}

	serviceUser, err := do.Invoke[*service.ServiceUser](group.cfg.Container)
	if err != nil {
		return restAbort(c, nil, err)
	}

	usernameExists, err := serviceUser.ExistByUsername(c.Request().Context(), payload.Username.GetOrZero())
	if err != nil {
		return restAbort(c, nil, err)
	}

	if usernameExists {
		return restAbort(c, "username is already exists", err)
	}

	if payload.Email.GetOrZero() == "" {
		emailExists, err := serviceUser.ExistByEmail(c.Request().Context(), payload.Email.GetOrZero())
		if err != nil {
			return restAbort(c, nil, err)
		}

		if emailExists {
			return restAbort(c, "email is already exists", err)
		}
	}

	password, err := auth.Hash(payload.Password.GetOrZero())
	if err != nil {
		return restAbort(c, nil, err)
	}

	userSetter := &b.UserInforSetter{
		Username: payload.Username,
		Name:     payload.Name,
		Email:    payload.Email,
		Password: omit.From(password),
	}

	user, err := serviceUser.Create(c.Request().Context(), userSetter)
	return restAbort(c, user, err)
}

type UserRegisterPayload struct {
	Username omit.Val[string]     `json:"username" validate:"required,min=3,max=255"`
	Name     omit.Val[string]     `json:"name" validate:"required,min=3,max=255"`
	Email    omitnull.Val[string] `json:"email"`
	Password omit.Val[string]     `json:"password" validate:"required,min=8,max=32"`
}

func (u UserRegisterPayload) validate() error {
	if u.Username.GetOrZero() == "" || u.Name.GetOrZero() == "" || u.Password.GetOrZero() == "" {
		return errorx.Invalid
	}
	return nil
}

type UserLoginPayload struct {
	Username omit.Val[string] `json:"username" validate:"required,min=3,max=255"`
	Password omit.Val[string] `json:"password" validate:"required,min=8,max=32"`
}

func (u UserLoginPayload) validate() error {
	if u.Username.GetOrZero() == "" || u.Password.GetOrZero() == "" {
		return errorx.Invalid
	}
	return nil
}
