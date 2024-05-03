// Code generated by BobGen psql v0.21.1. DO NOT EDIT.
// This file is meant to be re-generated in place and/or deleted at any time.

package factory

import (
	"context"
	"encoding/json"
	"time"

	models "core/internal/content/bob"
	"github.com/aarondl/opt/null"
	"github.com/aarondl/opt/omit"
	"github.com/aarondl/opt/omitnull"
	"github.com/jaswdr/faker"
	"github.com/stephenafamo/bob"
	"github.com/stephenafamo/bob/types"
)

type ReviewMatchMod interface {
	Apply(*ReviewMatchTemplate)
}

type ReviewMatchModFunc func(*ReviewMatchTemplate)

func (f ReviewMatchModFunc) Apply(n *ReviewMatchTemplate) {
	f(n)
}

type ReviewMatchModSlice []ReviewMatchMod

func (mods ReviewMatchModSlice) Apply(n *ReviewMatchTemplate) {
	for _, f := range mods {
		f.Apply(n)
	}
}

// ReviewMatchTemplate is an object representing the database table.
// all columns are optional and should be set by mods
type ReviewMatchTemplate struct {
	ID           func() string
	Name         func() string
	Slug         func() string
	Description  func() string
	VideoURL     func() string
	FeatureImage func() string
	Category     func() types.JSON[json.RawMessage]
	Label        func() null.Val[types.JSON[json.RawMessage]]
	Content      func() string
	Title        func() string
	H1           func() string
	CreatedAt    func() time.Time
	UpdatedAt    func() time.Time

	f *factory
}

// Apply mods to the ReviewMatchTemplate
func (o *ReviewMatchTemplate) Apply(mods ...ReviewMatchMod) {
	for _, mod := range mods {
		mod.Apply(o)
	}
}

// toModel returns an *models.ReviewMatch
// this does nothing with the relationship templates
func (o ReviewMatchTemplate) toModel() *models.ReviewMatch {
	m := &models.ReviewMatch{}

	if o.ID != nil {
		m.ID = o.ID()
	}
	if o.Name != nil {
		m.Name = o.Name()
	}
	if o.Slug != nil {
		m.Slug = o.Slug()
	}
	if o.Description != nil {
		m.Description = o.Description()
	}
	if o.VideoURL != nil {
		m.VideoURL = o.VideoURL()
	}
	if o.FeatureImage != nil {
		m.FeatureImage = o.FeatureImage()
	}
	if o.Category != nil {
		m.Category = o.Category()
	}
	if o.Label != nil {
		m.Label = o.Label()
	}
	if o.Content != nil {
		m.Content = o.Content()
	}
	if o.Title != nil {
		m.Title = o.Title()
	}
	if o.H1 != nil {
		m.H1 = o.H1()
	}
	if o.CreatedAt != nil {
		m.CreatedAt = o.CreatedAt()
	}
	if o.UpdatedAt != nil {
		m.UpdatedAt = o.UpdatedAt()
	}

	return m
}

// toModels returns an models.ReviewMatchSlice
// this does nothing with the relationship templates
func (o ReviewMatchTemplate) toModels(number int) models.ReviewMatchSlice {
	m := make(models.ReviewMatchSlice, number)

	for i := range m {
		m[i] = o.toModel()
	}

	return m
}

// setModelRels creates and sets the relationships on *models.ReviewMatch
// according to the relationships in the template. Nothing is inserted into the db
func (t ReviewMatchTemplate) setModelRels(o *models.ReviewMatch) {}

// BuildSetter returns an *models.ReviewMatchSetter
// this does nothing with the relationship templates
func (o ReviewMatchTemplate) BuildSetter() *models.ReviewMatchSetter {
	m := &models.ReviewMatchSetter{}

	if o.ID != nil {
		m.ID = omit.From(o.ID())
	}
	if o.Name != nil {
		m.Name = omit.From(o.Name())
	}
	if o.Slug != nil {
		m.Slug = omit.From(o.Slug())
	}
	if o.Description != nil {
		m.Description = omit.From(o.Description())
	}
	if o.VideoURL != nil {
		m.VideoURL = omit.From(o.VideoURL())
	}
	if o.FeatureImage != nil {
		m.FeatureImage = omit.From(o.FeatureImage())
	}
	if o.Category != nil {
		m.Category = omit.From(o.Category())
	}
	if o.Label != nil {
		m.Label = omitnull.FromNull(o.Label())
	}
	if o.Content != nil {
		m.Content = omit.From(o.Content())
	}
	if o.Title != nil {
		m.Title = omit.From(o.Title())
	}
	if o.H1 != nil {
		m.H1 = omit.From(o.H1())
	}
	if o.CreatedAt != nil {
		m.CreatedAt = omit.From(o.CreatedAt())
	}
	if o.UpdatedAt != nil {
		m.UpdatedAt = omit.From(o.UpdatedAt())
	}

	return m
}

