// Code generated by BobGen psql v0.21.1. DO NOT EDIT.
// This file is meant to be re-generated in place and/or deleted at any time.

package models

import (
	"context"

	"github.com/stephenafamo/bob/dialect/psql"
	"github.com/stephenafamo/bob/dialect/psql/dialect"
)

var TableNames = struct {
	GooseDBVersions string
	Matchs          string
	Teams           string
	Tournaments     string
}{
	GooseDBVersions: "goose_db_version",
	Matchs:          "matchs",
	Teams:           "teams",
	Tournaments:     "tournaments",
}

var ColumnNames = struct {
	GooseDBVersions gooseDBVersionColumnNames
	Matchs          matchColumnNames
	Teams           teamColumnNames
	Tournaments     tournamentColumnNames
}{
	GooseDBVersions: gooseDBVersionColumnNames{
		ID:        "id",
		VersionID: "version_id",
		IsApplied: "is_applied",
		Tstamp:    "tstamp",
	},
	Matchs: matchColumnNames{
		ID:           "id",
		IDSync:       "id_sync",
		Name:         "name",
		Slug:         "slug",
		Date:         "date",
		Timestamp:    "timestamp",
		HomeRedCards: "home_red_cards",
		AwayRedCards: "away_red_cards",
		HomeID:       "home_id",
		AwayID:       "away_id",
		TournamentID: "tournament_id",
		Scores:       "scores",
		WinCode:      "win_code",
		MatchStatus:  "match_status",
		SportType:    "sport_type",
		HasLineup:    "has_lineup",
		HasTracker:   "has_tracker",
		IsFeatured:   "is_featured",
		ThumbnailURL: "thumbnail_url",
		Commentators: "commentators",
		IsLive:       "is_live",
		LiveTracker:  "live_tracker",
		CreatedAt:    "created_at",
		UpdatedAt:    "updated_at",
	},
	Teams: teamColumnNames{
		ID:        "id",
		Name:      "name",
		ShortName: "short_name",
		Gender:    "gender",
		NameCode:  "name_code",
		Logo:      "logo",
		Slug:      "slug",
		IDSync:    "id_sync",
		CreatedAt: "created_at",
		UpdatedAt: "updated_at",
	},
	Tournaments: tournamentColumnNames{
		ID:         "id",
		Name:       "name",
		Slug:       "slug",
		Logo:       "logo",
		IsFeatured: "is_featured",
		Priority:   "priority",
		IDSync:     "id_sync",
		CreatedAt:  "created_at",
		UpdatedAt:  "updated_at",
	},
}

var (
	SelectWhere = Where[*dialect.SelectQuery]()
	InsertWhere = Where[*dialect.InsertQuery]()
	UpdateWhere = Where[*dialect.UpdateQuery]()
	DeleteWhere = Where[*dialect.DeleteQuery]()
)

func Where[Q psql.Filterable]() struct {
	GooseDBVersions gooseDBVersionWhere[Q]
	Matchs          matchWhere[Q]
	Teams           teamWhere[Q]
	Tournaments     tournamentWhere[Q]
} {
	return struct {
		GooseDBVersions gooseDBVersionWhere[Q]
		Matchs          matchWhere[Q]
		Teams           teamWhere[Q]
		Tournaments     tournamentWhere[Q]
	}{
		GooseDBVersions: GooseDBVersionWhere[Q](),
		Matchs:          MatchWhere[Q](),
		Teams:           TeamWhere[Q](),
		Tournaments:     TournamentWhere[Q](),
	}
}

var (
	SelectJoins = getJoins[*dialect.SelectQuery]
	UpdateJoins = getJoins[*dialect.UpdateQuery]
	DeleteJoins = getJoins[*dialect.DeleteQuery]
)

type joinSet[Q any] struct {
	InnerJoin Q
	LeftJoin  Q
	RightJoin Q
}

type joins[Q dialect.Joinable] struct {
	Matchs      joinSet[matchRelationshipJoins[Q]]
	Teams       joinSet[teamRelationshipJoins[Q]]
	Tournaments joinSet[tournamentRelationshipJoins[Q]]
}

func getJoins[Q dialect.Joinable](ctx context.Context) joins[Q] {
	return joins[Q]{
		Matchs:      matchsJoin[Q](ctx),
		Teams:       teamsJoin[Q](ctx),
		Tournaments: tournamentsJoin[Q](ctx),
	}
}