package content

import (
	"time"
)

type Tournament struct {
	ID         string    `db:"id,pk" json:"id"`
	Name       string    `db:"name"  json:"name""`
	Slug       string    `db:"slug"  json:"slug""`
	Logo       string    `db:"logo"  json:"logo""`
	IsFeatured bool      `db:"is_featured"  json:"is_featured"`
	Priority   int       `db:"priority"  json:"priority"`
	CreatedAt  time.Time `db:"created_at"  json:"created_at"`
	UpdatedAt  time.Time `db:"updated_at"  json:"updated_at"`
}
