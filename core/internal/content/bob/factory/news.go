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

type NewsMod interface {
	Apply(*NewsTemplate)
}

type NewsModFunc func(*NewsTemplate)

func (f NewsModFunc) Apply(n *NewsTemplate) {
	f(n)
}

type NewsModSlice []NewsMod

func (mods NewsModSlice) Apply(n *NewsTemplate) {
	for _, f := range mods {
		f.Apply(n)
	}
}

// NewsTemplate is an object representing the database table.
// all columns are optional and should be set by mods
type NewsTemplate struct {
	ID           func() string
	Name         func() string
	Slug         func() string
	Link         func() null.Val[string]
	Description  func() string
	FeatureImage func() string
	Title        func() string
	Content      func() null.Val[string]
	Author       func() null.Val[string]
	Category     func() types.JSON[json.RawMessage]
	VideoURL     func() null.Val[string]
	CreatedAt    func() time.Time
	UpdatedAt    func() time.Time

	f *factory
}

// Apply mods to the NewsTemplate
func (o *NewsTemplate) Apply(mods ...NewsMod) {
	for _, mod := range mods {
		mod.Apply(o)
	}
}

// toModel returns an *models.News
// this does nothing with the relationship templates
func (o NewsTemplate) toModel() *models.News {
	m := &models.News{}

	if o.ID != nil {
		m.ID = o.ID()
	}
	if o.Name != nil {
		m.Name = o.Name()
	}
	if o.Slug != nil {
		m.Slug = o.Slug()
	}
	if o.Link != nil {
		m.Link = o.Link()
	}
	if o.Description != nil {
		m.Description = o.Description()
	}
	if o.FeatureImage != nil {
		m.FeatureImage = o.FeatureImage()
	}
	if o.Title != nil {
		m.Title = o.Title()
	}
	if o.Content != nil {
		m.Content = o.Content()
	}
	if o.Author != nil {
		m.Author = o.Author()
	}
	if o.Category != nil {
		m.Category = o.Category()
	}
	if o.VideoURL != nil {
		m.VideoURL = o.VideoURL()
	}
	if o.CreatedAt != nil {
		m.CreatedAt = o.CreatedAt()
	}
	if o.UpdatedAt != nil {
		m.UpdatedAt = o.UpdatedAt()
	}

	return m
}

// toModels returns an models.NewsSlice
// this does nothing with the relationship templates
func (o NewsTemplate) toModels(number int) models.NewsSlice {
	m := make(models.NewsSlice, number)

	for i := range m {
		m[i] = o.toModel()
	}

	return m
}

// setModelRels creates and sets the relationships on *models.News
// according to the relationships in the template. Nothing is inserted into the db
func (t NewsTemplate) setModelRels(o *models.News) {}

// BuildSetter returns an *models.NewsSetter
// this does nothing with the relationship templates
func (o NewsTemplate) BuildSetter() *models.NewsSetter {
	m := &models.NewsSetter{}

	if o.ID != nil {
		m.ID = omit.From(o.ID())
	}
	if o.Name != nil {
		m.Name = omit.From(o.Name())
	}
	if o.Slug != nil {
		m.Slug = omit.From(o.Slug())
	}
	if o.Link != nil {
		m.Link = omitnull.FromNull(o.Link())
	}
	if o.Description != nil {
		m.Description = omit.From(o.Description())
	}
	if o.FeatureImage != nil {
		m.FeatureImage = omit.From(o.FeatureImage())
	}
	if o.Title != nil {
		m.Title = omit.From(o.Title())
	}
	if o.Content != nil {
		m.Content = omitnull.FromNull(o.Content())
	}
	if o.Author != nil {
		m.Author = omitnull.FromNull(o.Author())
	}
	if o.Category != nil {
		m.Category = omit.From(o.Category())
	}
	if o.VideoURL != nil {
		m.VideoURL = omitnull.FromNull(o.VideoURL())
	}
	if o.CreatedAt != nil {
		m.CreatedAt = omit.From(o.CreatedAt())
	}
	if o.UpdatedAt != nil {
		m.UpdatedAt = omit.From(o.UpdatedAt())
	}

	return m
}

// BuildManySetter returns an []*models.NewsSetter
// this does nothing with the relationship templates
func (o NewsTemplate) BuildManySetter(number int) []*models.NewsSetter {
	m := make([]*models.NewsSetter, number)

	for i := range m {
		m[i] = o.BuildSetter()
	}

	return m
}

// Build returns an *models.News
// Related objects are also created and placed in the .R field
// NOTE: Objects are not inserted into the database. Use NewsTemplate.Create
func (o NewsTemplate) Build() *models.News {
	m := o.toModel()
	o.setModelRels(m)

	return m
}

