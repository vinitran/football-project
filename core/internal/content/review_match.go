package content

import (
	"encoding/json"
	"time"
)

type ReviewMatch struct {
	ID           string          `db:"id,pk" json:"id"`
	Name         string          `db:"name" json:"name"`
	Slug         string          `db:"slug" json:"slug"`
	Description  string          `db:"description" json:"description"`
	VideoUrl     string          `db:"video_url" json:"video_url"`
	FeatureImage string          `db:"feature_image" json:"feature_image"`
	Category     json.RawMessage `db:"category" json:"category"`
	Content      string          `db:"content" json:"content"`
	Title        string          `db:"title" json:"title"`
	H1           string          `db:"h1" json:"h1"`

	CreatedAt time.Time `db:"created_at" json:"created_at"`
	UpdatedAt time.Time `db:"updated_at" json:"updated_at"`
}
