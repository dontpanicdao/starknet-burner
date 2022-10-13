package main

import (
	"context"

	"github.com/aws/aws-lambda-go/lambda"
)

var (
	version = "dev"
)

func main() {
	app, err := NewApp(context.Background())
	if err != nil {
		panic(err)
	}
	lambda.Start(app.Proxy())
}
