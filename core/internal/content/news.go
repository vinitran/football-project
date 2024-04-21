package content

import (
	"encoding/json"
	"time"
)

type News struct {
	ID           string          `db:"id,pk" json:"id"`
	Name         string          `db:"name" json:"name"`
	Slug         string          `db:"slug" json:"slug"`
	Link         string          `db:"link" json:"link"`
	Description  string          `db:"description" json:"description"`
	FeatureImage string          `db:"feature_image" json:"feature_image"`
	Title        string          `db:"title" json:"title"`
	Content      *string         `db:"content" json:"content"`
	Author       *string         `db:"author" json:"author"`
	Category     json.RawMessage `db:"category" json:"category"`
	VideoURL     *string         `db:"video_url" json:"video_url"`
	CreatedAt    time.Time       `db:"created_at" json:"created_at"`
	UpdatedAt    time.Time       `db:"updated_at" json:"updated_at"`
}
