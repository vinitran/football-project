package service

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"core/internal/content"
	b "core/internal/content/bob"
	"core/internal/db"
	"github.com/aarondl/opt/omit"
	"github.com/aarondl/opt/omitnull"
	"github.com/redis/go-redis/v9"
	"github.com/samber/do"
	"github.com/stephenafamo/bob/types"
)

type ServiceCrawler struct {
	ServiceHTTP
	container           *do.Injector
	datastoreMatch      content.DatastoreMatch
	datastoreTeam       content.DatastoreTeam
	datastoreTournament content.DatastoreTournament
	datastoreNews       content.DatastoreNews
	cache               db.Cache
}

func NewServiceCrawler(container *do.Injector) (*ServiceCrawler, error) {
	datastoreMatch, err := do.Invoke[content.DatastoreMatch](container)
	if err != nil {
		return nil, err
	}

	datastoreTeam, err := do.Invoke[content.DatastoreTeam](container)
	if err != nil {
		return nil, err
	}

	datastoreNews, err := do.Invoke[content.DatastoreNews](container)
	if err != nil {
		return nil, err
	}

	datastoreTournament, err := do.Invoke[content.DatastoreTournament](container)
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

	return &ServiceCrawler{
		container:           container,
		datastoreMatch:      datastoreMatch,
		datastoreTeam:       datastoreTeam,
		datastoreTournament: datastoreTournament,
		datastoreNews:       datastoreNews,
		cache:               cache,
	}, nil
}

func (service *ServiceCrawler) CrawlMatch() error {
	url := "https://live.vebo.xyz/api/match/live"
	resp, err := service.httpClient(3).Get(url, http.Header{
		"content-type": []string{"application/json"},
	})
	if err != nil {
		return err
	}
	defer resp.Body.Close()
	var responseBody MatchResponse

	err = json.NewDecoder(resp.Body).Decode(&responseBody)
	if err != nil {
		return err
	}

	payload := responseBody.Data
	if payload == nil || len(payload) == 0 {
		return nil
	}

	var matchSetter []*b.MatchSetter
	var teamSetter []*b.TeamSetter
	var tournamentSetter []*b.TournamentSetter

	for _, p := range payload {
		teamSetter = append(teamSetter,
			&b.TeamSetter{
				ID:        p.Home.ID,
				Name:      p.Home.Name,
				ShortName: p.Home.ShortName,
				Gender:    p.Home.Gender,
				NameCode:  p.Home.NameCode,
				Logo:      p.Home.Logo,
				Slug:      p.Home.Slug,
				CreatedAt: omit.From(time.Now()),
				UpdatedAt: omit.From(time.Now()),
			}, &b.TeamSetter{
				ID:        p.Away.ID,
				Name:      p.Away.Name,
				ShortName: p.Away.ShortName,
				Gender:    p.Away.Gender,
				NameCode:  p.Away.NameCode,
				Logo:      p.Away.Logo,
				Slug:      p.Away.Slug,
				CreatedAt: omit.From(time.Now()),
				UpdatedAt: omit.From(time.Now()),
			})
		tournamentSetter = append(tournamentSetter, &b.TournamentSetter{
			ID:         p.Tournament.UniqueTournament.ID,
			Name:       p.Tournament.UniqueTournament.Name,
			Slug:       p.Tournament.UniqueTournament.Slug,
			Logo:       p.Tournament.UniqueTournament.Logo,
			IsFeatured: p.Tournament.UniqueTournament.IsFeatured,
			Priority:   p.Tournament.UniqueTournament.Priority,
			CreatedAt:  omit.From(time.Now()),
			UpdatedAt:  omit.From(time.Now()),
		})
		matchSetter = append(matchSetter, &b.MatchSetter{
			ID:           p.ID,
			Name:         p.Name,
			Slug:         p.Slug,
			Date:         p.Date,
			Timestamp:    p.Timestamp,
			HomeRedCards: p.HomeRedCards,
			AwayRedCards: p.AwayRedCards,
			HomeID:       p.Home.ID,
			AwayID:       p.Away.ID,
			TournamentID: p.Tournament.UniqueTournament.ID,
			Scores:       p.Scores,
			WinCode:      p.WinCode,
			MatchStatus:  p.MatchStatus,
			SportType:    p.SportType,
			HasLineup:    p.HasLineup,
			HasTracker:   p.HasTracker,
			IsFeatured:   p.IsFeatured,
			ThumbnailURL: p.ThumbnailURL,
			IsLive:       p.IsLive,
			LiveTracker:  p.LiveTracker,
			CreatedAt:    omit.From(time.Now()),
			UpdatedAt:    omit.From(time.Now()),
		})
	}

	_, err = service.datastoreTeam.UpsertMany(context.Background(), RemoveDuplicatesTeam(teamSetter))
	if err != nil {
		return err
	}

	_, err = service.datastoreTournament.UpsertMany(context.Background(), RemoveDuplicatesTournament(tournamentSetter))
	if err != nil {
		return err
	}

	_, err = service.datastoreMatch.UpsertMany(context.Background(), RemoveDuplicatesMatch(matchSetter))
	if err != nil {
		return err
	}

	return nil
}

