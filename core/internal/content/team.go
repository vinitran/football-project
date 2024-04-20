package content

import (
	"time"

	"github.com/google/uuid"
)

type Team struct {
	ID        uuid.UUID `db:"id,pk" json:"id"`
	Name      string    `db:"name" json:"name"`
	ShortName *string   `db:"short_name" json:"short_name"`
	Gender    string    `db:"gender" json:"gender"`
	NameCode  string    `db:"name_code" json:"name_code"`
	Logo      string    `db:"logo" json:"logo"`
	Slug      string    `db:"slug" json:"slug"`
	CreatedAt time.Time `db:"created_at" json:"created_at"`
	UpdatedAt time.Time `db:"updated_at" json:"updated_at"`
}
