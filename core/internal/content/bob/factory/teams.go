// Code generated by BobGen psql v0.21.1. DO NOT EDIT.
// This file is meant to be re-generated in place and/or deleted at any time.

package factory

import (
	"context"
	"time"

	models "core/internal/content/bob"
	"github.com/aarondl/opt/null"
	"github.com/aarondl/opt/omit"
	"github.com/aarondl/opt/omitnull"
	"github.com/google/uuid"
	"github.com/jaswdr/faker"
	"github.com/stephenafamo/bob"
)

type TeamMod interface {
	Apply(*TeamTemplate)
}

type TeamModFunc func(*TeamTemplate)

func (f TeamModFunc) Apply(n *TeamTemplate) {
	f(n)
}

type TeamModSlice []TeamMod

func (mods TeamModSlice) Apply(n *TeamTemplate) {
	for _, f := range mods {
		f.Apply(n)
	}
}

// TeamTemplate is an object representing the database table.
// all columns are optional and should be set by mods
type TeamTemplate struct {
	ID        func() uuid.UUID
	Name      func() string
	ShortName func() null.Val[string]
	Gender    func() string
	NameCode  func() string
	Logo      func() string
	Slug      func() string
	IDSync    func() string
	CreatedAt func() time.Time
	UpdatedAt func() time.Time

	r teamR
	f *factory
}

type teamR struct {
	AwayMatchs []*teamRAwayMatchsR
	HomeMatchs []*teamRHomeMatchsR
}

type teamRAwayMatchsR struct {
	number int
	o      *MatchTemplate
}
type teamRHomeMatchsR struct {
	number int
	o      *MatchTemplate
}

// Apply mods to the TeamTemplate
func (o *TeamTemplate) Apply(mods ...TeamMod) {
	for _, mod := range mods {
		mod.Apply(o)
	}
}

// toModel returns an *models.Team
// this does nothing with the relationship templates
func (o TeamTemplate) toModel() *models.Team {
	m := &models.Team{}

	if o.ID != nil {
		m.ID = o.ID()
	}
	if o.Name != nil {
		m.Name = o.Name()
	}
	if o.ShortName != nil {
		m.ShortName = o.ShortName()
	}
	if o.Gender != nil {
		m.Gender = o.Gender()
	}
	if o.NameCode != nil {
		m.NameCode = o.NameCode()
	}
	if o.Logo != nil {
		m.Logo = o.Logo()
	}
	if o.Slug != nil {
		m.Slug = o.Slug()
	}
	if o.IDSync != nil {
		m.IDSync = o.IDSync()
	}
	if o.CreatedAt != nil {
		m.CreatedAt = o.CreatedAt()
	}
	if o.UpdatedAt != nil {
		m.UpdatedAt = o.UpdatedAt()
	}

	return m
}

// toModels returns an models.TeamSlice
// this does nothing with the relationship templates
func (o TeamTemplate) toModels(number int) models.TeamSlice {
	m := make(models.TeamSlice, number)

	for i := range m {
		m[i] = o.toModel()
	}

	return m
}

// setModelRels creates and sets the relationships on *models.Team
// according to the relationships in the template. Nothing is inserted into the db
func (t TeamTemplate) setModelRels(o *models.Team) {
	if t.r.AwayMatchs != nil {
		rel := models.MatchSlice{}
		for _, r := range t.r.AwayMatchs {
			related := r.o.toModels(r.number)
			for _, rel := range related {
				rel.AwayID = o.ID
				rel.R.AwayTeam = o
			}
			rel = append(rel, related...)
		}
		o.R.AwayMatchs = rel
	}

	if t.r.HomeMatchs != nil {
		rel := models.MatchSlice{}
		for _, r := range t.r.HomeMatchs {
			related := r.o.toModels(r.number)
			for _, rel := range related {
				rel.HomeID = o.ID
				rel.R.HomeTeam = o
			}
			rel = append(rel, related...)
		}
		o.R.HomeMatchs = rel
	}

}

