package service

import (
	"context"
	"core/internal/content"
	"core/internal/db"
	"fmt"
	"github.com/redis/go-redis/v9"
	"github.com/samber/do"
	"time"
)

type ServiceMatch struct {
	container      *do.Injector
	datastoreMatch content.DatastoreMatch
	cache          db.Cache
}

func cacheKeyMatchByIDOrSlug(v string) string {
	return fmt.Sprintf("match:%v", v)
}

func NewServiceMatch(container *do.Injector) (*ServiceMatch, error) {
	datastoreMatch, err := do.Invoke[content.DatastoreMatch](container)
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

	return &ServiceMatch{container, datastoreMatch, cache}, nil
}

//func (service *ServiceMatch) Create(ctx context.Context, params *b.MatchSetter) (*content.Match, error) {
//	return service.datastoreMatch.Create(ctx, params)
//}

func (service *ServiceMatch) FindByUID(ctx context.Context, id string) (*content.Match, error) {
	return db.UseCache(ctx, service.cache, cacheKeyMatchByIDOrSlug(id), time.Minute, func() (*content.Match, error) {
		return service.datastoreMatch.FindByID(ctx, id)
	})
}
