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
		for {
			err := crawler.CrawlMatch()
			if err != nil {
				log.Printf("ListenAndServe failed: %s\n", err)
				quit <- os.Kill
			}
			log.Println("crawling...")
			time.Sleep(5 * time.Minute)
		}
	}()
	go func() {
		err := crawler.CrawlNews()
		if err != nil {
			log.Printf("ListenAndServe failed: %s\n", err)
			quit <- os.Kill
		}
		log.Println("crawling...")
	}()

	signal.Notify(quit, os.Interrupt)
	<-quit

	return nil
}
