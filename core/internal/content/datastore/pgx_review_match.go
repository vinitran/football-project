package datastore

import (
	"context"
	"encoding/json"
	"fmt"
	"log"

	"github.com/jackc/pgx/v5"

	"github.com/aarondl/opt/omitnull"
	"github.com/stephenafamo/bob/dialect/psql/um"
	"github.com/stephenafamo/bob/types"
	"github.com/stephenafamo/scan"

	"github.com/stephenafamo/bob"
	"github.com/stephenafamo/bob/dialect/psql"
	"github.com/stephenafamo/bob/dialect/psql/dialect"
	"github.com/stephenafamo/bob/dialect/psql/sm"

	"core/internal/content"
	b "core/internal/content/bob"
	"core/pkg/arr"
)

type DatastoreReviewMatchPgx struct {
	pool        PGXPool
	bobExecutor BobExecutor
}

func (ds DatastoreReviewMatchPgx) List(ctx context.Context, params content.MatchListParams) ([]*content.ReviewMatch, error) {
	mods := []bob.Mod[*dialect.SelectQuery]{}
	if params.Limit > 0 && params.Limit <= 100 {
		mods = append(mods, sm.Limit(int64(params.Limit)))
	}

	if params.Offset > 0 && params.Offset < 1000 {
		mods = append(mods, sm.Offset(int64(params.Offset)))
	}

	if params.IsNullLabel {
		mods = append(mods, b.SelectWhere.ReviewMatchs.Labels.IsNull())
	}

	if len(params.Ids) > 0 {
		mods = append(mods, b.SelectWhere.ReviewMatchs.ID.In(params.Ids...))
	}

	mods = append(mods, sm.OrderBy(b.ReviewMatchColumns.CreatedAt).Desc())

	itemsBob, err := b.ReviewMatchs(ctx, ds.bobExecutor, mods...).All()
	if err != nil {
		return nil, err
	}

	return arr.ArrMap(itemsBob, ReviewMatchBobToRaw), nil
}

func (ds *DatastoreReviewMatchPgx) FindByID(ctx context.Context, id string) (*content.ReviewMatch, error) {
	item, err := b.FindReviewMatch(ctx, ds.bobExecutor, id)
	if err != nil {
		return nil, err
	}

	return ReviewMatchBobToRaw(item), nil
}

func (ds *DatastoreReviewMatchPgx) Count(ctx context.Context) (int, error) {
	query := fmt.Sprintf(`SELECT count(*) AS count FROM "%s" `, b.TableNames.ReviewMatchs)
	rows, err := ds.pool.Query(ctx, query)
	if err != nil {
		return 0, err
	}

	count, err := pgx.CollectOneRow(rows, pgx.RowTo[int])
	if err != nil {
		return 0, err
	}

	return count, nil
}

func (ds *DatastoreReviewMatchPgx) Exists(ctx context.Context, id string) (bool, error) {
	return b.ReviewMatchExists(ctx, ds.bobExecutor, id)
}

func (ds *DatastoreReviewMatchPgx) Upsert(ctx context.Context, params *b.ReviewMatchSetter) (*content.ReviewMatch, error) {
	item, err := b.ReviewMatchsTable.Upsert(ctx, ds.bobExecutor, true, nil, nil, params)
	if err != nil {
		return nil, err
	}

	return ReviewMatchBobToRaw(item), nil
}

func (ds *DatastoreReviewMatchPgx) UpsertMany(ctx context.Context, params []*b.ReviewMatchSetter) ([]*content.ReviewMatch, error) {
	item, err := b.ReviewMatchsTable.UpsertMany(ctx, ds.bobExecutor, true, nil, nil, params...)
	if err != nil {
		return nil, err
	}

	return arr.ArrMap(item, ReviewMatchBobToRaw), nil
}

func (ds *DatastoreReviewMatchPgx) UpdateLabelByID(ctx context.Context, id string, label []string) (*content.ReviewMatch, error) {
	builder := psql.Update(
		um.Table(b.ReviewMatchsTable.Name(ctx)),
		um.Where(b.ReviewMatchColumns.ID.EQ(psql.Arg(id))),
		um.Returning("*"),
	)

	var lbs []string
	arr.ArrEach(label, func(lb string) {
		for _, banned := range bannedKeyword {
			if lb == banned {
				return
			}
		}
		lbs = append(lbs, lb)
	})

	jsonData, err := json.Marshal(lbs)
	if err != nil {
		return nil, err
	}

	lb := omitnull.From(types.NewJSON(json.RawMessage(jsonData)))
	builder.Apply(
		um.Set("labels").ToArg(lb),
	)

	item, err := bob.One(ctx, ds.bobExecutor, builder, scan.StructMapper[*b.ReviewMatch]())
	if err != nil {
		return nil, err
	}

	log.Println("complete", item.ID)

	return ReviewMatchBobToRaw(item), nil
}

func NewDatastoreReviewMatch(pool PGXPool) (*DatastoreReviewMatchPgx, error) {
	return &DatastoreReviewMatchPgx{pool, &BobExecutorPgx{pool}}, nil
}
