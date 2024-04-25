package datastore

import (
	"context"
	"encoding/json"
	"github.com/aarondl/opt/omitnull"
	"github.com/stephenafamo/bob/dialect/psql/um"
	"github.com/stephenafamo/bob/types"
	"github.com/stephenafamo/scan"
	"log"

	"github.com/stephenafamo/bob"
	"github.com/stephenafamo/bob/dialect/psql"
	"github.com/stephenafamo/bob/dialect/psql/dialect"
	"github.com/stephenafamo/bob/dialect/psql/sm"

	"core/internal/content"
	b "core/internal/content/bob"
	"core/pkg/arr"
)

type DatastoreMatchPgx struct {
	pool        PGXPool
	bobExecutor BobExecutor
}

func (ds DatastoreMatchPgx) List(ctx context.Context, params content.MatchListParams) ([]*content.Match, error) {
	mods := []bob.Mod[*dialect.SelectQuery]{}
	if params.Limit > 0 && params.Limit <= 100 {
		mods = append(mods, sm.Limit(int64(params.Limit)))
	}

	if params.Offset > 0 && params.Offset < 1000 {
		mods = append(mods, sm.Offset(int64(params.Offset)))
	}

	if params.Status.Valid() {
		mods = append(mods, sm.Where(b.MatchColumns.MatchStatus.EQ(psql.Arg(params.Status))))
	}

	if params.IsFeatured {
		mods = append(mods, sm.Where(b.MatchColumns.IsFeatured.EQ(psql.Arg(true))))
	}

	mods = append(mods,
		b.ThenLoadMatchHomeTeam(
			sm.Columns(
				b.TeamColumns.ID,
				b.TeamColumns.Name,
				b.TeamColumns.Slug,
				b.TeamColumns.Logo,
				b.TeamColumns.NameCode,
				b.TeamColumns.Gender,
				b.TeamColumns.ShortName,
				b.TeamColumns.UpdatedAt,
				b.TeamColumns.CreatedAt,
			),
		),
		b.ThenLoadMatchAwayTeam(
			sm.Columns(
				b.TeamColumns.ID,
				b.TeamColumns.Name,
				b.TeamColumns.Slug,
				b.TeamColumns.Logo,
				b.TeamColumns.NameCode,
				b.TeamColumns.Gender,
				b.TeamColumns.ShortName,
				b.TeamColumns.UpdatedAt,
				b.TeamColumns.CreatedAt,
			),
		),
		b.ThenLoadMatchTournament(
			sm.Columns(
				b.TournamentColumns.ID,
				b.TournamentColumns.Name,
				b.TournamentColumns.Slug,
				b.TournamentColumns.Logo,
				b.TournamentColumns.IsFeatured,
				b.TournamentColumns.Priority,
				b.TournamentColumns.UpdatedAt,
				b.TournamentColumns.CreatedAt,
			),
		),
	)

	itemsBob, err := b.Matchs(ctx, ds.bobExecutor, mods...).All()
	if err != nil {
		return nil, err
	}

	return arr.ArrMap(itemsBob, MatchBobToRaw), nil
}

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

func (ds *DatastoreMatchPgx) UpdateLabelByID(ctx context.Context, id string, label []string) (*content.Match, error) {
	builder := psql.Update(
		um.Table(b.MatchsTable.Name(ctx)),
		um.Where(b.MatchColumns.ID.EQ(psql.Arg(id))),
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

	item, err := bob.One(ctx, ds.bobExecutor, builder, scan.StructMapper[*b.Match]())
	if err != nil {
		return nil, err
	}

	log.Println("complete", item.ID)

	return MatchBobToRaw(item), nil
}

func NewDatastoreMatch(pool PGXPool) (*DatastoreMatchPgx, error) {
	return &DatastoreMatchPgx{pool, &BobExecutorPgx{pool}}, nil
}

var bannedKeyword = []string{
	"match",
	"vs",
	"football",
	"women's football",
	"teams",
	"vs.",
	"game",
	"sports",
	"W",
	"competition",
	"players",
	"score",
	"result",
	"racing",
	"women's soccer",
}
