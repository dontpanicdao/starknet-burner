package main

import (
	"context"
	"testing"

	"github.com/aws/aws-lambda-go/events"
)

type routeTest struct {
	initialRoute  string
	environment   string
	expectedRoute string
	data          interface{}
}

func TestRoute(t *testing.T) {
	routes := []routeTest{
		{initialRoute: "/production/version", environment: "production", expectedRoute: "/version", data: nil},
	}
	for _, route := range routes {
		request := events.APIGatewayV2HTTPRequest{
			RequestContext: events.APIGatewayV2HTTPRequestContext{
				Stage: route.environment,
				HTTP: events.APIGatewayV2HTTPRequestContextHTTPDescription{
					Method: "GET",
					Path:   route.initialRoute,
				},
			},
		}
		v, err := handleRequest(context.Background(), request)
		if err != nil {
			t.Fatalf("Error: %s", err)
		}
		if v.Body != `{"version": "dev"}` {
			t.Fatalf("Expected %s, got %s", `{"version": "dev"}`, v.Body)
		}
	}
}

func TestURLMatching(t *testing.T) {
	route := "/production/v1/manifests/0x41a52c5f46eb2e4f1b791623b513ce653ed8addc9060ca01c4868d389e5e31b5"
	keys, ok := regexPath(route, `\/v1\/manifests\/(?P<sha>0x[0-9a-fA-F]{1,64})[/]{0,1}$`)
	if !ok {
		t.Fatalf("Expected true, got false")
	}
	if keys["sha"] != "0x41a52c5f46eb2e4f1b791623b513ce653ed8addc9060ca01c4868d389e5e31b5" {
		t.Fatalf("Expected 0x41a52c5f46eb2e4f1b791623b513ce653ed8addc9060ca01c4868d389e5e31b5, got %s", keys["sha"])
	}
}
