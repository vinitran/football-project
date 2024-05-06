package service

import (
	"context"
	"core/pkg/auth"
	"fmt"
	"time"

	"core/internal/content"
	b "core/internal/content/bob"
	"core/internal/db"

	"github.com/google/uuid"
	"github.com/redis/go-redis/v9"
	"github.com/samber/do"
)

type ServiceUser struct {
	container     *do.Injector
	datastoreUser content.DatastoreUser
	cache         db.Cache
}

func cacheKeyUserByID(id string) string {
	return fmt.Sprintf("user:%v", id)
}

func NewServiceUser(container *do.Injector) (*ServiceUser, error) {
	datastoreUser, err := do.Invoke[content.DatastoreUser](container)
	if err != nil {
		return nil, err
	}

	dbRedis, err := do.Invoke[*redis.Client](container)
	if err != nil {
		return nil, err
	}

	cache, err := db.NewCacheRedis(dbRedis)
	if err != nil {
		return nil, err
	}

	return &ServiceUser{container, datastoreUser, cache}, nil
}

func (service *ServiceUser) Show(ctx context.Context) (*content.User, error) {
	sub, err := auth.ResolveValidSubjectUUID(ctx)
	if err != nil {
		return nil, err
	}

	user, err := service.FindUID(ctx, sub)
	if err != nil {
		return nil, err
	}

	user.Password = ""
	return user, nil
}

func (service *ServiceUser) FindUID(ctx context.Context, id uuid.UUID) (*content.User, error) {
	return db.UseCache(ctx, service.cache, cacheKeyUserByID(id.String()), 12*time.Second, func() (*content.User, error) {
		return service.datastoreUser.FindByID(ctx, id)
	})
}

func (service *ServiceUser) FindByEmail(ctx context.Context, email string) (*content.User, error) {
	return db.UseCache(ctx, service.cache, cacheKeyUserByID(email), 12*time.Second, func() (*content.User, error) {
		return service.datastoreUser.FindByEmail(ctx, email)
	})
}

func (service *ServiceUser) FindByUsername(ctx context.Context, username string) (*content.User, error) {
	return db.UseCache(ctx, service.cache, cacheKeyUserByID(username), 12*time.Second, func() (*content.User, error) {
		return service.datastoreUser.FindByUsername(ctx, username)
	})
}

func (service *ServiceUser) ExistByUsername(ctx context.Context, username string) (bool, error) {
	return service.datastoreUser.ExistByUsername(ctx, username)
}

func (service *ServiceUser) ExistByEmail(ctx context.Context, email string) (bool, error) {
	return service.datastoreUser.ExistByEmail(ctx, email)
}

func (service *ServiceUser) Create(ctx context.Context, params *b.UserInforSetter) (*content.User, error) {
	return service.datastoreUser.Create(ctx, params)
}
