-- +goose Up
ALTER TABLE news ADD COLUMN labels text[];
ALTER TABLE news RENAME TO news_infor;
-- +goose Down
ALTER TABLE news_infor RENAME TO news;
ALTER TABLE news DROP COLUMN labels;
