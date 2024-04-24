package main

import (
	"context"
	"github.com/zhenghaoz/gorse/client"
	"log"
)

func main() {
	gorse := client.NewGorseClient("http://127.0.0.1:8088", "123123")

	gorse.InsertFeedback(context.Background(), []client.Feedback{
		{FeedbackType: "star", UserId: "alice", ItemId: "mPtKolw", Timestamp: "2022-02-25"},
		{FeedbackType: "star", UserId: "alice", ItemId: "fbWjdDW", Timestamp: "2022-02-26"},
		{FeedbackType: "star", UserId: "alice", ItemId: "zBaz35r", Timestamp: "2022-02-27"},
		{FeedbackType: "star", UserId: "alice", ItemId: "hWy5qR5", Timestamp: "2022-02-27"},
		{FeedbackType: "star", UserId: "alice", ItemId: "1MiefcM", Timestamp: "2022-02-27"},
		{FeedbackType: "star", UserId: "alice", ItemId: "h3Y0iVg", Timestamp: "2022-02-27"},
		{FeedbackType: "star", UserId: "alice", ItemId: "t2g4faD", Timestamp: "2022-02-27"},
		{FeedbackType: "star", UserId: "alice", ItemId: "dq1oNyH", Timestamp: "2022-02-27"},
		{FeedbackType: "star", UserId: "alice", ItemId: "BuKXIU9", Timestamp: "2022-02-27"},
		{FeedbackType: "star", UserId: "alice", ItemId: "bnrrZgk", Timestamp: "2022-02-27"},
		{FeedbackType: "star", UserId: "alice", ItemId: "kHqblUu", Timestamp: "2022-02-27"},
		{FeedbackType: "star", UserId: "alice", ItemId: "jL2x3VK", Timestamp: "2022-02-27"},
		{FeedbackType: "star", UserId: "alice", ItemId: "WjesyeO", Timestamp: "2022-02-27"},
	})

	recommend, err := gorse.GetRecommend(context.Background(), "alice", "", 10)
	if err != nil {
		log.Println(err)
		return
	}

	log.Println("asdasd", recommend)
}

//INSERT INTO items (item_id, labels, time_stamp)
//SELECT id, labels, created_at
//FROM news_infor
//WHERE id NOT IN (SELECT item_id FROM items)
//AND jsonb_typeof(labels) <> 'null';