// BuildSetter returns an *models.TeamSetter
// this does nothing with the relationship templates
func (o TeamTemplate) BuildSetter() *models.TeamSetter {
	m := &models.TeamSetter{}

	if o.ID != nil {
		m.ID = omit.From(o.ID())
	}
	if o.Name != nil {
		m.Name = omit.From(o.Name())
	}
	if o.ShortName != nil {
		m.ShortName = omitnull.FromNull(o.ShortName())
	}
	if o.Gender != nil {
		m.Gender = omit.From(o.Gender())
	}
	if o.NameCode != nil {
		m.NameCode = omit.From(o.NameCode())
	}
	if o.Logo != nil {
		m.Logo = omit.From(o.Logo())
	}
	if o.Slug != nil {
		m.Slug = omit.From(o.Slug())
	}
	if o.IDSync != nil {
		m.IDSync = omit.From(o.IDSync())
	}
	if o.CreatedAt != nil {
		m.CreatedAt = omit.From(o.CreatedAt())
	}
	if o.UpdatedAt != nil {
		m.UpdatedAt = omit.From(o.UpdatedAt())
	}

	return m
}

// BuildManySetter returns an []*models.TeamSetter
// this does nothing with the relationship templates
func (o TeamTemplate) BuildManySetter(number int) []*models.TeamSetter {
	m := make([]*models.TeamSetter, number)

	for i := range m {
		m[i] = o.BuildSetter()
	}

	return m
}

// Build returns an *models.Team
// Related objects are also created and placed in the .R field
// NOTE: Objects are not inserted into the database. Use TeamTemplate.Create
func (o TeamTemplate) Build() *models.Team {
	m := o.toModel()
	o.setModelRels(m)

	return m
}

// BuildMany returns an models.TeamSlice
// Related objects are also created and placed in the .R field
// NOTE: Objects are not inserted into the database. Use TeamTemplate.CreateMany
func (o TeamTemplate) BuildMany(number int) models.TeamSlice {
	m := make(models.TeamSlice, number)

	for i := range m {
		m[i] = o.Build()
	}

	return m
}

func ensureCreatableTeam(m *models.TeamSetter) {
	if m.ID.IsUnset() {
		m.ID = omit.From(random[uuid.UUID](nil))
	}
	if m.Name.IsUnset() {
		m.Name = omit.From(random[string](nil))
	}
	if m.Gender.IsUnset() {
		m.Gender = omit.From(random[string](nil))
	}
	if m.NameCode.IsUnset() {
		m.NameCode = omit.From(random[string](nil))
	}
	if m.Logo.IsUnset() {
		m.Logo = omit.From(random[string](nil))
	}
	if m.Slug.IsUnset() {
		m.Slug = omit.From(random[string](nil))
	}
	if m.IDSync.IsUnset() {
		m.IDSync = omit.From(random[string](nil))
	}
	if m.CreatedAt.IsUnset() {
		m.CreatedAt = omit.From(random[time.Time](nil))
	}
	if m.UpdatedAt.IsUnset() {
		m.UpdatedAt = omit.From(random[time.Time](nil))
	}
}

// insertOptRels creates and inserts any optional the relationships on *models.Team
// according to the relationships in the template.
// any required relationship should have already exist on the model
func (o *TeamTemplate) insertOptRels(ctx context.Context, exec bob.Executor, m *models.Team) (context.Context, error) {
	var err error

	if o.r.AwayMatchs != nil {
		for _, r := range o.r.AwayMatchs {
			var rel0 models.MatchSlice
			ctx, rel0, err = r.o.createMany(ctx, exec, r.number)
			if err != nil {
				return ctx, err
			}

			err = m.AttachAwayMatchs(ctx, exec, rel0...)
			if err != nil {
				return ctx, err
			}
		}
	}

	if o.r.HomeMatchs != nil {
		for _, r := range o.r.HomeMatchs {
			var rel1 models.MatchSlice
			ctx, rel1, err = r.o.createMany(ctx, exec, r.number)
			if err != nil {
				return ctx, err
			}

			err = m.AttachHomeMatchs(ctx, exec, rel1...)
			if err != nil {
				return ctx, err
			}
		}
	}

	return ctx, err
}

