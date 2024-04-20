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

type ServiceTournament struct {
	container           *do.Injector
	datastoreTournament content.DatastoreTournament
	cache               db.Cache
}

func cacheKeyTournamentByIDOrSlug(v string) string {
	return fmt.Sprintf("tournament:%v", v)
}

func NewServiceTournament(container *do.Injector) (*ServiceTournament, error) {
	datastoreTournament, err := do.Invoke[content.DatastoreTournament](container)
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

	return &ServiceTournament{container, datastoreTournament, cache}, nil
}

//func (service *ServiceTournament) Create(ctx context.Context, params *b.TournamentSetter) (*content.Tournament, error) {
//	return service.datastoreTournament.Create(ctx, params)
//}

func (service *ServiceTournament) FindByUID(ctx context.Context, id string) (*content.Tournament, error) {
	return db.UseCache(ctx, service.cache, cacheKeyTournamentByIDOrSlug(id), time.Minute, func() (*content.Tournament, error) {
		return service.datastoreTournament.FindByID(ctx, id)
	})
}
