package handler

import (
	"core/internal/content/service"
	"core/pkg/errorx"
	"github.com/labstack/echo/v4"
	"github.com/samber/do"
)

type GroupRecommend struct {
	cfg *Config
}

func (group *GroupRecommend) CreateFeedback(c echo.Context) error {
	ctx := c.Request().Context()
	var payload service.Feedback
	if err := c.Bind(&payload); err != nil {
		return restAbort(c, nil, errorx.Wrap(err, errorx.Invalid))
	}

	serviceRecommender, err := do.Invoke[*service.ServiceRecommender](group.cfg.Container)
	if err != nil {
		return restAbort(c, nil, err)
	}

	err = serviceRecommender.InsertFeedback(ctx, []service.Feedback{payload})
	return restAbort(c, "inserted feedback", err)
}

func (group *GroupRecommend) GetByUser(c echo.Context) error {
	ctx := c.Request().Context()

	userId := c.Param("id")

	serviceRecommender, err := do.Invoke[*service.ServiceRecommender](group.cfg.Container)
	if err != nil {
		return restAbort(c, nil, err)
	}

	items, err := serviceRecommender.GetRecommend(ctx, userId, "", 10)
	return restAbort(c, items, err)
}

func (group *GroupRecommend) GetByUserAndCategory(c echo.Context) error {
	ctx := c.Request().Context()

	userId := c.Param("id")
	category := c.Param("category")

	limit := queryParamInt(c, "limit", 10)

	serviceRecommender, err := do.Invoke[*service.ServiceRecommender](group.cfg.Container)
	if err != nil {
		return restAbort(c, nil, err)
	}

	items, err := serviceRecommender.GetRecommend(ctx, userId, category, limit)
	return restAbort(c, items, err)
}
