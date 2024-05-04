package handler

import (
	"core/internal/content/service"
	"core/pkg/errorx"
	"github.com/labstack/echo/v4"
	"github.com/samber/do"
	"log"
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
	limit := queryParamInt(c, "limit", 10)

	serviceRecommender, err := do.Invoke[*service.ServiceRecommender](group.cfg.Container)
	if err != nil {
		return restAbort(c, nil, err)
	}

	items, err := serviceRecommender.GetRecommend(ctx, userId, "", limit)
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

func (group *GroupRecommend) GetByItem(c echo.Context) error {
	ctx := c.Request().Context()
	log.Println("item")
	itemId := c.Param("id")

	limit := queryParamInt(c, "limit", 10)

	serviceRecommender, err := do.Invoke[*service.ServiceRecommender](group.cfg.Container)
	if err != nil {
		return restAbort(c, nil, err)
	}

	items, err := serviceRecommender.GetNeighborsItem(ctx, itemId, "", limit)
	return restAbort(c, items, err)
}

func (group *GroupRecommend) GetByItemAndCategory(c echo.Context) error {
	ctx := c.Request().Context()

	itemId := c.Param("id")
	category := c.Param("category")

	limit := queryParamInt(c, "limit", 10)

	serviceRecommender, err := do.Invoke[*service.ServiceRecommender](group.cfg.Container)
	if err != nil {
		return restAbort(c, nil, err)
	}

	items, err := serviceRecommender.GetNeighborsItem(ctx, itemId, category, limit)
	return restAbort(c, items, err)
}

//
//INSERT INTO items (item_id, labels, time_stamp, categories)
//SELECT id, labels, created_at, '["rematch"]'::jsonb
//FROM review_matchs;
