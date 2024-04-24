// Code generated by BobGen psql v0.21.1. DO NOT EDIT.
// This file is meant to be re-generated in place and/or deleted at any time.

package factory

import (
	"context"
	"encoding/json"
	"strings"
	"time"

	models "core/internal/content/bob"
	"github.com/aarondl/opt/null"
	"github.com/jaswdr/faker"
	"github.com/stephenafamo/bob/types"
)

type factory struct {
	baseFeedbackMods       FeedbackModSlice
	baseGooseDBVersionMods GooseDBVersionModSlice
	baseItemMods           ItemModSlice
	baseMatchMods          MatchModSlice
	baseNewsInforMods      NewsInforModSlice
	baseTeamMods           TeamModSlice
	baseTournamentMods     TournamentModSlice
	baseUserMods           UserModSlice
}

func New() *factory {
	return &factory{}
}

func (f *factory) NewFeedback(mods ...FeedbackMod) *FeedbackTemplate {
	o := &FeedbackTemplate{f: f}

	if f != nil {
		f.baseFeedbackMods.Apply(o)
	}

	FeedbackModSlice(mods).Apply(o)

	return o
}

func (f *factory) NewGooseDBVersion(mods ...GooseDBVersionMod) *GooseDBVersionTemplate {
	o := &GooseDBVersionTemplate{f: f}

	if f != nil {
		f.baseGooseDBVersionMods.Apply(o)
	}

	GooseDBVersionModSlice(mods).Apply(o)

	return o
}

func (f *factory) NewItem(mods ...ItemMod) *ItemTemplate {
	o := &ItemTemplate{f: f}

	if f != nil {
		f.baseItemMods.Apply(o)
	}

	ItemModSlice(mods).Apply(o)

	return o
}

func (f *factory) NewMatch(mods ...MatchMod) *MatchTemplate {
	o := &MatchTemplate{f: f}

	if f != nil {
		f.baseMatchMods.Apply(o)
	}

	MatchModSlice(mods).Apply(o)

	return o
}

func (f *factory) NewNewsInfor(mods ...NewsInforMod) *NewsInforTemplate {
	o := &NewsInforTemplate{f: f}

	if f != nil {
		f.baseNewsInforMods.Apply(o)
	}

	NewsInforModSlice(mods).Apply(o)

	return o
}

func (f *factory) NewTeam(mods ...TeamMod) *TeamTemplate {
	o := &TeamTemplate{f: f}

	if f != nil {
		f.baseTeamMods.Apply(o)
	}

	TeamModSlice(mods).Apply(o)

	return o
}

func (f *factory) NewTournament(mods ...TournamentMod) *TournamentTemplate {
	o := &TournamentTemplate{f: f}

	if f != nil {
		f.baseTournamentMods.Apply(o)
	}

	TournamentModSlice(mods).Apply(o)

	return o
}

func (f *factory) NewUser(mods ...UserMod) *UserTemplate {
	o := &UserTemplate{f: f}

	if f != nil {
		f.baseUserMods.Apply(o)
	}

	UserModSlice(mods).Apply(o)

	return o
}

func (f *factory) ClearBaseFeedbackMods() {
	f.baseFeedbackMods = nil
}

func (f *factory) AddBaseFeedbackMod(mods ...FeedbackMod) {
	f.baseFeedbackMods = append(f.baseFeedbackMods, mods...)
}

func (f *factory) ClearBaseGooseDBVersionMods() {
	f.baseGooseDBVersionMods = nil
}

func (f *factory) AddBaseGooseDBVersionMod(mods ...GooseDBVersionMod) {
	f.baseGooseDBVersionMods = append(f.baseGooseDBVersionMods, mods...)
}

func (f *factory) ClearBaseItemMods() {
	f.baseItemMods = nil
}

func (f *factory) AddBaseItemMod(mods ...ItemMod) {
	f.baseItemMods = append(f.baseItemMods, mods...)
}

func (f *factory) ClearBaseMatchMods() {
	f.baseMatchMods = nil
}

func (f *factory) AddBaseMatchMod(mods ...MatchMod) {
	f.baseMatchMods = append(f.baseMatchMods, mods...)
}

func (f *factory) ClearBaseNewsInforMods() {
	f.baseNewsInforMods = nil
}

func (f *factory) AddBaseNewsInforMod(mods ...NewsInforMod) {
	f.baseNewsInforMods = append(f.baseNewsInforMods, mods...)
}

func (f *factory) ClearBaseTeamMods() {
	f.baseTeamMods = nil
}

func (f *factory) AddBaseTeamMod(mods ...TeamMod) {
	f.baseTeamMods = append(f.baseTeamMods, mods...)
}

func (f *factory) ClearBaseTournamentMods() {
	f.baseTournamentMods = nil
}

func (f *factory) AddBaseTournamentMod(mods ...TournamentMod) {
	f.baseTournamentMods = append(f.baseTournamentMods, mods...)
}

func (f *factory) ClearBaseUserMods() {
	f.baseUserMods = nil
}

func (f *factory) AddBaseUserMod(mods ...UserMod) {
	f.baseUserMods = append(f.baseUserMods, mods...)
}

type contextKey string

var (
	feedbackCtx       = newContextual[*models.Feedback]("feedback")
	gooseDBVersionCtx = newContextual[*models.GooseDBVersion]("gooseDBVersion")
	itemCtx           = newContextual[*models.Item]("item")
	matchCtx          = newContextual[*models.Match]("match")
	newsInforCtx      = newContextual[*models.NewsInfor]("newsInfor")
	teamCtx           = newContextual[*models.Team]("team")
	tournamentCtx     = newContextual[*models.Tournament]("tournament")
	userCtx           = newContextual[*models.User]("user")
)

type contextual[V any] struct {
	key contextKey
}

// This could be weird because of type inference not handling `K` due to `V` having to be manual.
func newContextual[V any](key string) contextual[V] {
	return contextual[V]{key: contextKey(key)}
}

func (k contextual[V]) WithValue(ctx context.Context, val V) context.Context {
	return context.WithValue(ctx, k.key, val)
}

func (k contextual[V]) Value(ctx context.Context) (V, bool) {
	v, ok := ctx.Value(k.key).(V)
	return v, ok
}

var defaultFaker = faker.New()

// random returns a random value for the given type, using the faker
// * If the given faker is nil, the default faker is used
// * The zero value is returned if the type cannot be handled
func random[T any](f *faker.Faker) T {
	if f == nil {
		f = &defaultFaker
	}

	var val T
	switch any(val).(type) {
	default:
		return val
	case string:
		return any(string(strings.Join(f.Lorem().Words(5), " "))).(T)

	case bool:
		return any(bool(f.BoolWithChance(50))).(T)

	case int:
		return any(int(f.Int())).(T)

	case time.Time:
		return val

	case int64:
		return val

	case types.JSON[json.RawMessage]:
		return val

	case MatchStatus:
		return val

	}
}

// randomNull is like [Random], but for null types
func randomNull[T any](f *faker.Faker) null.Val[T] {
	return null.From(random[T](f))
}
