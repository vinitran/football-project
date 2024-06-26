// Code generated by BobGen psql v0.21.1. DO NOT EDIT.
// This file is meant to be re-generated in place and/or deleted at any time.

package models

import (
	"context"
	"encoding/json"
	"time"

	"github.com/aarondl/opt/omit"
	"github.com/stephenafamo/bob"
	"github.com/stephenafamo/bob/dialect/psql"
	"github.com/stephenafamo/bob/dialect/psql/dialect"
	"github.com/stephenafamo/bob/dialect/psql/sm"
	"github.com/stephenafamo/bob/types"
)

// Item is an object representing the database table.
type Item struct {
	ItemID     string                      `db:"item_id,pk" `
	IsHidden   bool                        `db:"is_hidden" `
	Categories types.JSON[json.RawMessage] `db:"categories" `
	TimeStamp  time.Time                   `db:"time_stamp" `
	Labels     types.JSON[json.RawMessage] `db:"labels" `
	Comment    string                      `db:"comment" `
}

// ItemSlice is an alias for a slice of pointers to Item.
// This should almost always be used instead of []*Item.
type ItemSlice []*Item

// ItemsTable contains methods to work with the items table
var ItemsTable = psql.NewTablex[*Item, ItemSlice, *ItemSetter]("", "items")

// ItemsQuery is a query on the items table
type ItemsQuery = *psql.TableQuery[*Item, ItemSlice, *ItemSetter]

// ItemsStmt is a prepared statment on items
type ItemsStmt = bob.QueryStmt[*Item, ItemSlice]

// ItemSetter is used for insert/upsert/update operations
// All values are optional, and do not have to be set
// Generated columns are not included
type ItemSetter struct {
	ItemID     omit.Val[string]                      `db:"item_id,pk"`
	IsHidden   omit.Val[bool]                        `db:"is_hidden"`
	Categories omit.Val[types.JSON[json.RawMessage]] `db:"categories"`
	TimeStamp  omit.Val[time.Time]                   `db:"time_stamp"`
	Labels     omit.Val[types.JSON[json.RawMessage]] `db:"labels"`
	Comment    omit.Val[string]                      `db:"comment"`
}

type itemColumnNames struct {
	ItemID     string
	IsHidden   string
	Categories string
	TimeStamp  string
	Labels     string
	Comment    string
}

var ItemColumns = struct {
	ItemID     psql.Expression
	IsHidden   psql.Expression
	Categories psql.Expression
	TimeStamp  psql.Expression
	Labels     psql.Expression
	Comment    psql.Expression
}{
	ItemID:     psql.Quote("items", "item_id"),
	IsHidden:   psql.Quote("items", "is_hidden"),
	Categories: psql.Quote("items", "categories"),
	TimeStamp:  psql.Quote("items", "time_stamp"),
	Labels:     psql.Quote("items", "labels"),
	Comment:    psql.Quote("items", "comment"),
}

type itemWhere[Q psql.Filterable] struct {
	ItemID     psql.WhereMod[Q, string]
	IsHidden   psql.WhereMod[Q, bool]
	Categories psql.WhereMod[Q, types.JSON[json.RawMessage]]
	TimeStamp  psql.WhereMod[Q, time.Time]
	Labels     psql.WhereMod[Q, types.JSON[json.RawMessage]]
	Comment    psql.WhereMod[Q, string]
}

func ItemWhere[Q psql.Filterable]() itemWhere[Q] {
	return itemWhere[Q]{
		ItemID:     psql.Where[Q, string](ItemColumns.ItemID),
		IsHidden:   psql.Where[Q, bool](ItemColumns.IsHidden),
		Categories: psql.Where[Q, types.JSON[json.RawMessage]](ItemColumns.Categories),
		TimeStamp:  psql.Where[Q, time.Time](ItemColumns.TimeStamp),
		Labels:     psql.Where[Q, types.JSON[json.RawMessage]](ItemColumns.Labels),
		Comment:    psql.Where[Q, string](ItemColumns.Comment),
	}
}

// Items begins a query on items
func Items(ctx context.Context, exec bob.Executor, mods ...bob.Mod[*dialect.SelectQuery]) ItemsQuery {
	return ItemsTable.Query(ctx, exec, mods...)
}

// FindItem retrieves a single record by primary key
// If cols is empty Find will return all columns.
func FindItem(ctx context.Context, exec bob.Executor, ItemIDPK string, cols ...string) (*Item, error) {
	if len(cols) == 0 {
		return ItemsTable.Query(
			ctx, exec,
			SelectWhere.Items.ItemID.EQ(ItemIDPK),
		).One()
	}

	return ItemsTable.Query(
		ctx, exec,
		SelectWhere.Items.ItemID.EQ(ItemIDPK),
		sm.Columns(ItemsTable.Columns().Only(cols...)),
	).One()
}

// ItemExists checks the presence of a single record by primary key
func ItemExists(ctx context.Context, exec bob.Executor, ItemIDPK string) (bool, error) {
	return ItemsTable.Query(
		ctx, exec,
		SelectWhere.Items.ItemID.EQ(ItemIDPK),
	).Exists()
}

// Update uses an executor to update the Item
func (o *Item) Update(ctx context.Context, exec bob.Executor, cols ...string) (int64, error) {
	rowsAff, err := ItemsTable.Update(ctx, exec, o, cols...)
	if err != nil {
		return rowsAff, err
	}

	return rowsAff, nil
}

// Delete deletes a single Item record with an executor
func (o *Item) Delete(ctx context.Context, exec bob.Executor) (int64, error) {
	return ItemsTable.Delete(ctx, exec, o)
}

// Reload refreshes the Item using the executor
func (o *Item) Reload(ctx context.Context, exec bob.Executor) error {
	o2, err := ItemsTable.Query(
		ctx, exec,
		SelectWhere.Items.ItemID.EQ(o.ItemID),
	).One()
	if err != nil {
		return err
	}

	*o = *o2

	return nil
}

func (o ItemSlice) DeleteAll(ctx context.Context, exec bob.Executor) (int64, error) {
	return ItemsTable.DeleteMany(ctx, exec, o...)
}

func (o ItemSlice) UpdateAll(ctx context.Context, exec bob.Executor, vals ItemSetter) (int64, error) {
	rowsAff, err := ItemsTable.UpdateMany(ctx, exec, &vals, o...)
	if err != nil {
		return rowsAff, err
	}

	return rowsAff, nil
}

func (o ItemSlice) ReloadAll(ctx context.Context, exec bob.Executor) error {
	var mods []bob.Mod[*dialect.SelectQuery]

	ItemIDPK := make([]string, len(o))

	for i, o := range o {
		ItemIDPK[i] = o.ItemID
	}

	mods = append(mods,
		SelectWhere.Items.ItemID.In(ItemIDPK...),
	)

	o2, err := Items(ctx, exec, mods...).All()
	if err != nil {
		return err
	}

	for _, old := range o {
		for _, new := range o2 {
			if new.ItemID != old.ItemID {
				continue
			}

			*old = *new
			break
		}
	}

	return nil
}
