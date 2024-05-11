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

func startExtracter(c *cli.Context) error {
	container, ok := c.App.Metadata["container"].(*do.Injector)
	if !ok {
		return errors.New("invalid service container")
	}

	extractor, err := do.Invoke[*service.ServiceExtractKeywords](container)
	if err != nil {
		return err
	}

	if c.String(config.FlagSchedule) == config.FlagOn {
		schedule := cron.New()
		_, err = schedule.AddFunc("@midnight", func() {
			errNews := extractor.ExtractNews()
			if errNews != nil {
				log.Println(errNews)
			}
		})
		if err != nil {
			return err
		}

		_, err = schedule.AddFunc("@midnight", func() {
			errReMatch := extractor.ExtractReviewMatchs()
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
	case config.FlagNews:
		err := extractor.ExtractNews()
		if err != nil {
			log.Println(err)
		}
	case config.FlagMatchs:
		err := extractor.ExtractMatchs()
		if err != nil {
			log.Println(err)
		}
	case config.FlagReviewMatch:
		err := extractor.ExtractReviewMatchs()
		if err != nil {
			log.Println(err)
		}
	default:
		return fmt.Errorf(`extracter: invalid extracter flags`)
	}

	return nil
}