// Create builds a team and inserts it into the database
// Relations objects are also inserted and placed in the .R field
func (o *TeamTemplate) Create(ctx context.Context, exec bob.Executor) (*models.Team, error) {
	_, m, err := o.create(ctx, exec)
	return m, err
}

// create builds a team and inserts it into the database
// Relations objects are also inserted and placed in the .R field
// this returns a context that includes the newly inserted model
func (o *TeamTemplate) create(ctx context.Context, exec bob.Executor) (context.Context, *models.Team, error) {
	var err error
	opt := o.BuildSetter()
	ensureCreatableTeam(opt)

	m, err := models.TeamsTable.Insert(ctx, exec, opt)
	if err != nil {
		return ctx, nil, err
	}
	ctx = teamCtx.WithValue(ctx, m)

	ctx, err = o.insertOptRels(ctx, exec, m)
	return ctx, m, err
}

// CreateMany builds multiple teams and inserts them into the database
// Relations objects are also inserted and placed in the .R field
func (o TeamTemplate) CreateMany(ctx context.Context, exec bob.Executor, number int) (models.TeamSlice, error) {
	_, m, err := o.createMany(ctx, exec, number)
	return m, err
}

// createMany builds multiple teams and inserts them into the database
// Relations objects are also inserted and placed in the .R field
// this returns a context that includes the newly inserted models
func (o TeamTemplate) createMany(ctx context.Context, exec bob.Executor, number int) (context.Context, models.TeamSlice, error) {
	var err error
	m := make(models.TeamSlice, number)

	for i := range m {
		ctx, m[i], err = o.create(ctx, exec)
		if err != nil {
			return ctx, nil, err
		}
	}

	return ctx, m, nil
}

// Team has methods that act as mods for the TeamTemplate
var TeamMods teamMods

type teamMods struct{}

func (m teamMods) RandomizeAllColumns(f *faker.Faker) TeamMod {
	return TeamModSlice{
		TeamMods.RandomID(f),
		TeamMods.RandomName(f),
		TeamMods.RandomShortName(f),
		TeamMods.RandomGender(f),
		TeamMods.RandomNameCode(f),
		TeamMods.RandomLogo(f),
		TeamMods.RandomSlug(f),
		TeamMods.RandomIDSync(f),
		TeamMods.RandomCreatedAt(f),
		TeamMods.RandomUpdatedAt(f),
	}
}

// Set the model columns to this value
func (m teamMods) ID(val uuid.UUID) TeamMod {
	return TeamModFunc(func(o *TeamTemplate) {
		o.ID = func() uuid.UUID { return val }
	})
}

// Set the Column from the function
func (m teamMods) IDFunc(f func() uuid.UUID) TeamMod {
	return TeamModFunc(func(o *TeamTemplate) {
		o.ID = f
	})
}

// Clear any values for the column
func (m teamMods) UnsetID() TeamMod {
	return TeamModFunc(func(o *TeamTemplate) {
		o.ID = nil
	})
}

// Generates a random value for the column using the given faker
// if faker is nil, a default faker is used
func (m teamMods) RandomID(f *faker.Faker) TeamMod {
	return TeamModFunc(func(o *TeamTemplate) {
		o.ID = func() uuid.UUID {
			return random[uuid.UUID](f)
		}
	})
}

func (m teamMods) ensureID(f *faker.Faker) TeamMod {
	return TeamModFunc(func(o *TeamTemplate) {
		if o.ID != nil {
			return
		}

		o.ID = func() uuid.UUID {
			return random[uuid.UUID](f)
		}
	})
}

// Set the model columns to this value
func (m teamMods) Name(val string) TeamMod {
	return TeamModFunc(func(o *TeamTemplate) {
		o.Name = func() string { return val }
	})
}

// Set the Column from the function
func (m teamMods) NameFunc(f func() string) TeamMod {
	return TeamModFunc(func(o *TeamTemplate) {
		o.Name = f
	})
}

// Clear any values for the column
func (m teamMods) UnsetName() TeamMod {
	return TeamModFunc(func(o *TeamTemplate) {
		o.Name = nil
	})
}

