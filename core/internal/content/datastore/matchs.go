package datastore

import (
	"context"
	"github.com/aarondl/opt/omit"
	"github.com/google/uuid"
	"time"

	b "core/internal/content/bob"
)

type DatastoreMatchPgx struct {
	pool        PGXPool
	bobExecutor BobExecutor
}

func (ds *DatastoreMatchPgx) Create(ctx context.Context, params *b.MatchSetter) (*b.Match, error) {
	params.ID = omit.From(uuid.New())
	params.CreatedAt = omit.From(time.Now())
	params.UpdatedAt = omit.From(time.Now())
	return b.MatchsTable.Insert(ctx, ds.bobExecutor, params)
}

func (ds *DatastoreMatchPgx) FindByID(ctx context.Context, id uuid.UUID) (*b.Match, error) {
	item, err := b.FindMatch(ctx, ds.bobExecutor, id)
	if err != nil {
		return nil, err
	}

	return item, nil
}
