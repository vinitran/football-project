package service

import (
	"bytes"
	"context"
	"core/internal/content"
	"core/internal/db"
	"fmt"
	"github.com/redis/go-redis/v9"
	"github.com/samber/do"
	"io"
	"log"
	"net/http"
	"regexp"
	"strings"
)

type ServiceExtractKeywords struct {
	ServiceHTTP
	container     *do.Injector
	datastoreNews content.DatastoreNews
	cache         db.Cache
}

func NewServiceExtractKeyword(container *do.Injector) (*ServiceExtractKeywords, error) {
	datastoreNews, err := do.Invoke[content.DatastoreNews](container)
	if err != nil {
		return nil, err
	}

	dbRedis, err := do.Invoke[*redis.Client](container)
	if err != nil {
		return nil, err
	}

	cache, err := db.NewCacheRedis(dbRedis)
	if err != nil {
		return nil, err
	}

	return &ServiceExtractKeywords{
		container:     container,
		datastoreNews: datastoreNews,
		cache:         cache,
	}, nil
}

func (service *ServiceExtractKeywords) ExtractNews() error {
	for {
		params := content.NewsListParams{
			CommonListParams: content.CommonListParams{
				Limit:   100,
				Offset:  1,
				Compact: true,
			},
		}
		items, err := service.datastoreNews.List(context.Background(), params)
		if err != nil {
			return err
		}

		if items == nil || len(items) == 0 {
			return nil
		}

		for _, item := range items {
			err := service.ExtractNewsDescription(context.Background(), item.ID, item.Description)
			if err != nil {
				return err
			}
		}

	}
}
func (service *ServiceExtractKeywords) ExtractNewsDescription(ctx context.Context, id, description string) error {
	data := []byte(fmt.Sprintf(`{"text": "%s","locale":"en"}`, description)) // Data to be sent in the request body
	url := "https://wordcount.com/api/extract_keywords"

	resp, err := service.httpClient(3).Post(url, bytes.NewBuffer(data), http.Header{
		"content-type": []string{"application/json"},
	})
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	a, err := io.ReadAll(resp.Body)
	if err != nil {
		return err
	}

	re := regexp.MustCompile(`keywords: ([^,]+)`)

	match := re.FindStringSubmatch(string(a))

	var keywordList []string
	if len(match) > 1 {
		keywords := match[1]
		keywordList = regexp.MustCompile(`,\s*`).Split(keywords, -1)
	} else {
		keyword := strings.ReplaceAll(strings.ReplaceAll(string(a), "- ", ""), ", ", "\n")
		keywordList = strings.Split(keyword, "\n")
		fmt.Println("No keywords found")
	}

	_, err = service.datastoreNews.UpdateLabelByID(ctx, id, keywordList)
	if err != nil {
		log.Println(id)
		return err
	}

	return nil
}
