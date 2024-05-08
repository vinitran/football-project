package handler

import (
	"github.com/google/uuid"
	"time"

	"core/pkg/auth"

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
	var payload FeedbackPayload
	if err := c.Bind(&payload); err != nil {
		return restAbort(c, nil, errorx.Wrap(err, errorx.Invalid))
	}

	serviceRecommender, err := do.Invoke[*service.ServiceRecommender](group.cfg.Container)
	if err != nil {
		return restAbort(c, nil, err)
	}

	sub, err := auth.ResolveValidSubjectUUID(ctx)
	if err != nil {
		return restAbort(c, nil, err)
	}

	feedback := service.Feedback{
		FeedbackType: payload.FeedbackType,
		UserId:       sub.String(),
		ItemId:       payload.ItemId,
		Timestamp:    time.Now().String(),
	}

	err = serviceRecommender.InsertFeedback(ctx, []service.Feedback{feedback})
	return restAbort(c, "inserted feedback", err)
}

func (group *GroupRecommend) CreateFeedbackWithoutAuth(c echo.Context) error {
	ctx := c.Request().Context()
	var payload FeedbackPayload
	if err := c.Bind(&payload); err != nil {
		return restAbort(c, nil, errorx.Wrap(err, errorx.Invalid))
	}

	serviceRecommender, err := do.Invoke[*service.ServiceRecommender](group.cfg.Container)
	if err != nil {
		return restAbort(c, nil, err)
	}

	feedback := service.Feedback{
		FeedbackType: payload.FeedbackType,
		UserId:       uuid.New().String(),
		ItemId:       payload.ItemId,
		Timestamp:    time.Now().String(),
	}

	err = serviceRecommender.InsertFeedback(ctx, []service.Feedback{feedback})
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

	category := c.Param("category")

	limit := queryParamInt(c, "limit", 10)

	serviceRecommender, err := do.Invoke[*service.ServiceRecommender](group.cfg.Container)
	if err != nil {
		return restAbort(c, nil, err)
	}

	sub, err := auth.ResolveValidSubjectUUID(ctx)
	if err != nil {
		return restAbort(c, nil, err)
	}

	items, err := serviceRecommender.GetRecommend(ctx, sub.String(), category, limit)
	return restAbort(c, items, err)
}

func (group *GroupRecommend) GetByItem(c echo.Context) error {
	ctx := c.Request().Context()

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

func (group *GroupRecommend) GetPopularByItem(c echo.Context) error {
	ctx := c.Request().Context()

	category := c.Param("category")

	limit := queryParamInt(c, "limit", 10)

	serviceRecommender, err := do.Invoke[*service.ServiceRecommender](group.cfg.Container)
	if err != nil {
		return restAbort(c, nil, err)
	}

	items, err := serviceRecommender.GetPopularItem(ctx, category, limit)
	return restAbort(c, items, err)
}

type FeedbackPayload struct {
	FeedbackType string `json:"FeedbackType"`
	ItemId       string `json:"ItemId"`
}
