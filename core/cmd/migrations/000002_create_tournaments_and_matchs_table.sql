-- +goose Up
CREATE TABLE "tournaments"(
    "id" uuid PRIMARY KEY,
    "name" text NOT NULL,
    "slug" text NOT NULL,
    "logo" text NOT NULL,
    "is_featured" boolean NOT NULL DEFAULT false,
    "priority" integer NOT NULL DEFAULT -1,
    "id_sync" text NOT NULL,
    "created_at" timestamp with time zone NOT NULL,
    "updated_at" timestamp with time zone NOT NULL
);

CREATE UNIQUE INDEX ON tournaments(id_sync);
CREATE UNIQUE INDEX ON tournaments(is_featured);
CREATE UNIQUE INDEX ON tournaments(priority);

CREATE TYPE match_status AS ENUM(
  'pending',
  'finished',
  'delay',
  'canceled',
  'live'
);

CREATE TABLE "matchs"(
    "id" uuid PRIMARY KEY,
    "id_sync" text NOT NULL,
    "name" text NOT NULL,
    "slug" text NOT NULL,
    "date" text NOT NULL,
    "timestamp" integer NOT NULL,
    "home_red_cards" integer NOT NULL DEFAULT 0,
    "away_red_cards" integer NOT NULL DEFAULT 0,
    "home_id" uuid NOT NULL ,
    "away_id" uuid NOT NULL ,
    "tournament_id" uuid NOT NULL ,
    "scores" jsonb NOT NULL ,
    "win_code" integer,
    "match_status" match_status NOT NULL,
    "sport_type" text,
    "has_lineup" boolean,
    "has_tracker" boolean,
    "is_featured" boolean,
    "thumbnail_url" text,
    "commentators" text,
    "is_live" boolean,
    "live_tracker" text,
    "created_at" timestamp with time zone NOT NULL,
    "updated_at" timestamp with time zone NOT NULL
);

ALTER TABLE "matchs"
    ADD FOREIGN KEY ("tournament_id") REFERENCES "tournaments"("id");
ALTER TABLE "matchs"
    ADD FOREIGN KEY ("away_id") REFERENCES "teams"("id");
ALTER TABLE "matchs"
    ADD FOREIGN KEY ("home_id") REFERENCES "teams"("id");

-- +goose Down
DROP TABLE IF EXISTS tournaments;
DROP TABLE IF EXISTS matchs;
