package handler

import (
	"errors"
	"strings"

	"core/pkg/arr"

	"core/internal/content"
	"core/internal/content/service"
	"core/pkg/errorx"

	"github.com/labstack/echo/v4"
	"github.com/samber/do"
)

type GroupReviewMatch struct {
	cfg *Config
}

func (group *GroupReviewMatch) Show(c echo.Context) error {
	ctx := c.Request().Context()
	serviceReviewMatch, err := do.Invoke[*service.ServiceReviewMatch](group.cfg.Container)
	if err != nil {
		return restAbort(c, nil, err)
	}

	item, err := serviceReviewMatch.FindByUID(ctx, c.Param("id"))
	return restAbort(c, item, err)
}

func (group *GroupReviewMatch) Index(c echo.Context) error {
	ctx := c.Request().Context()
	serviceReviewMatch, err := do.Invoke[*service.ServiceReviewMatch](group.cfg.Container)
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

	if c.QueryParams().Has("rematch_ids") {
		var rematchIds []string
		parts := strings.Split(c.QueryParam("rematch_ids"), ",")
		arr.ArrEach(parts, func(part string) {
			rematchIds = append(rematchIds, part)
		})
		params.Ids = rematchIds
	}

	items, err := serviceReviewMatch.List(ctx, params)
	return restAbort(c, items, err)
}

func (group *GroupReviewMatch) Total(c echo.Context) error {
	ctx := c.Request().Context()
	serviceReviewMatch, err := do.Invoke[*service.ServiceReviewMatch](group.cfg.Container)
	if err != nil {
		return restAbort(c, nil, err)
	}

	var params content.MatchListParams
	if c.QueryParams().Has("search") {
		params.Search = c.QueryParam("search")
	}

	countUser, err := serviceReviewMatch.Total(ctx, params)
	return restAbort(c, countUser, err)
}