// Generates a random value for the column using the given faker
// if faker is nil, a default faker is used
func (m teamMods) RandomName(f *faker.Faker) TeamMod {
	return TeamModFunc(func(o *TeamTemplate) {
		o.Name = func() string {
			return random[string](f)
		}
	})
}

func (m teamMods) ensureName(f *faker.Faker) TeamMod {
	return TeamModFunc(func(o *TeamTemplate) {
		if o.Name != nil {
			return
		}

		o.Name = func() string {
			return random[string](f)
		}
	})
}

// Set the model columns to this value
func (m teamMods) ShortName(val null.Val[string]) TeamMod {
	return TeamModFunc(func(o *TeamTemplate) {
		o.ShortName = func() null.Val[string] { return val }
	})
}

// Set the Column from the function
func (m teamMods) ShortNameFunc(f func() null.Val[string]) TeamMod {
	return TeamModFunc(func(o *TeamTemplate) {
		o.ShortName = f
	})
}

// Clear any values for the column
func (m teamMods) UnsetShortName() TeamMod {
	return TeamModFunc(func(o *TeamTemplate) {
		o.ShortName = nil
	})
}

// Generates a random value for the column using the given faker
// if faker is nil, a default faker is used
func (m teamMods) RandomShortName(f *faker.Faker) TeamMod {
	return TeamModFunc(func(o *TeamTemplate) {
		o.ShortName = func() null.Val[string] {
			return randomNull[string](f)
		}
	})
}

func (m teamMods) ensureShortName(f *faker.Faker) TeamMod {
	return TeamModFunc(func(o *TeamTemplate) {
		if o.ShortName != nil {
			return
		}

		o.ShortName = func() null.Val[string] {
			return randomNull[string](f)
		}
	})
}

// Set the model columns to this value
func (m teamMods) Gender(val string) TeamMod {
	return TeamModFunc(func(o *TeamTemplate) {
		o.Gender = func() string { return val }
	})
}

// Set the Column from the function
func (m teamMods) GenderFunc(f func() string) TeamMod {
	return TeamModFunc(func(o *TeamTemplate) {
		o.Gender = f
	})
}

// Clear any values for the column
func (m teamMods) UnsetGender() TeamMod {
	return TeamModFunc(func(o *TeamTemplate) {
		o.Gender = nil
	})
}

// Generates a random value for the column using the given faker
// if faker is nil, a default faker is used
func (m teamMods) RandomGender(f *faker.Faker) TeamMod {
	return TeamModFunc(func(o *TeamTemplate) {
		o.Gender = func() string {
			return random[string](f)
		}
	})
}

func (m teamMods) ensureGender(f *faker.Faker) TeamMod {
	return TeamModFunc(func(o *TeamTemplate) {
		if o.Gender != nil {
			return
		}

		o.Gender = func() string {
			return random[string](f)
		}
	})
}

// Set the model columns to this value
func (m teamMods) NameCode(val string) TeamMod {
	return TeamModFunc(func(o *TeamTemplate) {
		o.NameCode = func() string { return val }
	})
}

// Set the Column from the function
func (m teamMods) NameCodeFunc(f func() string) TeamMod {
	return TeamModFunc(func(o *TeamTemplate) {
		o.NameCode = f
	})
}

// Clear any values for the column
func (m teamMods) UnsetNameCode() TeamMod {
	return TeamModFunc(func(o *TeamTemplate) {
		o.NameCode = nil
	})
}

// Generates a random value for the column using the given faker
// if faker is nil, a default faker is used
func (m teamMods) RandomNameCode(f *faker.Faker) TeamMod {
	return TeamModFunc(func(o *TeamTemplate) {
		o.NameCode = func() string {
			return random[string](f)
		}
	})
}

func (m teamMods) ensureNameCode(f *faker.Faker) TeamMod {
	return TeamModFunc(func(o *TeamTemplate) {
		if o.NameCode != nil {
			return
		}

		o.NameCode = func() string {
			return random[string](f)
		}
	})
}

// Set the model columns to this value
func (m teamMods) Logo(val string) TeamMod {
	return TeamModFunc(func(o *TeamTemplate) {
		o.Logo = func() string { return val }
	})
}