// BuildManySetter returns an []*models.ReviewMatchSetter
// this does nothing with the relationship templates
func (o ReviewMatchTemplate) BuildManySetter(number int) []*models.ReviewMatchSetter {
	m := make([]*models.ReviewMatchSetter, number)

	for i := range m {
		m[i] = o.BuildSetter()
	}

	return m
}

// Build returns an *models.ReviewMatch
// Related objects are also created and placed in the .R field
// NOTE: Objects are not inserted into the database. Use ReviewMatchTemplate.Create
func (o ReviewMatchTemplate) Build() *models.ReviewMatch {
	m := o.toModel()
	o.setModelRels(m)

	return m
}

// BuildMany returns an models.ReviewMatchSlice
// Related objects are also created and placed in the .R field
// NOTE: Objects are not inserted into the database. Use ReviewMatchTemplate.CreateMany
func (o ReviewMatchTemplate) BuildMany(number int) models.ReviewMatchSlice {
	m := make(models.ReviewMatchSlice, number)

	for i := range m {
		m[i] = o.Build()
	}

	return m
}

func ensureCreatableReviewMatch(m *models.ReviewMatchSetter) {
	if m.ID.IsUnset() {
		m.ID = omit.From(random[string](nil))
	}
	if m.Name.IsUnset() {
		m.Name = omit.From(random[string](nil))
	}
	if m.Slug.IsUnset() {
		m.Slug = omit.From(random[string](nil))
	}
	if m.Description.IsUnset() {
		m.Description = omit.From(random[string](nil))
	}
	if m.VideoURL.IsUnset() {
		m.VideoURL = omit.From(random[string](nil))
	}
	if m.FeatureImage.IsUnset() {
		m.FeatureImage = omit.From(random[string](nil))
	}
	if m.Category.IsUnset() {
		m.Category = omit.From(random[types.JSON[json.RawMessage]](nil))
	}
	if m.Content.IsUnset() {
		m.Content = omit.From(random[string](nil))
	}
	if m.Title.IsUnset() {
		m.Title = omit.From(random[string](nil))
	}
	if m.H1.IsUnset() {
		m.H1 = omit.From(random[string](nil))
	}
	if m.CreatedAt.IsUnset() {
		m.CreatedAt = omit.From(random[time.Time](nil))
	}
	if m.UpdatedAt.IsUnset() {
		m.UpdatedAt = omit.From(random[time.Time](nil))
	}
}

// insertOptRels creates and inserts any optional the relationships on *models.ReviewMatch
// according to the relationships in the template.
// any required relationship should have already exist on the model
func (o *ReviewMatchTemplate) insertOptRels(ctx context.Context, exec bob.Executor, m *models.ReviewMatch) (context.Context, error) {
	var err error

	return ctx, err
}

// Create builds a reviewMatch and inserts it into the database
// Relations objects are also inserted and placed in the .R field
func (o *ReviewMatchTemplate) Create(ctx context.Context, exec bob.Executor) (*models.ReviewMatch, error) {
	_, m, err := o.create(ctx, exec)
	return m, err
}

// create builds a reviewMatch and inserts it into the database
// Relations objects are also inserted and placed in the .R field
// this returns a context that includes the newly inserted model
func (o *ReviewMatchTemplate) create(ctx context.Context, exec bob.Executor) (context.Context, *models.ReviewMatch, error) {
	var err error
	opt := o.BuildSetter()
	ensureCreatableReviewMatch(opt)

	m, err := models.ReviewMatchsTable.Insert(ctx, exec, opt)
	if err != nil {
		return ctx, nil, err
	}
	ctx = reviewMatchCtx.WithValue(ctx, m)

	ctx, err = o.insertOptRels(ctx, exec, m)
	return ctx, m, err
}

