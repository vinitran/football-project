package datastore

import (
	"context"
	"core/internal/content"
	b "core/internal/content/bob"
	"core/pkg/arr"
	"github.com/stephenafamo/bob"
	"github.com/stephenafamo/bob/dialect/psql/dialect"
)

type DatastoreTouramentPgx struct {
	pool        PGXPool
	bobExecutor BobExecutor
}

//func (ds *DatastoreTouramentPgx) Create(ctx context.Context, params *b.TournamentSetter) (*content.Tournament, error) {
//	params.CreatedAt = omit.From(time.Now())
//	params.UpdatedAt = omit.From(time.Now())
//
//	item, err := b.TournamentsTable.Insert(ctx, ds.bobExecutor, params)
//	if err != nil {
//		return nil, err
//	}
//
//	return TournamentBobToRaw(item), nil
//}

func (ds *DatastoreTouramentPgx) FindByID(ctx context.Context, id string) (*content.Tournament, error) {
	item, err := b.FindTournament(ctx, ds.bobExecutor, id)
	if err != nil {
		return nil, err
	}

	return TournamentBobToRaw(item), nil
}

func (ds *DatastoreTouramentPgx) FindBy(ctx context.Context, finder bob.Mod[*dialect.SelectQuery]) (*content.Tournament, error) {
	mods := []bob.Mod[*dialect.SelectQuery]{
		finder,
	}

	item, err := b.Tournaments(ctx, ds.bobExecutor, mods...).One()
	if err != nil {
		return nil, err
	}

	return TournamentBobToRaw(item), nil
}

func (ds *DatastoreTouramentPgx) Upsert(ctx context.Context, params *b.TournamentSetter) (*content.Tournament, error) {
	item, err := b.TournamentsTable.Upsert(ctx, ds.bobExecutor, true, nil, nil, params)
	if err != nil {
		return nil, err
	}

	return TournamentBobToRaw(item), nil
}

func (ds *DatastoreTouramentPgx) UpsertMany(ctx context.Context, params []*b.TournamentSetter) ([]*content.Tournament, error) {
	item, err := b.TournamentsTable.UpsertMany(ctx, ds.bobExecutor, true, nil, nil, params...)
	if err != nil {
		return nil, err
	}

	return arr.ArrMap(item, TournamentBobToRaw), nil
}

func (ds *DatastoreTouramentPgx) ExistsBy(ctx context.Context, finder bob.Mod[*dialect.SelectQuery]) (bool, error) {
	return b.Tournaments(ctx, ds.bobExecutor, finder).Exists()
}

func NewDatastoreTournament(pool PGXPool) (*DatastoreTouramentPgx, error) {
	return &DatastoreTouramentPgx{pool, &BobExecutorPgx{pool}}, nil
}