// BuildMany returns an models.NewsSlice
// Related objects are also created and placed in the .R field
// NOTE: Objects are not inserted into the database. Use NewsTemplate.CreateMany
func (o NewsTemplate) BuildMany(number int) models.NewsSlice {
	m := make(models.NewsSlice, number)

	for i := range m {
		m[i] = o.Build()
	}

	return m
}

func ensureCreatableNews(m *models.NewsSetter) {
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
	if m.FeatureImage.IsUnset() {
		m.FeatureImage = omit.From(random[string](nil))
	}
	if m.Title.IsUnset() {
		m.Title = omit.From(random[string](nil))
	}
	if m.Category.IsUnset() {
		m.Category = omit.From(random[types.JSON[json.RawMessage]](nil))
	}
	if m.CreatedAt.IsUnset() {
		m.CreatedAt = omit.From(random[time.Time](nil))
	}
	if m.UpdatedAt.IsUnset() {
		m.UpdatedAt = omit.From(random[time.Time](nil))
	}
}

// insertOptRels creates and inserts any optional the relationships on *models.News
// according to the relationships in the template.
// any required relationship should have already exist on the model
func (o *NewsTemplate) insertOptRels(ctx context.Context, exec bob.Executor, m *models.News) (context.Context, error) {
	var err error

	return ctx, err
}

// Create builds a news and inserts it into the database
// Relations objects are also inserted and placed in the .R field
func (o *NewsTemplate) Create(ctx context.Context, exec bob.Executor) (*models.News, error) {
	_, m, err := o.create(ctx, exec)
	return m, err
}

// create builds a news and inserts it into the database
// Relations objects are also inserted and placed in the .R field
// this returns a context that includes the newly inserted model
func (o *NewsTemplate) create(ctx context.Context, exec bob.Executor) (context.Context, *models.News, error) {
	var err error
	opt := o.BuildSetter()
	ensureCreatableNews(opt)

	m, err := models.NewsTable.Insert(ctx, exec, opt)
	if err != nil {
		return ctx, nil, err
	}
	ctx = newsCtx.WithValue(ctx, m)

	ctx, err = o.insertOptRels(ctx, exec, m)
	return ctx, m, err
}

// CreateMany builds multiple news and inserts them into the database
// Relations objects are also inserted and placed in the .R field
func (o NewsTemplate) CreateMany(ctx context.Context, exec bob.Executor, number int) (models.NewsSlice, error) {
	_, m, err := o.createMany(ctx, exec, number)
	return m, err
}

// createMany builds multiple news and inserts them into the database
// Relations objects are also inserted and placed in the .R field
// this returns a context that includes the newly inserted models
func (o NewsTemplate) createMany(ctx context.Context, exec bob.Executor, number int) (context.Context, models.NewsSlice, error) {
	var err error
	m := make(models.NewsSlice, number)

	for i := range m {
		ctx, m[i], err = o.create(ctx, exec)
		if err != nil {
			return ctx, nil, err
		}
	}

	return ctx, m, nil
}

// News has methods that act as mods for the NewsTemplate
var NewsMods newsMods

type newsMods struct{}

func (m newsMods) RandomizeAllColumns(f *faker.Faker) NewsMod {
	return NewsModSlice{
		NewsMods.RandomID(f),
		NewsMods.RandomName(f),
		NewsMods.RandomSlug(f),
		NewsMods.RandomLink(f),
		NewsMods.RandomDescription(f),
		NewsMods.RandomFeatureImage(f),
		NewsMods.RandomTitle(f),
		NewsMods.RandomContent(f),
		NewsMods.RandomAuthor(f),
		NewsMods.RandomCategory(f),
		NewsMods.RandomVideoURL(f),
		NewsMods.RandomCreatedAt(f),
		NewsMods.RandomUpdatedAt(f),
	}
}

// Set the model columns to this value
func (m newsMods) ID(val string) NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		o.ID = func() string { return val }
	})
}

// Set the Column from the function
func (m newsMods) IDFunc(f func() string) NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		o.ID = f
	})
}

// Clear any values for the column
func (m newsMods) UnsetID() NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		o.ID = nil
	})
}

// Generates a random value for the column using the given faker
// if faker is nil, a default faker is used
func (m newsMods) RandomID(f *faker.Faker) NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		o.ID = func() string {
			return random[string](f)
		}
	})
}

func (m newsMods) ensureID(f *faker.Faker) NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		if o.ID != nil {
			return
		}

		o.ID = func() string {
			return random[string](f)
		}
	})
}

// Set the model columns to this value
func (m newsMods) Name(val string) NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		o.Name = func() string { return val }
	})
}

// Set the Column from the function
func (m newsMods) NameFunc(f func() string) NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		o.Name = f
	})
}

// Clear any values for the column
func (m newsMods) UnsetName() NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		o.Name = nil
	})
}

