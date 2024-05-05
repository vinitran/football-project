package service

import (
	"context"
	"core/internal/content"
	b "core/internal/content/bob"
	"core/internal/db"
	"fmt"
	"github.com/google/uuid"
	"github.com/redis/go-redis/v9"
	"github.com/samber/do"
	"time"
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

func (service *ServiceUser) PasswordByUsername(ctx context.Context, username string) (string, error) {
	return service.datastoreUser.PasswordByUsername(ctx, username)
}

func (service *ServiceUser) Create(ctx context.Context, params *b.UserInforSetter) (*content.User, error) {
	return service.datastoreUser.Create(ctx, params)
}
