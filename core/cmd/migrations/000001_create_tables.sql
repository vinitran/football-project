-- +goose Up
CREATE TABLE "tokens"(
    "id" uuid PRIMARY KEY,
    "address" text NOT NULL,
    "chain_id" text NOT NULL,
    "name" text NOT NULL,
    "created_at" timestamp with time zone NOT NULL,
    "updated_at" timestamp with time zone NOT NULL
);

CREATE UNIQUE INDEX ON tokens(address, chain_id);

CREATE TABLE "transactions"(
    "id" uuid PRIMARY KEY,
    "user" text NOT NULL,
    "token" text NOT NULL,
    "raw_amount" text NOT NULL,
    "chain_id" text NOT NULL,
    "is_complete" boolean NOT NULL DEFAULT FALSE,
    "created_at" timestamp with time zone NOT NULL,
    "updated_at" timestamp with time zone NOT NULL
);

CREATE EXTENSION "pgcrypto";

-- +goose Down
DROP TABLE IF EXISTS tokens;
DROP TABLE IF EXISTS transactions;
DROP EXTENSION IF EXISTS pgcrypto;