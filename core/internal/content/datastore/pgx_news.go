package datastore

import (
	"context"

	"core/internal/content"
	b "core/internal/content/bob"
	"core/pkg/arr"
)

type DatastoreNewsPgx struct {
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

func (ds *DatastoreNewsPgx) FindByID(ctx context.Context, id string) (*content.News, error) {
	item, err := b.FindNews(ctx, ds.bobExecutor, id)
	if err != nil {
		return nil, err
	}

	return NewsBobToRaw(item), nil
}

func (ds *DatastoreNewsPgx) UpsertMany(ctx context.Context, params []*b.NewsSetter) ([]*content.News, error) {
	item, err := b.NewsTable.UpsertMany(ctx, ds.bobExecutor, true, nil, nil, params...)
	if err != nil {
		return nil, err
	}

	return arr.ArrMap(item, NewsBobToRaw), nil
}

func NewDatastoreNews(pool PGXPool) (*DatastoreNewsPgx, error) {
	return &DatastoreNewsPgx{pool, &BobExecutorPgx{pool}}, nil
}
