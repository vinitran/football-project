package content

import (
	"context"

	b "core/internal/content/bob"
	"github.com/stephenafamo/bob"
	"github.com/stephenafamo/bob/dialect/psql/dialect"
)

type DatastoreTeam interface {
	// Create(ctx context.Context, params *b.TeamSetter) (*Team, error)
	FindByID(ctx context.Context, id string) (*Team, error)
	ExistsBy(ctx context.Context, finder bob.Mod[*dialect.SelectQuery]) (bool, error)
	FindBy(ctx context.Context, finder bob.Mod[*dialect.SelectQuery]) (*Team, error)
	Upsert(ctx context.Context, params *b.TeamSetter) (*Team, error)
	UpsertMany(ctx context.Context, params []*b.TeamSetter) ([]*Team, error)
}

type DatastoreTournament interface {
	// Create(ctx context.Context, params *b.TournamentSetter) (*Tournament, error)
	FindByID(ctx context.Context, id string) (*Tournament, error)
	FindBy(ctx context.Context, finder bob.Mod[*dialect.SelectQuery]) (*Tournament, error)
	ExistsBy(ctx context.Context, finder bob.Mod[*dialect.SelectQuery]) (bool, error)
	Upsert(ctx context.Context, params *b.TournamentSetter) (*Tournament, error)
	UpsertMany(ctx context.Context, params []*b.TournamentSetter) ([]*Tournament, error)
}

type DatastoreMatch interface {
	// Create(ctx context.Context, params *b.MatchSetter) (*Match, error)
	// CreateMany(ctx context.Context, params []*b.MatchSetter) ([]*Match, error)
	Exists(ctx context.Context, id string) (bool, error)
	FindByID(ctx context.Context, id string) (*Match, error)
	// Update(ctx context.Context, id string, params *b.MatchSetter) (*Match, error)
	// UpdateMany(ctx context.Context, params []*b.MatchSetter) ([]*Match, error)
	Upsert(ctx context.Context, params *b.MatchSetter) (*Match, error)
	UpsertMany(ctx context.Context, params []*b.MatchSetter) ([]*Match, error)
}
