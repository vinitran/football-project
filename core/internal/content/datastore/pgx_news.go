package datastore

import (
	"context"
	"fmt"
	"github.com/stephenafamo/bob"
	"github.com/stephenafamo/bob/dialect/psql"
	"github.com/stephenafamo/bob/dialect/psql/dialect"
	"github.com/stephenafamo/bob/dialect/psql/sm"
	"strings"

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
				b.NewsColumns.ID,
				b.NewsColumns.VideoURL,
				b.NewsColumns.Description,
				b.NewsColumns.Author,
				b.NewsColumns.Content,
				b.NewsColumns.Title,
				b.NewsColumns.Link,
				b.NewsColumns.Slug,
				b.NewsColumns.Name,
				b.NewsColumns.FeatureImage,
				b.NewsColumns.UpdatedAt,
				b.NewsColumns.CreatedAt,
			),
		)
	}

	if params.Search != "" {
		params.Search = strings.ReplaceAll(params.Search, "%", "")
		params.Search = strings.ToValidUTF8(params.Search, "")
		mods = append(mods, sm.Where(psql.Or(
			b.NewsColumns.Name.ILike(psql.Arg(fmt.Sprintf("%%%s%%", params.Search))),
			b.NewsColumns.Description.ILike(psql.Arg(fmt.Sprintf("%%%s%%", params.Search))),
		)))
	}

	itemsBob, err := b.News(ctx, ds.bobExecutor, mods...).All()
	if err != nil {
		return nil, err
	}

	return arr.ArrMap(itemsBob, NewsBobToRaw), nil
}

func (ds *DatastoreNewsPgx) FindByID(ctx context.Context, id string) (*content.News, error) {
	item, err := b.FindNews(ctx, ds.bobExecutor, id)
	if err != nil {
		return nil, err
	}

	return NewsBobToRaw(item), nil
}

func (ds *DatastoreNewsPgx) Upsert(ctx context.Context, params *b.NewsSetter) (*content.News, error) {
	item, err := b.NewsTable.Upsert(ctx, ds.bobExecutor, true, nil, nil, params)
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
