package handler

import (
	"core/internal/content"
	"core/internal/content/service"
	"core/pkg/errorx"
	"errors"
	"github.com/labstack/echo/v4"
	"github.com/samber/do"
)

type GroupMatch struct {
	cfg *Config
}

func (group *GroupMatch) Show(c echo.Context) error {
	ctx := c.Request().Context()
	serviceMatch, err := do.Invoke[*service.ServiceMatch](group.cfg.Container)
	if err != nil {
		return restAbort(c, nil, err)
	}

	item, err := serviceMatch.FindByUID(ctx, c.Param("id"))
	return restAbort(c, item, err)
}

func (group *GroupMatch) Index(c echo.Context) error {
	ctx := c.Request().Context()
	serviceMatch, err := do.Invoke[*service.ServiceMatch](group.cfg.Container)
	if err != nil {
		return restAbort(c, nil, err)
	}

	limit := queryParamInt(c, "limit", 10)
	page := queryParamInt(c, "page", 1)
	offset := (page - 1) * limit

	params := content.MatchListParams{
		CommonListParams: content.CommonListParams{
			Limit:   limit,
			Offset:  offset,
			Compact: false,
		},
	}

	if c.QueryParams().Has("search") {
		params.Search = c.QueryParam("search")
	}

	if c.QueryParams().Has("status") {
		v := content.MatchStatus(c.QueryParam("status"))
		if !v.Valid() {
			return restAbort(c, nil, errorx.Wrap(errors.New("invalid params: status"), errorx.Validation))
		}

		params.Status = v
	}

	if c.QueryParams().Has("is_featured") {
		params.IsFeatured = true
	}

	items, err := serviceMatch.List(ctx, params)
	return restAbort(c, items, err)
}

func (group *GroupMatch) Meta(c echo.Context) error {
	ctx := c.Request().Context()
	serviceMatch, err := do.Invoke[*service.ServiceMatch](group.cfg.Container)
	if err != nil {
		return restAbort(c, nil, err)
	}

	id := c.Param("id")

	items, err := serviceMatch.ListMeta(ctx, id)
	return restAbort(c, items, err)
}
