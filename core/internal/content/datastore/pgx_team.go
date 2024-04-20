package datastore

import (
	"context"

	"core/internal/content"
	b "core/internal/content/bob"
	"core/pkg/arr"
	"github.com/stephenafamo/bob"
	"github.com/stephenafamo/bob/dialect/psql/dialect"
)

type DatastoreTeamPgx struct {
	pool        PGXPool
	bobExecutor BobExecutor
}

//func (ds *DatastoreTeamPgx) Create(ctx context.Context, params *b.TeamSetter) (*content.Team, error) {
//	params.CreatedAt = omit.From(time.Now())
//	params.UpdatedAt = omit.From(time.Now())
//
//	item, err := b.TeamsTable.Insert(ctx, ds.bobExecutor, params)
//	if err != nil {
//		return nil, err
//	}
//
//	return TeamBobToRaw(item), nil
//}

func (ds *DatastoreTeamPgx) FindByID(ctx context.Context, id string) (*content.Team, error) {
	item, err := b.FindTeam(ctx, ds.bobExecutor, id)
	if err != nil {
		return nil, err
	}

	return TeamBobToRaw(item), nil
}

func (ds *DatastoreTeamPgx) Upsert(ctx context.Context, params *b.TeamSetter) (*content.Team, error) {
	item, err := b.TeamsTable.Upsert(ctx, ds.bobExecutor, true, nil, nil, params)
	if err != nil {
		return nil, err
	}

	return TeamBobToRaw(item), nil
}

func (ds *DatastoreTeamPgx) UpsertMany(ctx context.Context, params []*b.TeamSetter) ([]*content.Team, error) {
	item, err := b.TeamsTable.UpsertMany(ctx, ds.bobExecutor, true, nil, nil, params...)
	if err != nil {
		return nil, err
	}

	return arr.ArrMap(item, TeamBobToRaw), nil
}

func (ds *DatastoreTeamPgx) FindBy(ctx context.Context, finder bob.Mod[*dialect.SelectQuery]) (*content.Team, error) {
	mods := []bob.Mod[*dialect.SelectQuery]{
		finder,
	}

	item, err := b.Teams(ctx, ds.bobExecutor, mods...).One()
	if err != nil {
		return nil, err
	}

	return TeamBobToRaw(item), nil
}

func (ds *DatastoreTeamPgx) ExistsBy(ctx context.Context, finder bob.Mod[*dialect.SelectQuery]) (bool, error) {
	return b.Teams(ctx, ds.bobExecutor, finder).Exists()
}

func NewDatastoreTeam(pool PGXPool) (*DatastoreTeamPgx, error) {
	return &DatastoreTeamPgx{pool, &BobExecutorPgx{pool}}, nil
}
