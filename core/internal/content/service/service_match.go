package service

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"core/internal/content"
	"core/internal/db"

	"github.com/redis/go-redis/v9"
	"github.com/samber/do"
)

type ServiceMatch struct {
	ServiceHTTP
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

	return &ServiceMatch{
		container:      container,
		datastoreMatch: datastoreMatch,
		cache:          cache,
	}, nil
}

func (service *ServiceMatch) FindByUID(ctx context.Context, id string) (*content.Match, error) {
	return db.UseCache(ctx, service.cache, cacheKeyMatchByIDOrSlug(id), time.Minute, func() (*content.Match, error) {
		return service.datastoreMatch.FindByID(ctx, id)
	})
}

func (service *ServiceMatch) List(ctx context.Context, params content.MatchListParams) ([]*content.Match, error) {
	items, err := db.UseCache(ctx, service.cache, fmt.Sprintf("matchs:%s", params), 12*time.Second, func() ([]*content.Match, error) {
		return service.datastoreMatch.List(ctx, params)
	})
	return items, err
}

func (service *ServiceMatch) ListMeta(ctx context.Context, id string) (*MetaMatchData, error) {
	return db.UseCache(ctx, service.cache, fmt.Sprintf("metamatchs:%s", id), 12*time.Second, func() (*MetaMatchData, error) {
		url := fmt.Sprintf("https://api.vebo.xyz/api/match/%s/meta", id)
		resp, err := service.httpClient(3).Get(url, http.Header{
			"content-type": []string{"application/json"},
		})
		if err != nil {
			return nil, err
		}
		defer resp.Body.Close()

		var responseBody MetaMatchResponse

		err = json.NewDecoder(resp.Body).Decode(&responseBody)
		if err != nil {
			return nil, err
		}

		return responseBody.Data, nil
	})
}

type MetaMatchResponse struct {
	Status int            `json:"status"`
	Data   *MetaMatchData `json:"data"`
}

type MetaMatchData struct {
	HasLineup    bool `json:"has_lineup"`
	HasTracker   bool `json:"has_tracker"`
	Commentators []struct {
		ID     string `json:"id"`
		Name   string `json:"name"`
		Avatar string `json:"avatar"`
		URL    string `json:"url"`
	} `json:"commentators"`
	PlayUrls []struct {
		Name string `json:"name"`
		Cdn  string `json:"cdn"`
		URL  string `json:"url"`
		Role string `json:"role"`
	} `json:"play_urls"`
	ID string `json:"id"`
}
