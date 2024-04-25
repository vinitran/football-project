// Code generated by BobGen psql v0.21.1. DO NOT EDIT.
// This file is meant to be re-generated in place and/or deleted at any time.

package models

import (
	"context"
	"encoding/json"
	"time"

	"github.com/aarondl/opt/null"
	"github.com/aarondl/opt/omit"
	"github.com/aarondl/opt/omitnull"
	"github.com/stephenafamo/bob"
	"github.com/stephenafamo/bob/dialect/psql"
	"github.com/stephenafamo/bob/dialect/psql/dialect"
	"github.com/stephenafamo/bob/dialect/psql/sm"
	"github.com/stephenafamo/bob/types"
)

// ReviewMatch is an object representing the database table.
type ReviewMatch struct {
	ID           string                                `db:"id,pk" `
	Name         string                                `db:"name" `
	Slug         string                                `db:"slug" `
	Description  string                                `db:"description" `
	VideoURL     string                                `db:"video_url" `
	FeatureImage string                                `db:"feature_image" `
	Category     types.JSON[json.RawMessage]           `db:"category" `
	Label        null.Val[types.JSON[json.RawMessage]] `db:"label" `
	Content      string                                `db:"content" `
	Title        string                                `db:"title" `
	H1           string                                `db:"h1" `
	CreatedAt    time.Time                             `db:"created_at" `
	UpdatedAt    time.Time                             `db:"updated_at" `
}

// ReviewMatchSlice is an alias for a slice of pointers to ReviewMatch.
// This should almost always be used instead of []*ReviewMatch.
type ReviewMatchSlice []*ReviewMatch

// ReviewMatchsTable contains methods to work with the review_matchs table
var ReviewMatchsTable = psql.NewTablex[*ReviewMatch, ReviewMatchSlice, *ReviewMatchSetter]("", "review_matchs")

// ReviewMatchsQuery is a query on the review_matchs table
type ReviewMatchsQuery = *psql.TableQuery[*ReviewMatch, ReviewMatchSlice, *ReviewMatchSetter]

// ReviewMatchsStmt is a prepared statment on review_matchs
type ReviewMatchsStmt = bob.QueryStmt[*ReviewMatch, ReviewMatchSlice]

// ReviewMatchSetter is used for insert/upsert/update operations
// All values are optional, and do not have to be set
// Generated columns are not included
type ReviewMatchSetter struct {
	ID           omit.Val[string]                          `db:"id,pk"`
	Name         omit.Val[string]                          `db:"name"`
	Slug         omit.Val[string]                          `db:"slug"`
	Description  omit.Val[string]                          `db:"description"`
	VideoURL     omit.Val[string]                          `db:"video_url"`
	FeatureImage omit.Val[string]                          `db:"feature_image"`
	Category     omit.Val[types.JSON[json.RawMessage]]     `db:"category"`
	Label        omitnull.Val[types.JSON[json.RawMessage]] `db:"label"`
	Content      omit.Val[string]                          `db:"content"`
	Title        omit.Val[string]                          `db:"title"`
	H1           omit.Val[string]                          `db:"h1"`
	CreatedAt    omit.Val[time.Time]                       `db:"created_at"`
	UpdatedAt    omit.Val[time.Time]                       `db:"updated_at"`
}

type reviewMatchColumnNames struct {
	ID           string
	Name         string
	Slug         string
	Description  string
	VideoURL     string
	FeatureImage string
	Category     string
	Label        string
	Content      string
	Title        string
	H1           string
	CreatedAt    string
	UpdatedAt    string
}

var ReviewMatchColumns = struct {
	ID           psql.Expression
	Name         psql.Expression
	Slug         psql.Expression
	Description  psql.Expression
	VideoURL     psql.Expression
	FeatureImage psql.Expression
	Category     psql.Expression
	Label        psql.Expression
	Content      psql.Expression
	Title        psql.Expression
	H1           psql.Expression
	CreatedAt    psql.Expression
	UpdatedAt    psql.Expression
}{
	ID:           psql.Quote("review_matchs", "id"),
	Name:         psql.Quote("review_matchs", "name"),
	Slug:         psql.Quote("review_matchs", "slug"),
	Description:  psql.Quote("review_matchs", "description"),
	VideoURL:     psql.Quote("review_matchs", "video_url"),
	FeatureImage: psql.Quote("review_matchs", "feature_image"),
	Category:     psql.Quote("review_matchs", "category"),
	Label:        psql.Quote("review_matchs", "label"),
	Content:      psql.Quote("review_matchs", "content"),
	Title:        psql.Quote("review_matchs", "title"),
	H1:           psql.Quote("review_matchs", "h1"),
	CreatedAt:    psql.Quote("review_matchs", "created_at"),
	UpdatedAt:    psql.Quote("review_matchs", "updated_at"),
}

