package main

import (
	"context"
	"net/http"
	"regexp"

	"github.com/gin-gonic/gin"
)

type App struct {
	Store *store
}

func NewApp() (*App, error) {
	store, err := NewStore(context.TODO())
	if err != nil {
		return nil, err
	}
	return &App{
		Store: store,
	}, nil
}

func NewRouter(store *store) *gin.Engine {
	r := gin.Default()

	r.OPTIONS("/*path", func(c *gin.Context) {
		c.JSON(http.StatusNoContent, nil)
	})

	r.GET("/version", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"version": version})
	})

	r.POST("/requests", func(c *gin.Context) {
		var req Request
		if err := c.ShouldBind(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": err})
			return
		}
		err := store.uploadRequest(&req)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": err})
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
			c.JSON(http.StatusInternalServerError, gin.H{"message": err})
			return
		}

		if req == nil {
			c.JSON(http.StatusNotFound, gin.H{"message": "not found"})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"dappTokenID": req.DappTokenID,
			"key":         req.SessionPublicKey,
		})
	})

	r.GET("/0x:key", func(c *gin.Context) {
		pk := c.Params.ByName("pk")
		st, err := store.downloadSessionToken(pk)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": err})
			return
		}

		if st == nil {
			c.JSON(http.StatusNotFound, gin.H{"message": "not found"})
			return
		}

		c.JSON(http.StatusOK, st)
	})

	r.PUT("/0x:key", func(c *gin.Context) {})

	return r
}
