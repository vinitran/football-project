package content

import (
	"context"

	"github.com/google/uuid"

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
	Search      string
	Status      MatchStatus
	IsFeatured  bool
	IsNullLabel bool
	Ids         []string
}

type NewsListParams struct {
	CommonListParams
	Search      string
	NewsIDs     []string
	IsNullLabel bool
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
	UpdateLabelByID(ctx context.Context, id string, label []string) (*Match, error)
}

type DatastoreNews interface {
	Upsert(ctx context.Context, params *b.NewsInforSetter) (*News, error)
	List(ctx context.Context, params NewsListParams) ([]*News, error)
	FindByID(ctx context.Context, id string) (*News, error)
	UpdateLabelByID(ctx context.Context, id string, label []string) (*News, error)
	Count(ctx context.Context, params NewsListParams) (int, error)
}

type DatastoreReviewMatch interface {
	Exists(ctx context.Context, id string) (bool, error)
	FindByID(ctx context.Context, id string) (*ReviewMatch, error)
	List(ctx context.Context, params MatchListParams) ([]*ReviewMatch, error)
	Upsert(ctx context.Context, params *b.ReviewMatchSetter) (*ReviewMatch, error)
	UpsertMany(ctx context.Context, params []*b.ReviewMatchSetter) ([]*ReviewMatch, error)
	UpdateLabelByID(ctx context.Context, id string, label []string) (*ReviewMatch, error)
	Count(ctx context.Context, params MatchListParams) (int, error)
}

type DatastoreUser interface {
	FindByID(ctx context.Context, id uuid.UUID) (*User, error)
	FindByUsername(ctx context.Context, username string) (*User, error)
	FindByEmail(ctx context.Context, email string) (*User, error)
	Create(ctx context.Context, params *b.UserInforSetter) (*User, error)
	ExistByEmail(ctx context.Context, email string) (bool, error)
	PasswordByUsername(ctx context.Context, username string) (string, error)
	ExistByUsername(ctx context.Context, username string) (bool, error)
}
