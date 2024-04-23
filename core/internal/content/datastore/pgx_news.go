package datastore

import (
	"context"
	"core/internal/content"
	"core/pkg/arr"
	"fmt"
	"github.com/stephenafamo/bob"
	"github.com/stephenafamo/bob/dialect/psql"
	"github.com/stephenafamo/bob/dialect/psql/dialect"
	"github.com/stephenafamo/bob/dialect/psql/sm"
	"strings"

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

func (ds *DatastoreNewsPgx) UpsertMany(ctx context.Context, params []*b.NewsInforSetter) ([]*content.News, error) {
	item, err := b.NewsInforsTable.UpsertMany(ctx, ds.bobExecutor, true, nil, nil, params...)
	if err != nil {
		return nil, err
	}

	return arr.ArrMap(item, NewsBobToRaw), nil
}

func NewDatastoreNews(pool PGXPool) (*DatastoreNewsPgx, error) {
	return &DatastoreNewsPgx{pool, &BobExecutorPgx{pool}}, nil
}
