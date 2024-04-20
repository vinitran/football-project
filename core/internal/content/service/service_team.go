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

type ServiceTeam struct {
	container     *do.Injector
	datastoreTeam content.DatastoreTeam
	cache         db.Cache
}

func cacheKeyTeamByIDOrSlug(v string) string {
	return fmt.Sprintf("team:%v", v)
}

func NewServiceTeam(container *do.Injector) (*ServiceTeam, error) {
	datastoreTeam, err := do.Invoke[content.DatastoreTeam](container)
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

	return &ServiceTeam{container, datastoreTeam, cache}, nil
}

//func (service *ServiceTeam) Create(ctx context.Context, params *b.TeamSetter) (*content.Team, error) {
//	return service.datastoreTeam.Create(ctx, params)
//}

func (service *ServiceTeam) FindByUID(ctx context.Context, id string) (*content.Team, error) {
	return db.UseCache(ctx, service.cache, cacheKeyTeamByIDOrSlug(id), time.Minute, func() (*content.Team, error) {
		return service.datastoreTeam.FindByID(ctx, id)
	})
}
