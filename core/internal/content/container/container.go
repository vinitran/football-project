package container

import (
	"net/http"

	"core/internal/content"
	"core/internal/content/datastore"
	"core/internal/content/service"

	"core/internal/config"
	"core/internal/content/handler"
	"core/internal/db"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/redis/go-redis/v9"
	"github.com/samber/do"
)

func NewContainer(cfg *config.Config) *do.Injector {
	injector := do.New()

	do.ProvideValue(injector, cfg)

	do.Provide(injector, func(i *do.Injector) (*pgxpool.Pool, error) {
		return db.NewSQLDB(cfg.Database)
	})
	do.Provide(injector, func(i *do.Injector) (*redis.Client, error) {
		return db.NewRedis(cfg.Redis), nil
	})

	do.Provide(injector, ProvideRouter)

	do.Provide(injector, ProvideDatastoreMatch)
	do.Provide(injector, ProvideDatastoreTeam)
	do.Provide(injector, ProvideDatastoreTournament)
	do.Provide(injector, ProvideDatastoreNews)

	do.Provide(injector, ProvideServiceMatch)
	do.Provide(injector, ProvideServiceTeam)
	do.Provide(injector, ProvideServiceTournament)
	do.Provide(injector, ProvideServiceNews)

	do.Provide(injector, ProvideServiceCrawler)

	return injector
}

func ProvideRouter(i *do.Injector) (http.Handler, error) {
	return handler.New(&handler.Config{
		Container: i,
		Origins:   []string{"*"},
	})
}

func ProvideDatastoreMatch(i *do.Injector) (content.DatastoreMatch, error) {
	pool, err := do.Invoke[*pgxpool.Pool](i)
	if err != nil {
		return nil, err
	}

	return datastore.NewDatastoreMatch(pool)
}

func ProvideDatastoreTeam(i *do.Injector) (content.DatastoreTeam, error) {
	pool, err := do.Invoke[*pgxpool.Pool](i)
	if err != nil {
		return nil, err
	}

	return datastore.NewDatastoreTeam(pool)
}

func ProvideDatastoreTournament(i *do.Injector) (content.DatastoreTournament, error) {
	pool, err := do.Invoke[*pgxpool.Pool](i)
	if err != nil {
		return nil, err
	}

	return datastore.NewDatastoreTournament(pool)
}

func ProvideDatastoreNews(i *do.Injector) (content.DatastoreNews, error) {
	pool, err := do.Invoke[*pgxpool.Pool](i)
	if err != nil {
		return nil, err
	}

	return datastore.NewDatastoreNews(pool)
}

func ProvideServiceMatch(i *do.Injector) (*service.ServiceMatch, error) {
	return service.NewServiceMatch(i)
}

func ProvideServiceTeam(i *do.Injector) (*service.ServiceTeam, error) {
	return service.NewServiceTeam(i)
}

func ProvideServiceNews(i *do.Injector) (*service.ServiceNews, error) {
	return service.NewServiceNews(i)
}

func ProvideServiceCrawler(i *do.Injector) (*service.ServiceCrawler, error) {
	return service.NewServiceCrawler(i)
}

func ProvideServiceTournament(i *do.Injector) (*service.ServiceTournament, error) {
	return service.NewServiceTournament(i)
}
