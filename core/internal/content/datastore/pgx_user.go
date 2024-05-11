package datastore

import (
	"context"
	"time"

	"core/internal/content"
	b "core/internal/content/bob"
	"github.com/aarondl/opt/omit"

	"github.com/google/uuid"
)

type DatastoreUserPgx struct {
	pool        PGXPool
	bobExecutor BobExecutor
}

func (ds *DatastoreUserPgx) FindByID(ctx context.Context, id uuid.UUID) (*content.User, error) {
	item, err := b.FindUserInfor(ctx, ds.bobExecutor, id)
	if err != nil {
		return nil, err
	}

	return UserBobToRaw(item), nil
}

func (ds *DatastoreUserPgx) FindByUsername(ctx context.Context, username string) (*content.User, error) {
	item, err := b.UserInfors(ctx, ds.bobExecutor,
		b.SelectWhere.UserInfors.Username.EQ(username),
	).One()
	if err != nil {
		return nil, err
	}

	return UserBobToRaw(item), nil
}

func (ds *DatastoreUserPgx) PasswordByUsername(ctx context.Context, username string) (string, error) {
	item, err := b.UserInfors(ctx, ds.bobExecutor,
		b.SelectWhere.UserInfors.Username.EQ(username),
	).One()
	if err != nil {
		return "", err
	}

	return item.Password, nil
}

func (ds *DatastoreUserPgx) FindByEmail(ctx context.Context, email string) (*content.User, error) {
	item, err := b.UserInfors(ctx, ds.bobExecutor,
		b.SelectWhere.UserInfors.Email.EQ(email),
	).One()
	if err != nil {
		return nil, err
	}

	return UserBobToRaw(item), nil
}

func (ds *DatastoreUserPgx) ExistByUsername(ctx context.Context, username string) (bool, error) {
	exists, err := b.UserInforsTable.Query(ctx, ds.bobExecutor,
		b.SelectWhere.UserInfors.Username.EQ(username),
	).Exists()
	if err != nil {
		return false, err
	}

	return exists, nil
}

func (ds *DatastoreUserPgx) ExistByEmail(ctx context.Context, email string) (bool, error) {
	exists, err := b.UserInforsTable.Query(ctx, ds.bobExecutor,
		b.SelectWhere.UserInfors.Email.EQ(email),
	).Exists()
	if err != nil {
		return false, err
	}

	return exists, nil
}

func (ds *DatastoreUserPgx) Create(ctx context.Context, params *b.UserInforSetter) (*content.User, error) {
	params.CreatedAt = omit.From(time.Now())
	params.UpdatedAt = omit.From(time.Now())

	uid, err := uuid.NewUUID()
	if err != nil {
		return nil, err
	}
	params.ID = omit.From(uid)

	item, err := b.UserInforsTable.Insert(ctx, ds.bobExecutor, params)
	if err != nil {
		return nil, err
	}

	return UserBobToRaw(item), nil
}

func NewDatastoreUser(pool PGXPool) (*DatastoreUserPgx, error) {
	return &DatastoreUserPgx{pool, &BobExecutorPgx{pool}}, nil
}
