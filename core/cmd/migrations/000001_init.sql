-- +goose Up
CREATE TABLE "teams"(
    "id" text PRIMARY KEY,
    "name" text NOT NULL,
    "short_name" text,
    "gender" text,
    "name_code" text,
    "logo" text NOT NULL,
    "slug" text,
    "created_at" timestamp with time zone NOT NULL,
    "updated_at" timestamp with time zone NOT NULL
);

-- +goose Down
DROP TABLE IF EXISTS teams;
