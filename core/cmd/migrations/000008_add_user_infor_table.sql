-- +goose Up
CREATE TABLE "user_infor"(
    "id" uuid PRIMARY KEY,
    "username" text NOT NULL,
    "name" text NOT NULL,
    "email" text,
    "password" text NOT NULL,
    "created_at" timestamp with time zone NOT NULL,
    "updated_at" timestamp with time zone NOT NULL
);

CREATE INDEX idx_username_user
    ON user_infor(username);

CREATE INDEX idx_email_user
    ON user_infor(email);

-- +goose Down
DROP TABLE IF EXISTS user_infor;
