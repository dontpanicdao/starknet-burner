package main

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"regexp"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	ginadapter "github.com/awslabs/aws-lambda-go-api-proxy/gin"
	"github.com/gin-gonic/gin"
)

type App struct {
	Router *gin.Engine
	Store  Storer
}

func NewApp(ctx context.Context) (*App, error) {
	store, err := NewStore(ctx)
	if err != nil {
		return nil, err
	}
	router := NewRouter(store, os.Getenv("route_prefix"))
	return &App{
		Router: router,
		Store:  store,
	}, nil
}

func NewRouter(store Storer, prefix string) *gin.Engine {
	r := gin.Default()
	if prefix == "" {
		routes(r, store)
	} else {
		routes(r.Group(prefix), store)
	}
	return r
}

func routes(r gin.IRouter, store Storer) {
	r.OPTIONS("/*path", func(c *gin.Context) {
		c.JSON(http.StatusNoContent, nil)
	})

	r.GET("/version", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"version": version})
	})

	r.POST("/requests", func(c *gin.Context) {
		var req Request
		if err := c.ShouldBind(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
			return
		}
		err := store.createRequest(c.Request.Context(), &req)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
			return
		}
		c.JSON(http.StatusCreated, req)
	})

	r.GET("/requests/:id", func(c *gin.Context) {
		id := c.Params.ByName("id")
		re := regexp.MustCompile("[0-9]{6}")
		if !re.MatchString(id) {
			c.JSON(http.StatusBadRequest, gin.H{"message": "unsupported format"})
			return
		}

		req, err := store.findRequest(c.Request.Context(), id)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
			return
		}

		if req == nil {
			c.JSON(http.StatusNotFound, gin.H{"message": "not found"})
			return
		}

		c.JSON(http.StatusOK, req)
	})

	r.GET("/authorizations/0x:pk", func(c *gin.Context) {
		pk := "0x" + c.Params.ByName("pk")
		auth, err := store.findAuthorization(c.Request.Context(), pk)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
			return
		}
		if auth == nil {
			c.JSON(http.StatusNotFound, gin.H{"message": "not found"})
			return
		}

		c.JSON(http.StatusOK, auth)
	})

	r.POST("/authorizations", func(c *gin.Context) {
		var auth Authorization
		if err := c.ShouldBind(&auth); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
			return
		}

		if err := store.createAuthorization(c.Request.Context(), &auth); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
			return
		}

		c.JSON(http.StatusCreated, auth)
	})
}

type LambdaHandler struct {
	Adapter *ginadapter.GinLambdaV2
}

func (lh *LambdaHandler) lambdaHandler(ctx context.Context, req events.APIGatewayV2HTTPRequest) (events.APIGatewayV2HTTPResponse, error) {
	output, err := json.Marshal(req)
	if err != nil {
		return events.APIGatewayV2HTTPResponse{
			StatusCode: http.StatusBadRequest,
			Body:       fmt.Sprintf(`{"message": "%v"}`, err),
		}, nil
	}
	fmt.Printf("%s\n", string(output))
	return lh.Adapter.ProxyWithContext(ctx, req)
}

func (app *App) Start() {
	lh := LambdaHandler{
		Adapter: ginadapter.NewV2(app.Router),
	}
	lambda.Start(
		lh.lambdaHandler,
	)
}
