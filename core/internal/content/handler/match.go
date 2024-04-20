package handler

import (
	"core/internal/content/service"
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
