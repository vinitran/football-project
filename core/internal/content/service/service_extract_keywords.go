package service

import (
	"bytes"
	"context"
	"fmt"
	"io"
	"log"
	"net/http"
	"strings"

	"core/internal/content"
	"core/internal/db"

	"github.com/redis/go-redis/v9"
	"github.com/samber/do"
)

type ServiceExtractKeywords struct {
	ServiceHTTP
	container       *do.Injector
	datastoreNews   content.DatastoreNews
	datastoreMatchs content.DatastoreMatch
	cache           db.Cache
}

func NewServiceExtractKeyword(container *do.Injector) (*ServiceExtractKeywords, error) {
	datastoreNews, err := do.Invoke[content.DatastoreNews](container)
	if err != nil {
		return nil, err
	}

	datastoreMatchs, err := do.Invoke[content.DatastoreMatch](container)
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
		container:       container,
		datastoreNews:   datastoreNews,
		datastoreMatchs: datastoreMatchs,
		cache:           cache,
	}, nil
}

func (service *ServiceExtractKeywords) ExtractNews() error {
	page := 1
	limit := 100
	for {
		params := content.NewsListParams{
			CommonListParams: content.CommonListParams{
				Limit:   limit,
				Offset:  (page - 1) * limit,
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
			err := service.ExtractNewsDescription(context.Background(), item.ID, item.Name)
			if err != nil {
				return err
			}
		}
		page++
	}
}

func (service *ServiceExtractKeywords) ExtractMatchs() error {
	page := 1
	limit := 100
	for {
		params := content.MatchListParams{

			CommonListParams: content.CommonListParams{
				Limit:   limit,
				Offset:  (page - 1) * limit,
				Compact: true,
			},
		}
		items, err := service.datastoreMatchs.List(context.Background(), params)
		if err != nil {
			return err
		}

		if items == nil || len(items) == 0 {
			return nil
		}

		for _, item := range items {
			err := service.ExtractMatchsDescription(context.Background(), item.ID, item.Name)
			if err != nil {
				return err
			}
		}
		page++
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

	keyword := strings.ReplaceAll(strings.ReplaceAll(string(a), "- ", ""), ", ", "\n")
	keywordList := strings.Split(strings.ReplaceAll(keyword, "Keywords: ", ""), "\n")

	_, err = service.datastoreNews.UpdateLabelByID(ctx, id, keywordList)
	if err != nil {
		log.Println(id)
		return err
	}

	return nil
}

func (service *ServiceExtractKeywords) ExtractMatchsDescription(ctx context.Context, id, description string) error {
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

	keyword := strings.ReplaceAll(strings.ReplaceAll(string(a), "- ", ""), ", ", "\n")
	keywordWithoutKeyWordText := strings.ReplaceAll(keyword, "Keywords: ", "")
	keywordList := strings.Split(keywordWithoutKeyWordText, "\n")

	_, err = service.datastoreMatchs.UpdateLabelByID(ctx, id, keywordList)
	if err != nil {
		log.Println(id)
		return err
	}

	return nil
}