// Set the Column from the function
func (m teamMods) LogoFunc(f func() string) TeamMod {
	return TeamModFunc(func(o *TeamTemplate) {
		o.Logo = f
	})
}

// Clear any values for the column
func (m teamMods) UnsetLogo() TeamMod {
	return TeamModFunc(func(o *TeamTemplate) {
		o.Logo = nil
	})
}

// Generates a random value for the column using the given faker
// if faker is nil, a default faker is used
func (m teamMods) RandomLogo(f *faker.Faker) TeamMod {
	return TeamModFunc(func(o *TeamTemplate) {
		o.Logo = func() string {
			return random[string](f)
		}
	})
}

func (m teamMods) ensureLogo(f *faker.Faker) TeamMod {
	return TeamModFunc(func(o *TeamTemplate) {
		if o.Logo != nil {
			return
		}

		o.Logo = func() string {
			return random[string](f)
		}
	})
}

// Set the model columns to this value
func (m teamMods) Slug(val string) TeamMod {
	return TeamModFunc(func(o *TeamTemplate) {
		o.Slug = func() string { return val }
	})
}

// Set the Column from the function
func (m teamMods) SlugFunc(f func() string) TeamMod {
	return TeamModFunc(func(o *TeamTemplate) {
		o.Slug = f
	})
}

// Clear any values for the column
func (m teamMods) UnsetSlug() TeamMod {
	return TeamModFunc(func(o *TeamTemplate) {
		o.Slug = nil
	})
}

// Generates a random value for the column using the given faker
// if faker is nil, a default faker is used
func (m teamMods) RandomSlug(f *faker.Faker) TeamMod {
	return TeamModFunc(func(o *TeamTemplate) {
		o.Slug = func() string {
			return random[string](f)
		}
	})
}

func (m teamMods) ensureSlug(f *faker.Faker) TeamMod {
	return TeamModFunc(func(o *TeamTemplate) {
		if o.Slug != nil {
			return
		}

		o.Slug = func() string {
			return random[string](f)
		}
	})
}

// Set the model columns to this value
func (m teamMods) IDSync(val string) TeamMod {
	return TeamModFunc(func(o *TeamTemplate) {
		o.IDSync = func() string { return val }
	})
}

// Set the Column from the function
func (m teamMods) IDSyncFunc(f func() string) TeamMod {
	return TeamModFunc(func(o *TeamTemplate) {
		o.IDSync = f
	})
}

// Clear any values for the column
func (m teamMods) UnsetIDSync() TeamMod {
	return TeamModFunc(func(o *TeamTemplate) {
		o.IDSync = nil
	})
}

// Generates a random value for the column using the given faker
// if faker is nil, a default faker is used
func (m teamMods) RandomIDSync(f *faker.Faker) TeamMod {
	return TeamModFunc(func(o *TeamTemplate) {
		o.IDSync = func() string {
			return random[string](f)
		}
	})
}

func (m teamMods) ensureIDSync(f *faker.Faker) TeamMod {
	return TeamModFunc(func(o *TeamTemplate) {
		if o.IDSync != nil {
			return
		}

		o.IDSync = func() string {
			return random[string](f)
		}
	})
}

// Set the model columns to this value
func (m teamMods) CreatedAt(val time.Time) TeamMod {
	return TeamModFunc(func(o *TeamTemplate) {
		o.CreatedAt = func() time.Time { return val }
	})
}

// Set the Column from the function
func (m teamMods) CreatedAtFunc(f func() time.Time) TeamMod {
	return TeamModFunc(func(o *TeamTemplate) {
		o.CreatedAt = f
	})
}

// Clear any values for the column
func (m teamMods) UnsetCreatedAt() TeamMod {
	return TeamModFunc(func(o *TeamTemplate) {
		o.CreatedAt = nil
	})
}

// Generates a random value for the column using the given faker
// if faker is nil, a default faker is used
func (m teamMods) RandomCreatedAt(f *faker.Faker) TeamMod {
	return TeamModFunc(func(o *TeamTemplate) {
		o.CreatedAt = func() time.Time {
			return random[time.Time](f)
		}
	})
}

