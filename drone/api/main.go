package main

import (
	"github.com/aws/aws-lambda-go/lambda"

	ginadapter "github.com/awslabs/aws-lambda-go-api-proxy/gin"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	adapter := ginadapter.NewV2(r)
	lambda.Start(adapter.Proxy)
}
