package main

import (
	"core/internal/content/service"
	"errors"
	"log"
	"os"
	"os/signal"
	"time"

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

	quit := make(chan os.Signal, 1)

	go func() {
		for {
			err := extractor.ExtractNews()
			if err != nil {
				log.Println(err)
				quit <- os.Kill
			}
			log.Println("crawling...")
			time.Sleep(5 * time.Minute)
		}
	}()

	signal.Notify(quit, os.Interrupt)
	<-quit

	return nil
}
