package main

import (
	"context"
	"encoding/json"
	"net/http"
	"os"
	"testing"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/joho/godotenv"
)

type MockDynamoDB struct{}

func (m *MockDynamoDB) PutItem(ctx context.Context, params *dynamodb.PutItemInput, optFns ...func(*dynamodb.Options)) (*dynamodb.PutItemOutput, error) {
	return nil, nil
}

func (m *MockDynamoDB) GetItem(ctx context.Context, params *dynamodb.GetItemInput, optFns ...func(*dynamodb.Options)) (*dynamodb.GetItemOutput, error) {
	return nil, nil
}

func TestUploadJSONMessage(t *testing.T) {
	godotenv.Load()
	token := SessionToken{
		SessionPublicKey: "0xdeadbeef",
		Account:          "0xdeadbeef",
		Contract:         "0xdeadbeef",
		Expires:          1659210039,
		Token:            []string{"0x01", "0x02"},
	}
	body, _ := json.Marshal(token)
	key := &pathKeys{
		store: &store{
			client: &MockDynamoDB{},
		},
		keys: map[string]string{
			"sessionPublicKey": "0xdeadbeef",
		},
	}
	if os.Getenv("INTEGRATION") != "true" {
		t.Skip("skipping integration test")
	}
	ctx := context.Background()
	event, err := key.uploadJSON(ctx, events.APIGatewayV2HTTPRequest{
		RequestContext: events.APIGatewayV2HTTPRequestContext{
			HTTP: events.APIGatewayV2HTTPRequestContextHTTPDescription{
				Method: "PUT",
				Path:   "/production/0xdeadbeef",
			},
		},
		Body: string(body),
	})
	if err != nil {
		t.Fatal("client should be connect, instead:", err)
	}
	if event.StatusCode != http.StatusCreated {
		t.Fatal("status code should be 201, instead:", event.StatusCode)
	}
}
