-- +goose Up
CREATE TABLE "news"(
    "id" text PRIMARY KEY,
    "name" text NOT NULL,
    "slug" text NOT NULL,
    "link" text,
    "description" text NOT NULL,
    "feature_image" text NOT NULL,
    "title" text NOT NULL,
    "content" text,
    "author" text,
    "category" jsonb NOT NULL,
    "video_url" text,
    "created_at" timestamp with time zone NOT NULL,
    "updated_at" timestamp with time zone NOT NULL
);

-- +goose Down
DROP TABLE IF EXISTS news;
