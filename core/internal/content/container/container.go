package container

import (
	"net/http"

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
	return injector
}

func ProvideRouter(i *do.Injector) (http.Handler, error) {
	return handler.New(&handler.Config{
		Container: i,
		Origins:   []string{"*"},
	})
}
