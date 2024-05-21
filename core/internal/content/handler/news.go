package handler

import (
	"strings"

	"core/internal/content"
	"core/internal/content/service"
	"core/pkg/arr"
	"github.com/labstack/echo/v4"
	"github.com/samber/do"
)

type GroupNews struct {
	cfg *Config
}

func (group *GroupNews) Show(c echo.Context) error {
	ctx := c.Request().Context()
	serviceNews, err := do.Invoke[*service.ServiceNews](group.cfg.Container)
	if err != nil {
		return restAbort(c, nil, err)
	}

	item, err := serviceNews.FindByID(ctx, c.Param("id"))
	return restAbort(c, item, err)
}

func (group *GroupNews) Total(c echo.Context) error {
	ctx := c.Request().Context()
	serviceNews, err := do.Invoke[*service.ServiceNews](group.cfg.Container)
	if err != nil {
		return restAbort(c, nil, err)
	}

	var params content.NewsListParams
	if c.QueryParams().Has("search") {
		params.Search = c.QueryParam("search")
	}

	countUser, err := serviceNews.Total(ctx, params)
	return restAbort(c, countUser, err)
}

func (group *GroupNews) Index(c echo.Context) error {
	ctx := c.Request().Context()
	serviceNews, err := do.Invoke[*service.ServiceNews](group.cfg.Container)
	if err != nil {
		return restAbort(c, nil, err)
	}

	limit := queryParamInt(c, "limit", 10)
	page := queryParamInt(c, "page", 1)
	offset := (page - 1) * limit

	params := content.NewsListParams{
		CommonListParams: content.CommonListParams{
			Limit:   limit,
			Offset:  offset,
			Compact: false,
		},
		NewsIDs: []string{},
	}

	if c.QueryParams().Has("search") {
		params.Search = c.QueryParam("search")
	}

	if c.QueryParams().Has("news_ids") {
		var newsIds []string
		parts := strings.Split(c.QueryParam("news_ids"), ",")
		arr.ArrEach(parts, func(part string) {
			newsIds = append(newsIds, part)
		})
		params.NewsIDs = newsIds
	}

	items, err := serviceNews.List(ctx, params)
	return restAbort(c, items, err)
}
