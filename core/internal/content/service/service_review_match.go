package service

import (
	"context"
	"fmt"
	"time"

	"core/internal/content"
	"core/internal/db"

	"github.com/redis/go-redis/v9"
	"github.com/samber/do"
)

type ServiceReviewMatch struct {
	ServiceHTTP
	container            *do.Injector
	datastoreReviewMatch content.DatastoreReviewMatch
	cache                db.Cache
}

func cacheKeyReviewMatchByIDOrSlug(v string) string {
	return fmt.Sprintf("match:%v", v)
}

func NewServiceReviewMatch(container *do.Injector) (*ServiceReviewMatch, error) {
	datastoreReviewMatch, err := do.Invoke[content.DatastoreReviewMatch](container)
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

	return &ServiceReviewMatch{
		container:            container,
		datastoreReviewMatch: datastoreReviewMatch,
		cache:                cache,
	}, nil
}

func (service *ServiceReviewMatch) FindByUID(ctx context.Context, id string) (*content.ReviewMatch, error) {
	return db.UseCache(ctx, service.cache, cacheKeyReviewMatchByIDOrSlug(id), time.Minute, func() (*content.ReviewMatch, error) {
		return service.datastoreReviewMatch.FindByID(ctx, id)
	})
}

func (service *ServiceReviewMatch) List(ctx context.Context, params content.MatchListParams) ([]*content.ReviewMatch, error) {
	items, err := db.UseCache(ctx, service.cache, fmt.Sprintf("review_matchs:%s", params), 12*time.Second, func() ([]*content.ReviewMatch, error) {
		return service.datastoreReviewMatch.List(ctx, params)
	})
	return items, err
}

func (service *ServiceReviewMatch) Total(ctx context.Context, params content.MatchListParams) (int, error) {
	cacheKey := cacheKeyReviewMatchByIDOrSlug("total")
	if params.Search != "" {
		cacheKey = cacheKeyReviewMatchByIDOrSlug(fmt.Sprintf("total, search %s", params.Search))
	}
	return db.UseCache(ctx, service.cache, cacheKey, time.Minute, func() (int, error) {
		return service.datastoreReviewMatch.Count(ctx, params)
	})
}
