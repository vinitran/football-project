package main

import (
	"errors"
	"fmt"
	"log"

	"core/internal/config"
	"core/internal/content/service"

	"github.com/samber/do"
	"github.com/urfave/cli/v2"
)

func startCrawler(c *cli.Context) error {
	container, ok := c.App.Metadata["container"].(*do.Injector)
	if !ok {
		return errors.New("invalid service container")
	}

	crawler, err := do.Invoke[*service.ServiceCrawler](container)
	if err != nil {
		return err
	}

	switch c.String(config.FlagTable) {
	case config.FlagMatchs:
		err = crawler.CrawlMatch()
		if err != nil {
			log.Println(err)
		}
	case config.FlagNews:
		err = crawler.CrawlNews()
		if err != nil {
			log.Println(err)
		}
	case config.FlagReviewMatch:
		err = crawler.CrawlReviewMatch()
		if err != nil {
			log.Println(err)
		}
	default:
		return fmt.Errorf(`crawler: invalid crawler flags`)
	}

	return nil
}
