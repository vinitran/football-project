package datastore

import (
	"context"
	"core/internal/content"
	b "core/internal/content/bob"
	"database/sql"
	"database/sql/driver"
	"github.com/google/uuid"
	"time"

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

func PoolTeamToRaw(v *b.Team) *content.Team {
	if v == nil {
		return nil
	}

	item := &content.Team{
		ID:        v.ID,
		Name:      v.Name,
		ShortName: v.ShortName.MustGet().,
		Gender:    "",
		NameCode:  "",
		Logo:      "",
		Slug:      "",
		IDSync:    "",
		CreatedAt: time.Time{},
		UpdatedAt: time.Time{},
	}