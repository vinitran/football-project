//package main
//
//import "fmt"

//func main() {
//	gorse := client.NewGorseClient("http://127.0.0.1:8088", "123123")
//
//	recommend, err := gorse.GetRecommend(context.Background(), "cat", "", 10)
//	if err != nil {
//		log.Println(err)
//		return
//	}
//
//	log.Println("asdasd", recommend)
//}

package main

import (
	"fmt"
	"github.com/securisec/go-keywords"
)

func main() {
	data := "5 điểm nhấn của trận MU - Tottenham 2-2 : So tài mãn nhãn"
	k, _ := keywords.Extract(data)
	fmt.Println(k)
}
