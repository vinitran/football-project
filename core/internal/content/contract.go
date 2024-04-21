package content

import (
	"context"

	b "core/internal/content/bob"
	"github.com/stephenafamo/bob"
	"github.com/stephenafamo/bob/dialect/psql/dialect"
)

type CommonListParams struct {
	Limit   int
	Offset  int
	Compact bool
}

type MatchListParams struct {
	CommonListParams
	Search     string
	Status     MatchStatus
	IsFeatured bool
}

type DatastoreTeam interface {
	FindByID(ctx context.Context, id string) (*Team, error)
	ExistsBy(ctx context.Context, finder bob.Mod[*dialect.SelectQuery]) (bool, error)
	FindBy(ctx context.Context, finder bob.Mod[*dialect.SelectQuery]) (*Team, error)
	Upsert(ctx context.Context, params *b.TeamSetter) (*Team, error)
	UpsertMany(ctx context.Context, params []*b.TeamSetter) ([]*Team, error)
}

type DatastoreTournament interface {
	FindByID(ctx context.Context, id string) (*Tournament, error)
	FindBy(ctx context.Context, finder bob.Mod[*dialect.SelectQuery]) (*Tournament, error)
	ExistsBy(ctx context.Context, finder bob.Mod[*dialect.SelectQuery]) (bool, error)
	Upsert(ctx context.Context, params *b.TournamentSetter) (*Tournament, error)
	UpsertMany(ctx context.Context, params []*b.TournamentSetter) ([]*Tournament, error)
}

type DatastoreMatch interface {
	Exists(ctx context.Context, id string) (bool, error)
	FindByID(ctx context.Context, id string) (*Match, error)
	List(ctx context.Context, params MatchListParams) ([]*Match, error)
	Upsert(ctx context.Context, params *b.MatchSetter) (*Match, error)
	UpsertMany(ctx context.Context, params []*b.MatchSetter) ([]*Match, error)
}

type DatastoreNews interface {
}
