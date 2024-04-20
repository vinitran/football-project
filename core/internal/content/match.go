package content

import (
	"encoding/json"
	"time"

	models "core/internal/content/bob"
)

type Match struct {
	ID           string             `db:"id,pk" json:"id"`
	IDSync       string             `db:"id_sync" json:"id_sync"`
	Name         string             `db:"name" json:"name"`
	Slug         string             `db:"slug" json:"slug"`
	Date         string             `db:"date" json:"date"`
	Timestamp    int64              `db:"timestamp" json:"timestamp"`
	HomeRedCards int                `db:"home_red_cards" json:"home_red_cards"`
	AwayRedCards int                `db:"away_red_cards" json:"away_red_cards"`
	HomeID       string             `db:"home_id" json:"home_id"`
	AwayID       string             `db:"away_id" json:"away_id"`
	TournamentID string             `db:"tourament_id" json:"tourament_id"`
	Scores       json.RawMessage    `db:"scores" json:"scores"`
	WinCode      *int               `db:"win_code" json:"win_code"`
	MatchStatus  models.MatchStatus `db:"match_status" json:"match_status"`
	SportType    *string            `db:"sport_type" json:"sport_type"`
	HasLineup    *bool              `db:"has_line_up" json:"has_line_up"`
	HasTracker   *bool              `db:"has_tracker" json:"has_tracker"`
	IsFeatured   *bool              `db:"is_featured" json:"is_featured"`
	ThumbnailURL *string            `db:"thumbnail_url" json:"thumbnail_url"`
	Commentators *string            `db:"commentators" json:"commentators"`
	IsLive       *bool              `db:"is_live" json:"is_live"`
	LiveTracker  *string            `db:"live_tracker" json:"live_tracker"`
	CreatedAt    time.Time          `db:"created_at" json:"created_at"`
	UpdatedAt    time.Time          `db:"updated_at" json:"updated_at"`

	Tournament *Tournament `db:"-" json:"tournament,omitempty"`
	Home       *Team       `db:"home_team" json:"home,omitempty"`
	Away       *Team       `db:"away_team" json:"away,omitempty"`
}