// CreateMany builds multiple reviewMatchs and inserts them into the database
// Relations objects are also inserted and placed in the .R field
func (o ReviewMatchTemplate) CreateMany(ctx context.Context, exec bob.Executor, number int) (models.ReviewMatchSlice, error) {
	_, m, err := o.createMany(ctx, exec, number)
	return m, err
}

// createMany builds multiple reviewMatchs and inserts them into the database
// Relations objects are also inserted and placed in the .R field
// this returns a context that includes the newly inserted models
func (o ReviewMatchTemplate) createMany(ctx context.Context, exec bob.Executor, number int) (context.Context, models.ReviewMatchSlice, error) {
	var err error
	m := make(models.ReviewMatchSlice, number)

	for i := range m {
		ctx, m[i], err = o.create(ctx, exec)
		if err != nil {
			return ctx, nil, err
		}
	}

	return ctx, m, nil
}

// ReviewMatch has methods that act as mods for the ReviewMatchTemplate
var ReviewMatchMods reviewMatchMods

type reviewMatchMods struct{}

func (m reviewMatchMods) RandomizeAllColumns(f *faker.Faker) ReviewMatchMod {
	return ReviewMatchModSlice{
		ReviewMatchMods.RandomID(f),
		ReviewMatchMods.RandomName(f),
		ReviewMatchMods.RandomSlug(f),
		ReviewMatchMods.RandomDescription(f),
		ReviewMatchMods.RandomVideoURL(f),
		ReviewMatchMods.RandomFeatureImage(f),
		ReviewMatchMods.RandomCategory(f),
		ReviewMatchMods.RandomLabel(f),
		ReviewMatchMods.RandomContent(f),
		ReviewMatchMods.RandomTitle(f),
		ReviewMatchMods.RandomH1(f),
		ReviewMatchMods.RandomCreatedAt(f),
		ReviewMatchMods.RandomUpdatedAt(f),
	}
}

// Set the model columns to this value
func (m reviewMatchMods) ID(val string) ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		o.ID = func() string { return val }
	})
}

// Set the Column from the function
func (m reviewMatchMods) IDFunc(f func() string) ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		o.ID = f
	})
}

// Clear any values for the column
func (m reviewMatchMods) UnsetID() ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		o.ID = nil
	})
}

// Generates a random value for the column using the given faker
// if faker is nil, a default faker is used
func (m reviewMatchMods) RandomID(f *faker.Faker) ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		o.ID = func() string {
			return random[string](f)
		}
	})
}

func (m reviewMatchMods) ensureID(f *faker.Faker) ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		if o.ID != nil {
			return
		}

		o.ID = func() string {
			return random[string](f)
		}
	})
}

// Set the model columns to this value
func (m reviewMatchMods) Name(val string) ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		o.Name = func() string { return val }
	})
}

// Set the Column from the function
func (m reviewMatchMods) NameFunc(f func() string) ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		o.Name = f
	})
}

// Clear any values for the column
func (m reviewMatchMods) UnsetName() ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		o.Name = nil
	})
}

// Generates a random value for the column using the given faker
// if faker is nil, a default faker is used
func (m reviewMatchMods) RandomName(f *faker.Faker) ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		o.Name = func() string {
			return random[string](f)
		}
	})
}

func (m reviewMatchMods) ensureName(f *faker.Faker) ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		if o.Name != nil {
			return
		}

		o.Name = func() string {
			return random[string](f)
		}
	})
}

// Set the model columns to this value
func (m reviewMatchMods) Slug(val string) ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		o.Slug = func() string { return val }
	})
}

// Set the Column from the function
func (m reviewMatchMods) SlugFunc(f func() string) ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		o.Slug = f
	})
}

// Clear any values for the column
func (m reviewMatchMods) UnsetSlug() ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		o.Slug = nil
	})
}

// Generates a random value for the column using the given faker
// if faker is nil, a default faker is used
func (m reviewMatchMods) RandomSlug(f *faker.Faker) ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		o.Slug = func() string {
			return random[string](f)
		}
	})
}

func (m reviewMatchMods) ensureSlug(f *faker.Faker) ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		if o.Slug != nil {
			return
		}

		o.Slug = func() string {
			return random[string](f)
		}
	})
}

// Set the model columns to this value
func (m reviewMatchMods) Description(val string) ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		o.Description = func() string { return val }
	})
}

// Set the Column from the function
func (m reviewMatchMods) DescriptionFunc(f func() string) ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		o.Description = f
	})
}

