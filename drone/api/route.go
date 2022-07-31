package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"regexp"

	"github.com/aws/aws-lambda-go/events"
)

var version = "dev"

func path(path, matcher string) bool {
	if path == matcher || path == "/production"+matcher {
		return true
	}
	return false
}

func regexPath(path, matcher string) (map[string]string, bool) {
	r1 := regexp.MustCompile(matcher)
	r2 := regexp.MustCompile("\\/production" + matcher)
	for _, r := range []*regexp.Regexp{r1, r2} {
		if !r.MatchString(path) {
			continue
		}
		v := r.FindStringSubmatch(path)
		k := r.SubexpNames()
		mapping := map[string]string{}
		for i := range k {
			mapping[k[i]] = v[i]
		}
		return mapping, true
	}
	return nil, false
}

// handleRequest handles the request and returns OK
func handleRequest(ctx context.Context, request events.APIGatewayV2HTTPRequest) (events.APIGatewayV2HTTPResponse, error) {
	if request.RequestContext.HTTP.Method == "OPTIONS" {
		return events.APIGatewayV2HTTPResponse{
			Headers:    map[string]string{"Content-Type": "application/json"},
			StatusCode: 204,
		}, nil
	}
	if _, ok := regexPath(request.RequestContext.HTTP.Path, `\/version$`); ok {
		return events.APIGatewayV2HTTPResponse{
			StatusCode: http.StatusOK,
			Body:       fmt.Sprintf(`{"version": "%s"}`, version),
		}, nil
	}
	store, err := NewStore(ctx)
	if err != nil {
		log.Println("error accessing the store", err)
		return events.APIGatewayV2HTTPResponse{
			StatusCode: http.StatusInternalServerError,
			Body:       err.Error(),
		}, nil
	}
	if _, ok := regexPath(request.RequestContext.HTTP.Path, `\/requests$`); ok {
		ks := &pathKeys{
			store: store,
			keys:  map[string]string{},
		}
		return ks.uploadRequest(ctx, request)
	}
	if keys, ok := regexPath(request.RequestContext.HTTP.Path, `\/requests/(?P<requestID>[0-9]{6})$`); ok {
		ks := &pathKeys{
			store: store,
			keys:  keys,
		}
		return ks.downloadRequest(ctx, request)
	}
	if keys, ok := regexPath(request.RequestContext.HTTP.Path, `\/(?P<sessionPublicKey>0x[0-9a-fA-F]+)$`); ok {
		ks := &pathKeys{
			store: store,
			keys:  keys,
		}
		switch request.RequestContext.HTTP.Method {
		case http.MethodGet:
			return ks.downloadSessionToken(ctx, request)
		case http.MethodPut:
			return ks.uploadSessionToken(ctx, request)
		}
	}
	return events.APIGatewayV2HTTPResponse{
		Headers:    map[string]string{"Content-Type": "application/json"},
		Body:       "{\"message\": \"NotFound\"}",
		StatusCode: http.StatusNotFound,
	}, nil
}
