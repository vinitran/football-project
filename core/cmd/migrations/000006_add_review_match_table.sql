-- +goose Up
CREATE TABLE "review_matchs"(
    "id" text PRIMARY KEY,
    "name" text NOT NULL,
    "slug" text NOT NULL,
    "description" text NOT NULL,
    "video_url" text NOT NULL,
    "feature_image" text NOT NULL,
    "category" jsonb NOT NULL,
    "label" jsonb,
    "content" text NOT NULL,
    "title" text NOT NULL,
    "h1" text NOT NULL,
    "created_at" timestamp with time zone NOT NULL,
    "updated_at" timestamp with time zone NOT NULL
);

-- +goose Down
DROP TABLE IF EXISTS review_matchs;