// Clear any values for the column
func (m reviewMatchMods) UnsetDescription() ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		o.Description = nil
	})
}

// Generates a random value for the column using the given faker
// if faker is nil, a default faker is used
func (m reviewMatchMods) RandomDescription(f *faker.Faker) ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		o.Description = func() string {
			return random[string](f)
		}
	})
}

func (m reviewMatchMods) ensureDescription(f *faker.Faker) ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		if o.Description != nil {
			return
		}

		o.Description = func() string {
			return random[string](f)
		}
	})
}

// Set the model columns to this value
func (m reviewMatchMods) VideoURL(val string) ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		o.VideoURL = func() string { return val }
	})
}

// Set the Column from the function
func (m reviewMatchMods) VideoURLFunc(f func() string) ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		o.VideoURL = f
	})
}

// Clear any values for the column
func (m reviewMatchMods) UnsetVideoURL() ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		o.VideoURL = nil
	})
}

// Generates a random value for the column using the given faker
// if faker is nil, a default faker is used
func (m reviewMatchMods) RandomVideoURL(f *faker.Faker) ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		o.VideoURL = func() string {
			return random[string](f)
		}
	})
}

func (m reviewMatchMods) ensureVideoURL(f *faker.Faker) ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		if o.VideoURL != nil {
			return
		}

		o.VideoURL = func() string {
			return random[string](f)
		}
	})
}

// Set the model columns to this value
func (m reviewMatchMods) FeatureImage(val string) ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		o.FeatureImage = func() string { return val }
	})
}

// Set the Column from the function
func (m reviewMatchMods) FeatureImageFunc(f func() string) ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		o.FeatureImage = f
	})
}

// Clear any values for the column
func (m reviewMatchMods) UnsetFeatureImage() ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		o.FeatureImage = nil
	})
}

// Generates a random value for the column using the given faker
// if faker is nil, a default faker is used
func (m reviewMatchMods) RandomFeatureImage(f *faker.Faker) ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		o.FeatureImage = func() string {
			return random[string](f)
		}
	})
}

func (m reviewMatchMods) ensureFeatureImage(f *faker.Faker) ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		if o.FeatureImage != nil {
			return
		}

		o.FeatureImage = func() string {
			return random[string](f)
		}
	})
}

// Set the model columns to this value
func (m reviewMatchMods) Category(val types.JSON[json.RawMessage]) ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		o.Category = func() types.JSON[json.RawMessage] { return val }
	})
}

// Set the Column from the function
func (m reviewMatchMods) CategoryFunc(f func() types.JSON[json.RawMessage]) ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		o.Category = f
	})
}

// Clear any values for the column
func (m reviewMatchMods) UnsetCategory() ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		o.Category = nil
	})
}

// Generates a random value for the column using the given faker
// if faker is nil, a default faker is used
func (m reviewMatchMods) RandomCategory(f *faker.Faker) ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		o.Category = func() types.JSON[json.RawMessage] {
			return random[types.JSON[json.RawMessage]](f)
		}
	})
}

func (m reviewMatchMods) ensureCategory(f *faker.Faker) ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		if o.Category != nil {
			return
		}

		o.Category = func() types.JSON[json.RawMessage] {
			return random[types.JSON[json.RawMessage]](f)
		}
	})
}

// Set the model columns to this value
func (m reviewMatchMods) Label(val null.Val[types.JSON[json.RawMessage]]) ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		o.Label = func() null.Val[types.JSON[json.RawMessage]] { return val }
	})
}

// Set the Column from the function
func (m reviewMatchMods) LabelFunc(f func() null.Val[types.JSON[json.RawMessage]]) ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		o.Label = f
	})
}

// Clear any values for the column
func (m reviewMatchMods) UnsetLabel() ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		o.Label = nil
	})
}

// Generates a random value for the column using the given faker
// if faker is nil, a default faker is used
func (m reviewMatchMods) RandomLabel(f *faker.Faker) ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		o.Label = func() null.Val[types.JSON[json.RawMessage]] {
			return randomNull[types.JSON[json.RawMessage]](f)
		}
	})
}

func (m reviewMatchMods) ensureLabel(f *faker.Faker) ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		if o.Label != nil {
			return
		}

		o.Label = func() null.Val[types.JSON[json.RawMessage]] {
			return randomNull[types.JSON[json.RawMessage]](f)
		}
	})
}

