-- +goose Up
ALTER TABLE review_matchs RENAME COLUMN label TO labels;

-- +goose Down
ALTER TABLE review_matchs RENAME COLUMN labels TO label;
