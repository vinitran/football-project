package main

import (
	"context"
	"log"
	"os"

	"core/internal/config"
	"core/internal/content/container"
	"github.com/urfave/cli/v2"
)

const (
	appName = "football-core"
	//cfgPath = "/app/config.toml"
	cfgPath = "./internal/config/test.config.toml"
)

var (
	ctx               = context.Background()
	configAddressFlag = cli.StringFlag{
		Name:     config.FlagAddress,
		Value:    "0.0.0.0:3030",
		Usage:    "Configuration Address",
		Required: false,
	}
	configMigrateActionFlag = cli.StringFlag{
		Name:     config.FlagMigrateAction,
		Value:    "up",
		Usage:    "Configuration up or down in migration",
		Required: true,
	}
	configFileFlag = cli.StringFlag{
		Name:     config.FlagCfg,
		Aliases:  []string{"c"},
		Usage:    "Configuration `FILE`",
		Required: false,
	}
)

func main() {
	cfg, err := config.Load(cfgPath)
	if err != nil {
		log.Fatal(err)
	}
	ctn := container.NewContainer(cfg)

	app := cli.NewApp()
	app.Name = appName
	flags := []cli.Flag{
		&configFileFlag,
	}
	app.Metadata = map[string]any{
		"container": ctn,
	}
	app.Commands = []*cli.Command{
		{
			Name:    "api",
			Aliases: []string{},
			Usage:   "Run the api",
			Action:  startAPIServer,
			Flags:   append(flags, &configAddressFlag),
		},
		{
			Name:    "migration",
			Aliases: []string{},
			Usage:   "Run the migration",
			Action:  startMigration,
			Flags:   append(flags, &configMigrateActionFlag),
		},
		{
			Name:    "crawler",
			Aliases: []string{},
			Usage:   "Run the crawler",
			Action:  startCrawler,
			Flags:   append(flags),
		},
	}

	err = app.Run(os.Args)
	if err != nil {
		log.Fatal(err)
		os.Exit(1)
	}
}
