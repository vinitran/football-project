package datastore

import (
	"context"
	"core/internal/content"
	b "core/internal/content/bob"
	"core/pkg/arr"
)

type DatastoreMatchPgx struct {
	pool        PGXPool
	bobExecutor BobExecutor
}

//func (ds *DatastoreMatchPgx) Create(ctx context.Context, params *b.MatchSetter) (*content.Match, error) {
//	params.ID = omit.From(uuid.New())
//	params.CreatedAt = omit.From(time.Now())
//	params.UpdatedAt = omit.From(time.Now())
//
//	item, err := b.MatchsTable.Insert(ctx, ds.bobExecutor, params)
//	if err != nil {
//		return nil, err
//	}
//
//	return MatchBobToRaw(item), nil
//}

func (ds *DatastoreMatchPgx) FindByID(ctx context.Context, id string) (*content.Match, error) {
	item, err := b.FindMatch(ctx, ds.bobExecutor, id)
	if err != nil {
		return nil, err
	}

	return MatchBobToRaw(item), nil
}

func (ds *DatastoreMatchPgx) Exists(ctx context.Context, id string) (bool, error) {
	return b.MatchExists(ctx, ds.bobExecutor, id)
}

//func (ds *DatastoreMatchPgx) Update(ctx context.Context, id string, params *b.MatchSetter) (*content.Match, error) {
//	params.UpdatedAt = omit.From(time.Now())
//	ks, vs := PrepareSetterMap(ctx, params)
//
//	builder := psql.Update(
//		um.Table(b.MatchsTable.Name(ctx)),
//		um.Where(b.MatchColumns.ID.EQ(psql.Arg(id))),
//		um.Returning("*"),
//	)
//
//	for i, x := range ks {
//		builder.Apply(
//			um.Set(x).ToArg(vs[i]),
//		)
//	}
//
//	item, err := bob.One(ctx, ds.bobExecutor, builder, scan.StructMapper[*b.Match]())
//	if err != nil {
//		return nil, err
//	}
//
//	return MatchBobToRaw(item), nil
//}

func (ds *DatastoreMatchPgx) Upsert(ctx context.Context, params *b.MatchSetter) (*content.Match, error) {
	item, err := b.MatchsTable.Upsert(ctx, ds.bobExecutor, true, nil, nil, params)
	if err != nil {
		return nil, err
	}

	return MatchBobToRaw(item), nil
}

func (ds *DatastoreMatchPgx) UpsertMany(ctx context.Context, params []*b.MatchSetter) ([]*content.Match, error) {
	item, err := b.MatchsTable.UpsertMany(ctx, ds.bobExecutor, true, nil, nil, params...)
	if err != nil {
		return nil, err
	}

	return arr.ArrMap(item, MatchBobToRaw), nil
}

func NewDatastoreMatch(pool PGXPool) (*DatastoreMatchPgx, error) {
	return &DatastoreMatchPgx{pool, &BobExecutorPgx{pool}}, nil
}
