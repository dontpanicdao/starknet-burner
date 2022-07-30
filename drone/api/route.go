package main

import (
	"context"
	"net/http"
	"regexp"

	"github.com/aws/aws-lambda-go/events"
)

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
	store, err := NewStore(ctx)
	if err != nil {
		return events.APIGatewayV2HTTPResponse{
			StatusCode: http.StatusInternalServerError,
			Body:       err.Error(),
		}, nil
	}
	if keys, ok := regexPath(request.RequestContext.HTTP.Path, `\/(?P<sessionPublicKey>0x[0-9a-fA-F])$`); ok {
		ks := &pathKeys{
			store: store,
			keys:  keys,
		}
		return ks.getJSON(ctx, request)
	}
	if keys, ok := regexPath(request.RequestContext.HTTP.Path, `\/(?P<sessionPublicKey>0x[0-9a-fA-F])$`); ok {
		ks := &pathKeys{
			store: store,
			keys:  keys,
		}
		return ks.uploadJSON(ctx, request)
	}
	return events.APIGatewayV2HTTPResponse{
		Headers:    map[string]string{"Content-Type": "application/json"},
		Body:       "{\"message\": \"NotFound\"}",
		StatusCode: http.StatusNotFound,
	}, nil
}
