-- +goose Up
ALTER TABLE matchs ADD COLUMN labels jsonb;
-- +goose Down
ALTER TABLE news DROP COLUMN labels;
