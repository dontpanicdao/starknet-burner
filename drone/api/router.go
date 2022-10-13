package main

import (
	"context"
	"net/http"
	"os"
	"regexp"

	"github.com/gin-gonic/gin"
)

type App struct {
	Router *gin.Engine
	Store  *store
}

func NewApp() (*App, error) {
	store, err := NewStore(context.TODO())
	if err != nil {
		return nil, err
	}
	router := NewRouter(store, os.Getenv("route_prefix"))
	return &App{
		Router: router,
		Store:  store,
	}, nil
}

func NewRouter(store IStore, prefix string) *gin.Engine {
	r := gin.Default()
	if prefix != "" {
		routes(r.Group(prefix), store)
	} else {
		routes(r, store)
	}
	return r
}

func routes(r gin.IRouter, store IStore) {
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
		err := store.createRequest(&req)
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
			c.JSON(http.StatusBadRequest, gin.H{"message": "unsupported pin format"})
			return
		}

		req, err := store.findRequest(id)
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
		st, err := store.findAuthorization(pk)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
			return
		}

		if st == nil {
			c.JSON(http.StatusNotFound, gin.H{"message": "not found"})
			return
		}

		c.JSON(http.StatusOK, st)
	})

	r.POST("/authorizations", func(c *gin.Context) {
		var auth Authorization
		err := c.ShouldBind(&auth)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
			return
		}
		err = store.createAuthorization(&auth)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
			return
		}
		c.JSON(http.StatusOK, auth)
	})
}
