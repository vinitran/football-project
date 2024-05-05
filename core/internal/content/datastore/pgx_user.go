package datastore

import (
	"context"
	"core/internal/content"
	b "core/internal/content/bob"
	"github.com/aarondl/opt/omit"
	"time"

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

func (ds *DatastoreUserPgx) FindByEmail(ctx context.Context, email string) (*content.User, error) {
	item, err := b.UserInfors(ctx, ds.bobExecutor,
		b.SelectWhere.UserInfors.Email.EQ(email),
	).One()
	if err != nil {
		return nil, err
	}

	return UserBobToRaw(item), nil
}

func (ds *DatastoreUserPgx) Upsert(ctx context.Context, params *b.UserInforSetter) (*content.User, error) {
	params.CreatedAt = omit.From(time.Now())
	params.UpdatedAt = omit.From(time.Now())

	item, err := b.UserInforsTable.Upsert(ctx, ds.bobExecutor, true, nil, nil, params)
	if err != nil {
		return nil, err
	}

	return UserBobToRaw(item), nil
}

func NewDatastoreUser(pool PGXPool) (*DatastoreUserPgx, error) {
	return &DatastoreUserPgx{pool, &BobExecutorPgx{pool}}, nil
}
