package handler

import (
	"core/internal/content/service"
	"github.com/labstack/echo/v4"
	"github.com/samber/do"
)

type GroupUser struct {
	cfg *Config
}

func (group *GroupUser) ShowMe(c echo.Context) error {
	ctx := c.Request().Context()
	serviceUser, err := do.Invoke[*service.ServiceUser](group.cfg.Container)
	if err != nil {
		return restAbort(c, nil, err)
	}

	item, err := serviceUser.Show(ctx)
	if err != nil {
		return restAbort(c, nil, err)
	}

	return restAbort(c, item, err)
}
