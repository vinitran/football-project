package datastore

import (
	"context"
	"github.com/aarondl/opt/omit"
	"github.com/google/uuid"
	"time"

	b "core/internal/content/bob"
)

type DatastoreTeamPgx struct {
	pool        PGXPool
	bobExecutor BobExecutor
}

func (ds *DatastoreTeamPgx) Create(ctx context.Context, params *b.TeamSetter) (*b.Team, error) {
	params.ID = omit.From(uuid.New())
	params.CreatedAt = omit.From(time.Now())
	params.UpdatedAt = omit.From(time.Now())
	return b.TeamsTable.Insert(ctx, ds.bobExecutor, params)
}

func (ds *DatastoreTeamPgx) FindByID(ctx context.Context, id uuid.UUID) (*b.Team, error) {
	item, err := b.FindTeam(ctx, ds.bobExecutor, id)
	if err != nil {
		return nil, err
	}

	return item, nil
}