func (m teamMods) ensureCreatedAt(f *faker.Faker) TeamMod {
	return TeamModFunc(func(o *TeamTemplate) {
		if o.CreatedAt != nil {
			return
		}

		o.CreatedAt = func() time.Time {
			return random[time.Time](f)
		}
	})
}

// Set the model columns to this value
func (m teamMods) UpdatedAt(val time.Time) TeamMod {
	return TeamModFunc(func(o *TeamTemplate) {
		o.UpdatedAt = func() time.Time { return val }
	})
}

// Set the Column from the function
func (m teamMods) UpdatedAtFunc(f func() time.Time) TeamMod {
	return TeamModFunc(func(o *TeamTemplate) {
		o.UpdatedAt = f
	})
}

// Clear any values for the column
func (m teamMods) UnsetUpdatedAt() TeamMod {
	return TeamModFunc(func(o *TeamTemplate) {
		o.UpdatedAt = nil
	})
}

// Generates a random value for the column using the given faker
// if faker is nil, a default faker is used
func (m teamMods) RandomUpdatedAt(f *faker.Faker) TeamMod {
	return TeamModFunc(func(o *TeamTemplate) {
		o.UpdatedAt = func() time.Time {
			return random[time.Time](f)
		}
	})
}

func (m teamMods) ensureUpdatedAt(f *faker.Faker) TeamMod {
	return TeamModFunc(func(o *TeamTemplate) {
		if o.UpdatedAt != nil {
			return
		}

		o.UpdatedAt = func() time.Time {
			return random[time.Time](f)
		}
	})
}

func (m teamMods) WithAwayMatchs(number int, related *MatchTemplate) TeamMod {
	return TeamModFunc(func(o *TeamTemplate) {
		o.r.AwayMatchs = []*teamRAwayMatchsR{{
			number: number,
			o:      related,
		}}
	})
}

func (m teamMods) WithNewAwayMatchs(number int, mods ...MatchMod) TeamMod {
	return TeamModFunc(func(o *TeamTemplate) {

		related := o.f.NewMatch(mods...)
		m.WithAwayMatchs(number, related).Apply(o)
	})
}

func (m teamMods) AddAwayMatchs(number int, related *MatchTemplate) TeamMod {
	return TeamModFunc(func(o *TeamTemplate) {
		o.r.AwayMatchs = append(o.r.AwayMatchs, &teamRAwayMatchsR{
			number: number,
			o:      related,
		})
	})
}

func (m teamMods) AddNewAwayMatchs(number int, mods ...MatchMod) TeamMod {
	return TeamModFunc(func(o *TeamTemplate) {

		related := o.f.NewMatch(mods...)
		m.AddAwayMatchs(number, related).Apply(o)
	})
}

func (m teamMods) WithoutAwayMatchs() TeamMod {
	return TeamModFunc(func(o *TeamTemplate) {
		o.r.AwayMatchs = nil
	})
}

func (m teamMods) WithHomeMatchs(number int, related *MatchTemplate) TeamMod {
	return TeamModFunc(func(o *TeamTemplate) {
		o.r.HomeMatchs = []*teamRHomeMatchsR{{
			number: number,
			o:      related,
		}}
	})
}

func (m teamMods) WithNewHomeMatchs(number int, mods ...MatchMod) TeamMod {
	return TeamModFunc(func(o *TeamTemplate) {

		related := o.f.NewMatch(mods...)
		m.WithHomeMatchs(number, related).Apply(o)
	})
}

func (m teamMods) AddHomeMatchs(number int, related *MatchTemplate) TeamMod {
	return TeamModFunc(func(o *TeamTemplate) {
		o.r.HomeMatchs = append(o.r.HomeMatchs, &teamRHomeMatchsR{
			number: number,
			o:      related,
		})
	})
}

func (m teamMods) AddNewHomeMatchs(number int, mods ...MatchMod) TeamMod {
	return TeamModFunc(func(o *TeamTemplate) {

		related := o.f.NewMatch(mods...)
		m.AddHomeMatchs(number, related).Apply(o)
	})
}

func (m teamMods) WithoutHomeMatchs() TeamMod {
	return TeamModFunc(func(o *TeamTemplate) {
		o.r.HomeMatchs = nil
	})
}
