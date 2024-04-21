package datastore

import (
	"context"
	"database/sql"
	"database/sql/driver"

	"core/internal/content"
	b "core/internal/content/bob"

	"github.com/jackc/pgx/v5"
	"github.com/stephenafamo/scan"
)

type BobExecutor interface {
	QueryContext(ctx context.Context, query string, args ...any) (scan.Rows, error)
	ExecContext(context.Context, string, ...any) (sql.Result, error)
}

type BobExecutorPgx struct {
	pool PGXPool
}

type rows struct {
	pgx.Rows
}

func (r rows) Close() error {
	r.Rows.Close()
	return nil
}

func (r rows) Columns() ([]string, error) {
	fields := r.FieldDescriptions()
	cols := make([]string, len(fields))

	for i, field := range fields {
		cols[i] = field.Name
	}

	return cols, nil
}

func (v *BobExecutorPgx) QueryContext(ctx context.Context, query string, args ...any) (scan.Rows, error) {
	r, err := v.pool.Query(ctx, query, args...)
	if err != nil {
		return nil, err
	}

	return rows{r}, nil
}

func (v *BobExecutorPgx) ExecContext(ctx context.Context, query string, args ...any) (sql.Result, error) {
	tag, err := v.pool.Exec(ctx, query, args)
	if err != nil {
		return nil, err
	}

	return driver.RowsAffected(tag.RowsAffected()), err
}

func TeamBobToRaw(v *b.Team) *content.Team {
	if v == nil {
		return nil
	}

	item := &content.Team{
		ID:        v.ID,
		Name:      v.Name,
		ShortName: v.ShortName.Ptr(),
		Gender:    v.Gender.GetOrZero(),
		NameCode:  v.NameCode.GetOrZero(),
		Logo:      v.Logo,
		Slug:      v.Slug.GetOrZero(),
		CreatedAt: v.CreatedAt,
		UpdatedAt: v.UpdatedAt,
	}

	return item
}

func NewsBobToRaw(v *b.NewsType) *content.News {
	if v == nil {
		return nil
	}

	item := &content.News{
		ID:           v.ID,
		Name:         v.Name,
		Slug:         v.Slug,
		Link:         v.Link,
		Description:  v.Description,
		FeatureImage: v.FeatureImage,
		Title:        v.Title,
		Content:      v.Content.Ptr(),
		Author:       v.Author.Ptr(),
		VideoURL:     v.VideoURL.Ptr(),
		Category:     v.Category.Val,
		CreatedAt:    v.CreatedAt,
		UpdatedAt:    v.UpdatedAt,
	}

	return item
}

func TournamentBobToRaw(v *b.Tournament) *content.Tournament {
	if v == nil {
		return nil
	}

	item := &content.Tournament{
		ID:         v.ID,
		Name:       v.Name,
		Slug:       v.Slug,
		Logo:       v.Logo,
		IsFeatured: v.IsFeatured,
		Priority:   v.Priority,
		CreatedAt:  v.CreatedAt,
		UpdatedAt:  v.UpdatedAt,
	}

	return item
}

func MatchBobToRaw(v *b.Match) *content.Match {
	if v == nil {
		return nil
	}

	item := &content.Match{
		ID:           v.ID,
		Name:         v.Name,
		Slug:         v.Slug,
		Date:         v.Date,
		Timestamp:    v.Timestamp,
		HomeRedCards: v.HomeRedCards,
		AwayRedCards: v.AwayRedCards,
		Scores:       v.Scores.Val,
		WinCode:      v.WinCode.Ptr(),
		MatchStatus:  v.MatchStatus,
		SportType:    v.SportType.Ptr(),
		HasLineup:    v.HasLineup.Ptr(),
		HasTracker:   v.HasTracker.Ptr(),
		IsFeatured:   v.IsFeatured.Ptr(),
		ThumbnailURL: v.ThumbnailURL.Ptr(),
		IsLive:       v.IsLive.Ptr(),
		LiveTracker:  v.LiveTracker.Ptr(),
		CreatedAt:    v.CreatedAt,
		UpdatedAt:    v.UpdatedAt,

		Tournament: TournamentBobToRaw(v.R.Tournament),
		Home:       TeamBobToRaw(v.R.HomeTeam),
		Away:       TeamBobToRaw(v.R.AwayTeam),
	}

	return item
}