// Generates a random value for the column using the given faker
// if faker is nil, a default faker is used
func (m newsMods) RandomName(f *faker.Faker) NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		o.Name = func() string {
			return random[string](f)
		}
	})
}

func (m newsMods) ensureName(f *faker.Faker) NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		if o.Name != nil {
			return
		}

		o.Name = func() string {
			return random[string](f)
		}
	})
}

// Set the model columns to this value
func (m newsMods) Slug(val string) NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		o.Slug = func() string { return val }
	})
}

// Set the Column from the function
func (m newsMods) SlugFunc(f func() string) NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		o.Slug = f
	})
}

// Clear any values for the column
func (m newsMods) UnsetSlug() NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		o.Slug = nil
	})
}

// Generates a random value for the column using the given faker
// if faker is nil, a default faker is used
func (m newsMods) RandomSlug(f *faker.Faker) NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		o.Slug = func() string {
			return random[string](f)
		}
	})
}

func (m newsMods) ensureSlug(f *faker.Faker) NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		if o.Slug != nil {
			return
		}

		o.Slug = func() string {
			return random[string](f)
		}
	})
}

// Set the model columns to this value
func (m newsMods) Link(val null.Val[string]) NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		o.Link = func() null.Val[string] { return val }
	})
}

// Set the Column from the function
func (m newsMods) LinkFunc(f func() null.Val[string]) NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		o.Link = f
	})
}

// Clear any values for the column
func (m newsMods) UnsetLink() NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		o.Link = nil
	})
}

// Generates a random value for the column using the given faker
// if faker is nil, a default faker is used
func (m newsMods) RandomLink(f *faker.Faker) NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		o.Link = func() null.Val[string] {
			return randomNull[string](f)
		}
	})
}

func (m newsMods) ensureLink(f *faker.Faker) NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		if o.Link != nil {
			return
		}

		o.Link = func() null.Val[string] {
			return randomNull[string](f)
		}
	})
}

// Set the model columns to this value
func (m newsMods) Description(val string) NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		o.Description = func() string { return val }
	})
}

// Set the Column from the function
func (m newsMods) DescriptionFunc(f func() string) NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		o.Description = f
	})
}

// Clear any values for the column
func (m newsMods) UnsetDescription() NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		o.Description = nil
	})
}

// Generates a random value for the column using the given faker
// if faker is nil, a default faker is used
func (m newsMods) RandomDescription(f *faker.Faker) NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		o.Description = func() string {
			return random[string](f)
		}
	})
}

func (m newsMods) ensureDescription(f *faker.Faker) NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		if o.Description != nil {
			return
		}

		o.Description = func() string {
			return random[string](f)
		}
	})
}

// Set the model columns to this value
func (m newsMods) FeatureImage(val string) NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		o.FeatureImage = func() string { return val }
	})
}

// Set the Column from the function
func (m newsMods) FeatureImageFunc(f func() string) NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		o.FeatureImage = f
	})
}

// Clear any values for the column
func (m newsMods) UnsetFeatureImage() NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		o.FeatureImage = nil
	})
}

// Generates a random value for the column using the given faker
// if faker is nil, a default faker is used
func (m newsMods) RandomFeatureImage(f *faker.Faker) NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		o.FeatureImage = func() string {
			return random[string](f)
		}
	})
}

func (m newsMods) ensureFeatureImage(f *faker.Faker) NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		if o.FeatureImage != nil {
			return
		}

		o.FeatureImage = func() string {
			return random[string](f)
		}
	})
}

// Set the model columns to this value
func (m newsMods) Title(val string) NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		o.Title = func() string { return val }
	})
}

// Set the Column from the function
func (m newsMods) TitleFunc(f func() string) NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		o.Title = f
	})
}

// Clear any values for the column
func (m newsMods) UnsetTitle() NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		o.Title = nil
	})
}

// Generates a random value for the column using the given faker
// if faker is nil, a default faker is used
func (m newsMods) RandomTitle(f *faker.Faker) NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		o.Title = func() string {
			return random[string](f)
		}
	})
}

func (m newsMods) ensureTitle(f *faker.Faker) NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		if o.Title != nil {
			return
		}

		o.Title = func() string {
			return random[string](f)
		}
	})
}

// Set the model columns to this value
func (m newsMods) Content(val null.Val[string]) NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		o.Content = func() null.Val[string] { return val }
	})
}

// Set the Column from the function
func (m newsMods) ContentFunc(f func() null.Val[string]) NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		o.Content = f
	})
}

// Clear any values for the column
func (m newsMods) UnsetContent() NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		o.Content = nil
	})
}

// Generates a random value for the column using the given faker
// if faker is nil, a default faker is used
func (m newsMods) RandomContent(f *faker.Faker) NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		o.Content = func() null.Val[string] {
			return randomNull[string](f)
		}
	})
}

