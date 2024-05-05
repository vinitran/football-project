package content

import (
	"time"

	"github.com/google/uuid"
)

type User struct {
	ID        uuid.UUID `db:"id" json:"id,omitempty"`
	Email     *string   `db:"email" json:"-"`
	Username  string    `db:"username" json:"username,omitempty"`
	Name      string    `db:"name" json:"name,omitempty"`
	Password  string    `db:"password" json:"password,omitempty"`
	CreatedAt time.Time `db:"created_at" json:"-"`
	UpdatedAt time.Time `db:"updated_at" json:"-"`
}