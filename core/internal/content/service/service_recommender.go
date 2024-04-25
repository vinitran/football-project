package service

import (
	"context"
	"core/pkg/arr"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"
	"time"

	"core/internal/config"

	"github.com/gojek/heimdall/v7/httpclient"
	"github.com/samber/do"
)

type ServiceRecommender struct {
	container *do.Injector
	cfg       *config.Config
	ServiceHTTP
}

func NewServiceRecommender(container *do.Injector) (*ServiceRecommender, error) {
	cfg, err := do.Invoke[*config.Config](container)
	if err != nil {
		return nil, err
	}

	return &ServiceRecommender{
		container: container,
		cfg:       cfg,
	}, nil
}

func (service *ServiceRecommender) InsertFeedback(ctx context.Context, feedbacks []Feedback) error {
	url := fmt.Sprintf("%s:%s/api/feedback", service.cfg.Recommender.Host, service.cfg.Recommender.Port)
	_, err := request[RowAffected](ctx, service.httpClient(3), "POST", url, feedbacks)
	return err
}

func (service *ServiceRecommender) GetRecommend(ctx context.Context, userId, category string, n int) ([]string, error) {
	url := fmt.Sprintf("%s:%s/api/recommend/%s/%s?n=%d", service.cfg.Recommender.Host, service.cfg.Recommender.Port, userId, category, n)
	items, err := request[[]string, any](ctx, service.httpClient(3), "GET", url, nil)
	if err != nil {
		return nil, err
	}

	return items, nil
}

func (service *ServiceRecommender) GetNeighborsItem(ctx context.Context, itemId, category string, n int) ([]string, error) {
	url := fmt.Sprintf("%s:%s/api/item/%s/neighbors/%s?n=%d", service.cfg.Recommender.Host, service.cfg.Recommender.Port, itemId, category, n)
	items, err := request[[]Score, any](ctx, service.httpClient(3), "GET", url, nil)
	if err != nil {
		return nil, err
	}

	var result []string
	arr.ArrEach(items, func(item Score) {
		result = append(result, item.Id)
	})

	return result, nil
}

func request[Response any, Body any](ctx context.Context, c *httpclient.Client, method, url string, body Body) (result Response, err error) {
	bodyByte, marshalErr := json.Marshal(body)
	if marshalErr != nil {
		return result, marshalErr
	}
	var req *http.Request
	req, err = http.NewRequestWithContext(ctx, method, url, strings.NewReader(string(bodyByte)))
	if err != nil {
		return result, err
	}
	req.Header.Set("Content-Type", "application/json")
	resp, err := c.Do(req)
	if err != nil {
		return result, err
	}
	defer resp.Body.Close()
	buf := new(strings.Builder)
	_, err = io.Copy(buf, resp.Body)
	if err != nil {
		return result, err
	}
	if resp.StatusCode != http.StatusOK {
		return result, ErrorMessage(buf.String())
	}
	err = json.Unmarshal([]byte(buf.String()), &result)
	if err != nil {
		return result, err
	}
	return result, err
}

type Feedback struct {
	FeedbackType string `json:"FeedbackType"`
	UserId       string `json:"UserId"`
	ItemId       string `json:"ItemId"`
	Timestamp    string `json:"Timestamp"`
}

type ErrorMessage string

func (e ErrorMessage) Error() string {
	return string(e)
}

type RowAffected struct {
	RowAffected int `json:"RowAffected"`
}

type Score struct {
	Id    string `json:"Id"`
	Score int    `json:"Score"`
}

type User struct {
	UserId    string   `json:"UserId"`
	Labels    []string `json:"Labels"`
	Subscribe []string `json:"Subscribe"`
	Comment   string   `json:"Comment"`
}

type UserPatch struct {
	Labels    []string
	Subscribe []string
	Comment   *string
}

type Item struct {
	ItemId     string   `json:"ItemId"`
	IsHidden   bool     `json:"IsHidden"`
	Labels     []string `json:"Labels"`
	Categories []string `json:"Categories"`
	Timestamp  string   `json:"Timestamp"`
	Comment    string   `json:"Comment"`
}

type ItemPatch struct {
	IsHidden   *bool
	Categories []string
	Timestamp  *time.Time
	Labels     []string
	Comment    *string
}