type reviewMatchWhere[Q psql.Filterable] struct {
	ID           psql.WhereMod[Q, string]
	Name         psql.WhereMod[Q, string]
	Slug         psql.WhereMod[Q, string]
	Description  psql.WhereMod[Q, string]
	VideoURL     psql.WhereMod[Q, string]
	FeatureImage psql.WhereMod[Q, string]
	Category     psql.WhereMod[Q, types.JSON[json.RawMessage]]
	Label        psql.WhereNullMod[Q, types.JSON[json.RawMessage]]
	Content      psql.WhereMod[Q, string]
	Title        psql.WhereMod[Q, string]
	H1           psql.WhereMod[Q, string]
	CreatedAt    psql.WhereMod[Q, time.Time]
	UpdatedAt    psql.WhereMod[Q, time.Time]
}

func ReviewMatchWhere[Q psql.Filterable]() reviewMatchWhere[Q] {
	return reviewMatchWhere[Q]{
		ID:           psql.Where[Q, string](ReviewMatchColumns.ID),
		Name:         psql.Where[Q, string](ReviewMatchColumns.Name),
		Slug:         psql.Where[Q, string](ReviewMatchColumns.Slug),
		Description:  psql.Where[Q, string](ReviewMatchColumns.Description),
		VideoURL:     psql.Where[Q, string](ReviewMatchColumns.VideoURL),
		FeatureImage: psql.Where[Q, string](ReviewMatchColumns.FeatureImage),
		Category:     psql.Where[Q, types.JSON[json.RawMessage]](ReviewMatchColumns.Category),
		Label:        psql.WhereNull[Q, types.JSON[json.RawMessage]](ReviewMatchColumns.Label),
		Content:      psql.Where[Q, string](ReviewMatchColumns.Content),
		Title:        psql.Where[Q, string](ReviewMatchColumns.Title),
		H1:           psql.Where[Q, string](ReviewMatchColumns.H1),
		CreatedAt:    psql.Where[Q, time.Time](ReviewMatchColumns.CreatedAt),
		UpdatedAt:    psql.Where[Q, time.Time](ReviewMatchColumns.UpdatedAt),
	}
}

// ReviewMatchs begins a query on review_matchs
func ReviewMatchs(ctx context.Context, exec bob.Executor, mods ...bob.Mod[*dialect.SelectQuery]) ReviewMatchsQuery {
	return ReviewMatchsTable.Query(ctx, exec, mods...)
}

// FindReviewMatch retrieves a single record by primary key
// If cols is empty Find will return all columns.
func FindReviewMatch(ctx context.Context, exec bob.Executor, IDPK string, cols ...string) (*ReviewMatch, error) {
	if len(cols) == 0 {
		return ReviewMatchsTable.Query(
			ctx, exec,
			SelectWhere.ReviewMatchs.ID.EQ(IDPK),
		).One()
	}

	return ReviewMatchsTable.Query(
		ctx, exec,
		SelectWhere.ReviewMatchs.ID.EQ(IDPK),
		sm.Columns(ReviewMatchsTable.Columns().Only(cols...)),
	).One()
}

// ReviewMatchExists checks the presence of a single record by primary key
func ReviewMatchExists(ctx context.Context, exec bob.Executor, IDPK string) (bool, error) {
	return ReviewMatchsTable.Query(
		ctx, exec,
		SelectWhere.ReviewMatchs.ID.EQ(IDPK),
	).Exists()
}

// Update uses an executor to update the ReviewMatch
func (o *ReviewMatch) Update(ctx context.Context, exec bob.Executor, cols ...string) (int64, error) {
	rowsAff, err := ReviewMatchsTable.Update(ctx, exec, o, cols...)
	if err != nil {
		return rowsAff, err
	}

	return rowsAff, nil
}

// Delete deletes a single ReviewMatch record with an executor
func (o *ReviewMatch) Delete(ctx context.Context, exec bob.Executor) (int64, error) {
	return ReviewMatchsTable.Delete(ctx, exec, o)
}

// Reload refreshes the ReviewMatch using the executor
func (o *ReviewMatch) Reload(ctx context.Context, exec bob.Executor) error {
	o2, err := ReviewMatchsTable.Query(
		ctx, exec,
		SelectWhere.ReviewMatchs.ID.EQ(o.ID),
	).One()
	if err != nil {
		return err
	}

	*o = *o2

	return nil
}

func (o ReviewMatchSlice) DeleteAll(ctx context.Context, exec bob.Executor) (int64, error) {
	return ReviewMatchsTable.DeleteMany(ctx, exec, o...)
}

func (o ReviewMatchSlice) UpdateAll(ctx context.Context, exec bob.Executor, vals ReviewMatchSetter) (int64, error) {
	rowsAff, err := ReviewMatchsTable.UpdateMany(ctx, exec, &vals, o...)
	if err != nil {
		return rowsAff, err
	}

	return rowsAff, nil
}

func (o ReviewMatchSlice) ReloadAll(ctx context.Context, exec bob.Executor) error {
	var mods []bob.Mod[*dialect.SelectQuery]

	IDPK := make([]string, len(o))

	for i, o := range o {
		IDPK[i] = o.ID
	}

	mods = append(mods,
		SelectWhere.ReviewMatchs.ID.In(IDPK...),
	)

	o2, err := ReviewMatchs(ctx, exec, mods...).All()
	if err != nil {
		return err
	}

	for _, old := range o {
		for _, new := range o2 {
			if new.ID != old.ID {
				continue
			}

			*old = *new
			break
		}
	}

	return nil
}
