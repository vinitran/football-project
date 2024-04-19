-- +goose Up
CREATE TABLE "teams"(
    "id" uuid PRIMARY KEY,
    "name" text NOT NULL,
    "short_name" text,
    "gender" text NOT NULL,
    "name_code" text NOT NULL,
    "logo" text NOT NULL,
    "slug" text NOT NULL,
    "id_sync" text NOT NULL,
    "created_at" timestamp with time zone NOT NULL,
    "updated_at" timestamp with time zone NOT NULL
);

CREATE UNIQUE INDEX ON teams(id_sync);

-- +goose Down
DROP TABLE IF EXISTS teams;
