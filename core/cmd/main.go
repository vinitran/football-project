package main

import (
	"context"
	"log"
	"os"
	"strings"

	"github.com/joho/godotenv"

	"core/internal/config"
	"core/internal/content/container"
	"github.com/urfave/cli/v2"
)

const (
	appName = "football-core"
	envPath = ".env.local,.env"
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
	configExtracterActionFlag = cli.StringFlag{
		Name:     config.FlagTable,
		Value:    "news",
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

func init() {
	err := godotenv.Load(strings.Split(envPath, ",")...)
	if err != nil {
		log.Fatal("Error loading .env file")
	}
}

func main() {
	cfg, err := config.Load(os.Getenv("CONFIG_PATH"))
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
			Flags:   append(flags, &configExtracterActionFlag),
		},
		{
			Name:    "extracter",
			Aliases: []string{},
			Usage:   "Run the crawler",
			Action:  startExtracter,
			Flags:   append(flags, &configExtracterActionFlag),
		},
	}

	err = app.Run(os.Args)
	if err != nil {
		log.Fatal(err)
		os.Exit(1)
	}
}
