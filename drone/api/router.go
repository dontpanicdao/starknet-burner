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
		err := store.uploadRequest(&req)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
			return
		}
		c.JSON(http.StatusCreated, req)
	})

	r.GET("/requests/:pin", func(c *gin.Context) {
		pin := c.Params.ByName("pin")
		re := regexp.MustCompile("[0-9]{6}")
		if !re.MatchString(pin) {
			c.JSON(http.StatusBadRequest, gin.H{"message": "unsupported pin format"})
			return
		}

		req, err := store.downloadRequest(pin)
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

	r.GET("/0x:pk", func(c *gin.Context) {
		pk := c.Params.ByName("pk")
		st, err := store.downloadSessionToken(pk)

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

	r.PUT("/0x:pk", func(c *gin.Context) {
		pk := c.Params.ByName("pk")
		sessionKey := SessionKey{}
		err := c.ShouldBind(&sessionKey)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
			return
		}
		if sessionKey.SessionPublicKey != pk {
			c.JSON(http.StatusBadRequest, gin.H{"message": "bad request"})
			return
		}
		err = store.uploadSessionToken(&sessionKey)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
			return
		}
		c.JSON(http.StatusCreated, gin.H{
			"message": "Created",
			"key":     pk,
		})
	})
}
