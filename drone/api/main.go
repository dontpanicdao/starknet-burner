package main

import (
	"context"
)

var (
	version = "dev"
)

func main() {
	app, err := NewApp(context.Background())
	if err != nil {
		panic(err)
	}
	app.Start()
}
