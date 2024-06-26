package datastore

import (
	"context"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/jackc/pgx/v5"

	"core/internal/content"
	"core/pkg/arr"

	"github.com/aarondl/opt/omitnull"
	"github.com/stephenafamo/bob"
	"github.com/stephenafamo/bob/dialect/psql"
	"github.com/stephenafamo/bob/dialect/psql/dialect"
	"github.com/stephenafamo/bob/dialect/psql/sm"
	"github.com/stephenafamo/bob/dialect/psql/um"
	"github.com/stephenafamo/bob/types"
	"github.com/stephenafamo/scan"

	b "core/internal/content/bob"
)

type DatastoreNewsPgx struct {
	pool        PGXPool
	bobExecutor BobExecutor
}

func (ds DatastoreNewsPgx) List(ctx context.Context, params content.NewsListParams) ([]*content.News, error) {
	mods := []bob.Mod[*dialect.SelectQuery]{}
	if params.Limit > 0 && params.Limit <= 100 {
		mods = append(mods, sm.Limit(int64(params.Limit)))
	}

	if params.Offset > 0 && params.Offset < 1000 {
		mods = append(mods, sm.Offset(int64(params.Offset)))
	}

	mods = append(mods, sm.OrderBy(b.NewsInforColumns.CreatedAt).Desc())

	if params.Compact {
		mods = append(mods,
			sm.Columns(
				b.NewsInforColumns.ID,
				b.NewsInforColumns.VideoURL,
				b.NewsInforColumns.Description,
				b.NewsInforColumns.Author,
				b.NewsInforColumns.Content,
				b.NewsInforColumns.Title,
				b.NewsInforColumns.Link,
				b.NewsInforColumns.Slug,
				b.NewsInforColumns.Name,
				b.NewsInforColumns.FeatureImage,
				b.NewsInforColumns.UpdatedAt,
				b.NewsInforColumns.CreatedAt,
			),
		)
	}

	if params.Search != "" {
		params.Search = strings.ReplaceAll(params.Search, "%", "")
		params.Search = strings.ToValidUTF8(params.Search, "")
		mods = append(mods, sm.Where(psql.Or(
			b.NewsInforColumns.Name.ILike(psql.Arg(fmt.Sprintf("%%%s%%", params.Search))),
			b.NewsInforColumns.Description.ILike(psql.Arg(fmt.Sprintf("%%%s%%", params.Search))),
		)))
	}

	if len(params.NewsIDs) > 0 {
		mods = append(mods, b.SelectWhere.NewsInfors.ID.In(params.NewsIDs...))
	}

	if params.IsNullLabel {
		mods = append(mods, b.SelectWhere.NewsInfors.Labels.IsNull())
	}

	itemsBob, err := b.NewsInfors(ctx, ds.bobExecutor, mods...).All()
	if err != nil {
		return nil, err
	}

	return arr.ArrMap(itemsBob, NewsBobToRaw), nil
}

func (ds *DatastoreNewsPgx) FindByID(ctx context.Context, id string) (*content.News, error) {
	item, err := b.FindNewsInfor(ctx, ds.bobExecutor, id)
	if err != nil {
		return nil, err
	}

	return NewsBobToRaw(item), nil
}

func (ds *DatastoreNewsPgx) Upsert(ctx context.Context, params *b.NewsInforSetter) (*content.News, error) {
	item, err := b.NewsInforsTable.Upsert(ctx, ds.bobExecutor, true, nil, nil, params)
	if err != nil {
		return nil, err
	}

	return NewsBobToRaw(item), nil
}

func (ds *DatastoreNewsPgx) UpdateLabelByID(ctx context.Context, id string, label []string) (*content.News, error) {
	builder := psql.Update(
		um.Table(b.NewsInforsTable.Name(ctx)),
		um.Where(b.NewsInforColumns.ID.EQ(psql.Arg(id))),
		um.Returning("*"),
	)

	jsonData, err := json.Marshal(label)
	if err != nil {
		return nil, err
	}

	lb := omitnull.From(types.NewJSON(json.RawMessage(jsonData)))
	builder.Apply(
		um.Set("labels").ToArg(lb),
	)

	item, err := bob.One(ctx, ds.bobExecutor, builder, scan.StructMapper[*b.NewsInfor]())
	if err != nil {
		return nil, err
	}

	return NewsBobToRaw(item), nil
}

func (ds *DatastoreNewsPgx) UpsertMany(ctx context.Context, params []*b.NewsInforSetter) ([]*content.News, error) {
	item, err := b.NewsInforsTable.UpsertMany(ctx, ds.bobExecutor, true, nil, nil, params...)
	if err != nil {
		return nil, err
	}

	return arr.ArrMap(item, NewsBobToRaw), nil
}

func (ds *DatastoreNewsPgx) Count(ctx context.Context, params content.NewsListParams) (int, error) {
	query := fmt.Sprintf(`SELECT count(*) AS count FROM "%s" `, b.TableNames.NewsInfors)

	if params.Search != "" {
		params.Search = strings.ReplaceAll(params.Search, "%", "")
		params.Search = strings.ToValidUTF8(params.Search, "")
		query = fmt.Sprintf(`SELECT count(*) AS count FROM "%s" where name ILIKE '%s' or description ILIKE '%s'`,
			b.TableNames.NewsInfors,
			fmt.Sprintf("%%%s%%", params.Search),
			fmt.Sprintf("%%%s%%", params.Search),
		)
	}

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

func NewDatastoreNews(pool PGXPool) (*DatastoreNewsPgx, error) {
	return &DatastoreNewsPgx{pool, &BobExecutorPgx{pool}}, nil
}
