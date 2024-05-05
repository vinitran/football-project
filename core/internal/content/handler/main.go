package handler

import (
	"errors"
	"net/http"
	"strconv"

	"core/pkg/auth"
	"core/pkg/errorx"
	"core/pkg/httpx-echo"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/samber/do"
)

type Config struct {
	Container *do.Injector

	Origins []string
}

func New(cfg *Config) (http.Handler, error) {
	r := echo.New()

	r.IPExtractor = echo.ExtractIPFromXFFHeader()
	r.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{
		Format: "${time_rfc3339}\t${method}\t${uri}\t${status}\t${latency_human}\n",
	}))
	r.Use(middleware.Recover())

	r.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "hello world")
	})
	routesAPIv1 := r.Group("/api/v1")
	{
		cors := middleware.CORSWithConfig(middleware.CORSConfig{
			AllowOrigins:     cfg.Origins,
			AllowHeaders:     []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept, echo.HeaderAuthorization},
			AllowCredentials: true,
			AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"},
			MaxAge:           60 * 60,
		})
		routesAPIv1.Use(cors)
	}

	groupMatch := &GroupMatch{cfg}
	{
		routesAPIv1.GET("/matchs", groupMatch.Index)
		routesAPIv1.GET("/matchs/:id", groupMatch.Show)
		routesAPIv1.GET("/matchs/:id/meta", groupMatch.Meta)
	}

	groupNews := &GroupNews{cfg}
	{
		routesAPIv1.GET("/news", groupNews.Index)
		routesAPIv1.GET("/news/:id", groupNews.Show)
		routesAPIv1.GET("/news/count", groupNews.Total)
	}

	groupRecommend := &GroupRecommend{cfg}
	{
		routesAPIv1.GET("/recommend/:id", groupRecommend.GetByUser)
		routesAPIv1.GET("/recommend/:id/:category", groupRecommend.GetByUserAndCategory)
		routesAPIv1.GET("/recommend/popular/:category", groupRecommend.GetPopularByItem)

		routesAPIv1.POST("/recommend/feedback", groupRecommend.CreateFeedback)

		routesAPIv1.GET("/news/:id/neighbors", groupRecommend.GetByItem)
		routesAPIv1.GET("/news/:id/neighbors/:category", groupRecommend.GetByItemAndCategory)
	}

	groupRematch := &GroupReviewMatch{cfg}
	{
		routesAPIv1.GET("/rematchs", groupRematch.Index)
		routesAPIv1.GET("/rematchs/:id", groupRematch.Show)
		routesAPIv1.GET("/rematchs/count", groupRematch.Total)
	}

	return r, nil
}

func restAbort(c echo.Context, v any, err error) error {
	if errors.Is(err, auth.ErrInvalidSession) {
		return httpx.Abort(c, errorx.Wrap(err, errorx.Authn))
	}

	if _, ok := err.(*errorx.Error); ok {
		return httpx.Abort(c, err)
	}

	if err != nil {
		return httpx.Abort(c, errorx.Wrap(err, errorx.Service))
	}

	return httpx.Abort(c, v)
}

func queryParamInt(c echo.Context, name string, val int) int {
	v := c.QueryParam(name)
	if v == "" {
		return val
	}

	i, err := strconv.Atoi(v)
	if err != nil {
		return val
	}

	return i
}
