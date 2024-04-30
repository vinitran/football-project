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

type ServiceNews struct {
	container     *do.Injector
	dataStoreNews content.DatastoreNews
	cache         db.Cache
}

func cacheKeyNewsByIDOrSlug(v string) string {
	return fmt.Sprintf("news:%v", v)
}

func NewServiceNews(container *do.Injector) (*ServiceNews, error) {
	dataStoreNews, err := do.Invoke[content.DatastoreNews](container)
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

	return &ServiceNews{container, dataStoreNews, cache}, nil
}

func (service *ServiceNews) List(ctx context.Context, params content.NewsListParams) ([]*content.News, error) {
	items, err := db.UseCache(ctx, service.cache, fmt.Sprintf("news:%s", params), 12*time.Second, func() ([]*content.News, error) {
		return service.dataStoreNews.List(ctx, params)
	})
	return items, err
}

func (service *ServiceNews) FindByID(ctx context.Context, id string) (*content.News, error) {
	return db.UseCache(ctx, service.cache, cacheKeyNewsByIDOrSlug(id), time.Minute, func() (*content.News, error) {
		return service.dataStoreNews.FindByID(ctx, id)
	})
}