func (m newsMods) ensureContent(f *faker.Faker) NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		if o.Content != nil {
			return
		}

		o.Content = func() null.Val[string] {
			return randomNull[string](f)
		}
	})
}

// Set the model columns to this value
func (m newsMods) Author(val null.Val[string]) NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		o.Author = func() null.Val[string] { return val }
	})
}

// Set the Column from the function
func (m newsMods) AuthorFunc(f func() null.Val[string]) NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		o.Author = f
	})
}

// Clear any values for the column
func (m newsMods) UnsetAuthor() NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		o.Author = nil
	})
}

// Generates a random value for the column using the given faker
// if faker is nil, a default faker is used
func (m newsMods) RandomAuthor(f *faker.Faker) NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		o.Author = func() null.Val[string] {
			return randomNull[string](f)
		}
	})
}

func (m newsMods) ensureAuthor(f *faker.Faker) NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		if o.Author != nil {
			return
		}

		o.Author = func() null.Val[string] {
			return randomNull[string](f)
		}
	})
}

// Set the model columns to this value
func (m newsMods) Category(val types.JSON[json.RawMessage]) NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		o.Category = func() types.JSON[json.RawMessage] { return val }
	})
}

// Set the Column from the function
func (m newsMods) CategoryFunc(f func() types.JSON[json.RawMessage]) NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		o.Category = f
	})
}

// Clear any values for the column
func (m newsMods) UnsetCategory() NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		o.Category = nil
	})
}

// Generates a random value for the column using the given faker
// if faker is nil, a default faker is used
func (m newsMods) RandomCategory(f *faker.Faker) NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		o.Category = func() types.JSON[json.RawMessage] {
			return random[types.JSON[json.RawMessage]](f)
		}
	})
}

func (m newsMods) ensureCategory(f *faker.Faker) NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		if o.Category != nil {
			return
		}

		o.Category = func() types.JSON[json.RawMessage] {
			return random[types.JSON[json.RawMessage]](f)
		}
	})
}

// Set the model columns to this value
func (m newsMods) VideoURL(val null.Val[string]) NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		o.VideoURL = func() null.Val[string] { return val }
	})
}

// Set the Column from the function
func (m newsMods) VideoURLFunc(f func() null.Val[string]) NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		o.VideoURL = f
	})
}

// Clear any values for the column
func (m newsMods) UnsetVideoURL() NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		o.VideoURL = nil
	})
}

// Generates a random value for the column using the given faker
// if faker is nil, a default faker is used
func (m newsMods) RandomVideoURL(f *faker.Faker) NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		o.VideoURL = func() null.Val[string] {
			return randomNull[string](f)
		}
	})
}

func (m newsMods) ensureVideoURL(f *faker.Faker) NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		if o.VideoURL != nil {
			return
		}

		o.VideoURL = func() null.Val[string] {
			return randomNull[string](f)
		}
	})
}

// Set the model columns to this value
func (m newsMods) CreatedAt(val time.Time) NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		o.CreatedAt = func() time.Time { return val }
	})
}

// Set the Column from the function
func (m newsMods) CreatedAtFunc(f func() time.Time) NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		o.CreatedAt = f
	})
}

// Clear any values for the column
func (m newsMods) UnsetCreatedAt() NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		o.CreatedAt = nil
	})
}

// Generates a random value for the column using the given faker
// if faker is nil, a default faker is used
func (m newsMods) RandomCreatedAt(f *faker.Faker) NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		o.CreatedAt = func() time.Time {
			return random[time.Time](f)
		}
	})
}

func (m newsMods) ensureCreatedAt(f *faker.Faker) NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		if o.CreatedAt != nil {
			return
		}

		o.CreatedAt = func() time.Time {
			return random[time.Time](f)
		}
	})
}

// Set the model columns to this value
func (m newsMods) UpdatedAt(val time.Time) NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		o.UpdatedAt = func() time.Time { return val }
	})
}

// Set the Column from the function
func (m newsMods) UpdatedAtFunc(f func() time.Time) NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		o.UpdatedAt = f
	})
}

// Clear any values for the column
func (m newsMods) UnsetUpdatedAt() NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		o.UpdatedAt = nil
	})
}

// Generates a random value for the column using the given faker
// if faker is nil, a default faker is used
func (m newsMods) RandomUpdatedAt(f *faker.Faker) NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		o.UpdatedAt = func() time.Time {
			return random[time.Time](f)
		}
	})
}

func (m newsMods) ensureUpdatedAt(f *faker.Faker) NewsMod {
	return NewsModFunc(func(o *NewsTemplate) {
		if o.UpdatedAt != nil {
			return
		}

		o.UpdatedAt = func() time.Time {
			return random[time.Time](f)
		}
	})
}