// Set the model columns to this value
func (m reviewMatchMods) Content(val string) ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		o.Content = func() string { return val }
	})
}

// Set the Column from the function
func (m reviewMatchMods) ContentFunc(f func() string) ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		o.Content = f
	})
}

// Clear any values for the column
func (m reviewMatchMods) UnsetContent() ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		o.Content = nil
	})
}

// Generates a random value for the column using the given faker
// if faker is nil, a default faker is used
func (m reviewMatchMods) RandomContent(f *faker.Faker) ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		o.Content = func() string {
			return random[string](f)
		}
	})
}

func (m reviewMatchMods) ensureContent(f *faker.Faker) ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		if o.Content != nil {
			return
		}

		o.Content = func() string {
			return random[string](f)
		}
	})
}

// Set the model columns to this value
func (m reviewMatchMods) Title(val string) ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		o.Title = func() string { return val }
	})
}

// Set the Column from the function
func (m reviewMatchMods) TitleFunc(f func() string) ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		o.Title = f
	})
}

// Clear any values for the column
func (m reviewMatchMods) UnsetTitle() ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		o.Title = nil
	})
}

// Generates a random value for the column using the given faker
// if faker is nil, a default faker is used
func (m reviewMatchMods) RandomTitle(f *faker.Faker) ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		o.Title = func() string {
			return random[string](f)
		}
	})
}

func (m reviewMatchMods) ensureTitle(f *faker.Faker) ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		if o.Title != nil {
			return
		}

		o.Title = func() string {
			return random[string](f)
		}
	})
}

// Set the model columns to this value
func (m reviewMatchMods) H1(val string) ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		o.H1 = func() string { return val }
	})
}

// Set the Column from the function
func (m reviewMatchMods) H1Func(f func() string) ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		o.H1 = f
	})
}

// Clear any values for the column
func (m reviewMatchMods) UnsetH1() ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		o.H1 = nil
	})
}

// Generates a random value for the column using the given faker
// if faker is nil, a default faker is used
func (m reviewMatchMods) RandomH1(f *faker.Faker) ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		o.H1 = func() string {
			return random[string](f)
		}
	})
}

func (m reviewMatchMods) ensureH1(f *faker.Faker) ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		if o.H1 != nil {
			return
		}

		o.H1 = func() string {
			return random[string](f)
		}
	})
}

// Set the model columns to this value
func (m reviewMatchMods) CreatedAt(val time.Time) ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		o.CreatedAt = func() time.Time { return val }
	})
}

// Set the Column from the function
func (m reviewMatchMods) CreatedAtFunc(f func() time.Time) ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		o.CreatedAt = f
	})
}

// Clear any values for the column
func (m reviewMatchMods) UnsetCreatedAt() ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		o.CreatedAt = nil
	})
}

// Generates a random value for the column using the given faker
// if faker is nil, a default faker is used
func (m reviewMatchMods) RandomCreatedAt(f *faker.Faker) ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		o.CreatedAt = func() time.Time {
			return random[time.Time](f)
		}
	})
}

func (m reviewMatchMods) ensureCreatedAt(f *faker.Faker) ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		if o.CreatedAt != nil {
			return
		}

		o.CreatedAt = func() time.Time {
			return random[time.Time](f)
		}
	})
}

// Set the model columns to this value
func (m reviewMatchMods) UpdatedAt(val time.Time) ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		o.UpdatedAt = func() time.Time { return val }
	})
}

// Set the Column from the function
func (m reviewMatchMods) UpdatedAtFunc(f func() time.Time) ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		o.UpdatedAt = f
	})
}

// Clear any values for the column
func (m reviewMatchMods) UnsetUpdatedAt() ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		o.UpdatedAt = nil
	})
}

// Generates a random value for the column using the given faker
// if faker is nil, a default faker is used
func (m reviewMatchMods) RandomUpdatedAt(f *faker.Faker) ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		o.UpdatedAt = func() time.Time {
			return random[time.Time](f)
		}
	})
}

func (m reviewMatchMods) ensureUpdatedAt(f *faker.Faker) ReviewMatchMod {
	return ReviewMatchModFunc(func(o *ReviewMatchTemplate) {
		if o.UpdatedAt != nil {
			return
		}

		o.UpdatedAt = func() time.Time {
			return random[time.Time](f)
		}
	})
}