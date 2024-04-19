package datastore

import (
	"context"
	"github.com/aarondl/opt/omit"
	"github.com/google/uuid"
	"time"

	b "core/internal/content/bob"
)

type DatastoreTouramentPgx struct {
	pool        PGXPool
	bobExecutor BobExecutor
}

func (ds *DatastoreTouramentPgx) Create(ctx context.Context, params *b.TournamentSetter) (*b.Tournament, error) {
	params.ID = omit.From(uuid.New())
	params.CreatedAt = omit.From(time.Now())
	params.UpdatedAt = omit.From(time.Now())
	return b.TournamentsTable.Insert(ctx, ds.bobExecutor, params)
}

func (ds *DatastoreTouramentPgx) FindByID(ctx context.Context, id uuid.UUID) (*b.Tournament, error) {
	item, err := b.FindTournament(ctx, ds.bobExecutor, id)
	if err != nil {
		return nil, err
	}

	return item, nil
}
