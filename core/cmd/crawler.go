package main

import (
	"errors"
	"fmt"
	"log"

	"github.com/robfig/cron/v3"

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

	if c.String(config.FlagSchedule) == config.FlagOn {
		schedule := cron.New()
		_, err := schedule.AddFunc("@every 30s", func() {
			errMatch := crawler.CrawlMatch()
			if errMatch != nil {
				log.Println(errMatch)
			}
		})
		if err != nil {
			return err
		}

		_, err = schedule.AddFunc("@midnight", func() {
			from := 1
			to := 3
			errNews := crawler.CrawlNews(&from, &to)
			if errNews != nil {
				log.Println(errNews)
			}
		})
		if err != nil {
			return err
		}

		_, err = schedule.AddFunc("@midnight", func() {
			from := 1
			to := 3
			errReMatch := crawler.CrawlReviewMatch(&from, &to)
			if errReMatch != nil {
				log.Println(errReMatch)
			}
		})
		if err != nil {
			return err
		}

		schedule.Run()
		return nil
	}

	switch c.String(config.FlagTable) {
	case config.FlagMatchs:
		err = crawler.CrawlMatch()
		if err != nil {
			log.Println(err)
		}
	case config.FlagNews:
		err = crawler.CrawlNews(nil, nil)
		if err != nil {
			log.Println(err)
		}
	case config.FlagReviewMatch:
		err = crawler.CrawlReviewMatch(nil, nil)
		if err != nil {
			log.Println(err)
		}
	default:
		return fmt.Errorf(`crawler: invalid crawler flags`)
	}

	return nil
}
