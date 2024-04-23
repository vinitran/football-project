package main

import (
	"context"
	"github.com/zhenghaoz/gorse/client"
	"log"
)

func main() {
	// Create a client
	gorse := client.NewGorseClient("http://127.0.0.1:8088", "123123")

	recommend, err := gorse.GetRecommend(context.Background(), "cat", "", 10)
	if err != nil {
		log.Println(err)
		return
	}

	log.Println("asdasd", recommend)
}