func (service *ServiceCrawler) CrawlNews() error {
	index := 1
	for {
		url := fmt.Sprintf("https://api.vebo.xyz/api/news/vebotv/list/news/%d", index)
		resp, err := service.httpClient(3).Get(url, http.Header{
			"content-type": []string{"application/json"},
		})
		if err != nil {
			return err
		}
		defer resp.Body.Close()
		var responseBody NewsResponseData

		err = json.NewDecoder(resp.Body).Decode(&responseBody)
		if err != nil {
			return err
		}

		payload := responseBody.Data.List
		if payload == nil || len(payload) == 0 {
			return nil
		}

		for _, p := range payload {
			err := service.CrawlNewsDetail(p.ID.GetOrZero())
			if err != nil {
				return err
			}
		}

		index++
	}
}

func (service *ServiceCrawler) CrawlNewsDetail(id string) error {
	url := fmt.Sprintf("https://api.vebo.xyz/api/news/vebotv/detail/%s", id)

	resp, err := service.httpClient(3).Get(url, http.Header{
		"content-type": []string{"application/json"},
	})
	if err != nil {
		return err
	}
	defer resp.Body.Close()
	var responseBody DetailNewsResponseData

	err = json.NewDecoder(resp.Body).Decode(&responseBody)
	if err != nil {
		return err
	}

	payload := responseBody.Data

	newsSetter := &b.NewsInforSetter{
		ID:           payload.ID,
		Name:         payload.Name,
		Slug:         payload.Slug,
		Link:         payload.Link,
		Description:  payload.Description,
		FeatureImage: payload.FeatureImage,
		Title:        payload.Title,
		Content:      payload.Content,
		Author:       payload.Author,
		Category:     payload.Category,
		VideoURL:     payload.VideoURL,
		CreatedAt:    payload.CreatedAt,
		UpdatedAt:    payload.UpdatedAt,
	}

	_, err = service.datastoreNews.Upsert(context.Background(), newsSetter)
	if err != nil {
		return err
	}

	return nil
}

func RemoveDuplicatesTeam(input []*b.TeamSetter) []*b.TeamSetter {
	encountered := map[string]bool{}
	var result []*b.TeamSetter

	for _, item := range input {

		if !encountered[item.ID.GetOrZero()] {
			encountered[item.ID.GetOrZero()] = true
			result = append(result, item)
		}
	}

	return result
}

func RemoveDuplicatesTournament(input []*b.TournamentSetter) []*b.TournamentSetter {
	encountered := map[string]bool{}
	var result []*b.TournamentSetter

	for _, item := range input {
		if !encountered[item.ID.GetOrZero()] {
			encountered[item.ID.GetOrZero()] = true
			result = append(result, item)
		}
	}

	return result
}

func RemoveDuplicatesMatch(input []*b.MatchSetter) []*b.MatchSetter {
	encountered := map[string]bool{}
	var result []*b.MatchSetter

	for _, item := range input {
		if !encountered[item.ID.GetOrZero()] {
			encountered[item.ID.GetOrZero()] = true
			result = append(result, item)
		}
	}

	return result
}

type MatchResponse struct {
	Status int                  `json:"status"`
	Data   []*MatchResponseData `json:"data,omitempty"`
}

