package main

import (
	"errors"
	"log"
	"os"
	"os/signal"

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

	quit := make(chan os.Signal, 1)

	go func() {
		err := crawler.Exec()
		if err != nil {
			log.Printf("ListenAndServe failed: %s\n", err)
			quit <- os.Kill
		}
	}()

	signal.Notify(quit, os.Interrupt)
	<-quit

	return nil
}