type MatchResponseData struct {
	ID           omit.Val[string]                      `json:"id" validate:"required,min=3,max=255"`
	Name         omit.Val[string]                      `json:"name" validate:"required,min=3,max=255"`
	Slug         omit.Val[string]                      `json:"slug" validate:"required,min=3,max=255,slug"`
	Date         omit.Val[string]                      `json:"date" validate:"required,min=3,max=255,date"`
	Timestamp    omit.Val[int64]                       `json:"timestamp" validate:"timestamp"`
	HomeRedCards omit.Val[int]                         `json:"home_red_cards" validate:"home_red_cards"`
	AwayRedCards omit.Val[int]                         `json:"away_red_cards" validate:"away_red_cards"`
	Scores       omit.Val[types.JSON[json.RawMessage]] `json:"scores"`
	WinCode      omitnull.Val[int]                     `json:"win_code" `
	MatchStatus  omit.Val[b.MatchStatus]               `json:"match_status" `
	SportType    omitnull.Val[string]                  `json:"sport_type" validate:"required,min=3,max=255,sport_type"`
	HasLineup    omitnull.Val[bool]                    `json:"has_lineup"`
	HasTracker   omitnull.Val[bool]                    `json:"has_tracker"`
	IsFeatured   omitnull.Val[bool]                    `json:"is_featured"`
	ThumbnailURL omitnull.Val[string]                  `json:"thumbnail_url" validate:"required,min=3,max=255,thumbnail_url"`
	IsLive       omitnull.Val[bool]                    `json:"is_live"`
	LiveTracker  omitnull.Val[string]                  `json:"live_tracker" validate:"required,min=3,max=255,live_tracker"`

	Home       TeamResponseData       `json:"home"`
	Away       TeamResponseData       `json:"away"`
	Tournament TournamentResponseData `json:"tournament"`
}

func (item MatchResponseData) String() string {
	str, _ := json.Marshal(item)
	return string(str)
}

type TeamResponseData struct {
	ID        omit.Val[string]     `json:"id,pk" validate:"required,min=3,max=255"`
	Name      omit.Val[string]     `json:"name" validate:"required,min=3,max=255,name"`
	ShortName omitnull.Val[string] `json:"short_name" validate:"required,min=3,max=255,short_name"`
	Gender    omitnull.Val[string] `json:"gender" validate:"required,min=3,max=255, gender"`
	NameCode  omitnull.Val[string] `json:"name_code" validate:"required,min=3,max=255, name_code"`
	Logo      omit.Val[string]     `json:"logo" validate:"required,min=3,max=255,logo"`
	Slug      omitnull.Val[string] `json:"slug" validate:"required,min=3,max=255,slug"`
}

type TournamentResponseData struct {
	UniqueTournament struct {
		ID         omit.Val[string] `json:"id,pk" validate:"required,min=3,max=255"`
		Name       omit.Val[string] `json:"name" validate:"required,min=3,max=255,name"`
		Slug       omit.Val[string] `json:"slug" validate:"required,min=3,max=255,slug"`
		Logo       omit.Val[string] `json:"logo" validate:"required,min=3,max=255,logo"`
		IsFeatured omit.Val[bool]   `json:"is_featured"`
		Priority   omit.Val[int]    `json:"priority"`
	} `json:"unique_tournament"`
}

type NewsResponseData struct {
	Status int `json:"status"`
	Data   struct {
		Page      int        `json:"page"`
		Limit     int        `json:"limit"`
		Total     int        `json:"total"`
		Highlight any        `json:"highlight"`
		List      []NewsData `json:"list"`
	} `json:"data"`
}

type DetailNewsResponseData struct {
	Status int      `json:"status"`
	Data   NewsData `json:"data"`
}

type NewsData struct {
	ID           omit.Val[string]                      `json:"id"`
	Name         omit.Val[string]                      `json:"name"`
	Slug         omit.Val[string]                      `json:"slug"`
	Link         omitnull.Val[string]                  `json:"link"`
	Description  omit.Val[string]                      `json:"description"`
	FeatureImage omit.Val[string]                      `json:"feature_image"`
	Category     omit.Val[types.JSON[json.RawMessage]] `json:"category"`
	Title        omit.Val[string]                      `json:"title"`
	Content      omitnull.Val[string]                  `json:"content"`
	Author       omitnull.Val[string]                  `json:"author"`
	VideoURL     omitnull.Val[string]                  `json:"video_url"`
	CreatedAt    omit.Val[time.Time]                   `json:"created_at"`
	UpdatedAt    omit.Val[time.Time]                   `json:"updated_at"`
}

func (item NewsResponseData) String() string {
	str, _ := json.Marshal(item)
	return string(str)
}
