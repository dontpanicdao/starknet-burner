package main

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"testing"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/attributevalue"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb/types"
	"github.com/joho/godotenv"
)

type MockDynamoDB struct{}

func (m *MockDynamoDB) PutItem(ctx context.Context, params *dynamodb.PutItemInput, optFns ...func(*dynamodb.Options)) (*dynamodb.PutItemOutput, error) {
	return nil, nil
}

func (m *MockDynamoDB) GetItem(ctx context.Context, params *dynamodb.GetItemInput, optFns ...func(*dynamodb.Options)) (*dynamodb.GetItemOutput, error) {
	return nil, nil
}

func TestIntegrationUploadJSONMessage(t *testing.T) {
	godotenv.Load()
	if os.Getenv("INTEGRATION") != "true" {
		t.Skip("Run only in integration...")
	}
	token := SessionKey{
		SessionPublicKey: "0xdeadbeef",
		Policies:         []Policy{{ContractAddress: "0xdeadbeef", Selector: "0xdeadbeef"}},
		Root:             "0xdeadbeef",
		Expires:          1659210039,
		Signature:        []string{"0x01", "0x02"},
	}
	ctx := context.Background()
	store, err := NewStore(ctx)
	if err != nil {
		t.Fatal("client should be connect, instead:", err)
	}
	key := &pathKeys{
		store: store,
		keys: map[string]string{
			"sessionPublicKey": "0xdeadbeef",
		},
	}
	body, _ := json.Marshal(token)
	event, err := key.uploadSessionToken(ctx, events.APIGatewayV2HTTPRequest{
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

func TestIntegrationDownloadJSONMessage(t *testing.T) {
	godotenv.Load()
	if os.Getenv("INTEGRATION") != "true" {
		t.Skip("Run only in integration...")
	}
	ctx := context.Background()
	store, err := NewStore(ctx)
	if err != nil {
		t.Fatal("client should be connect, instead:", err)
	}
	key := &pathKeys{
		store: store,
		keys: map[string]string{
			"sessionPublicKey": "0xdeadbeef",
		},
	}
	event, err := key.downloadSessionToken(ctx, events.APIGatewayV2HTTPRequest{
		RequestContext: events.APIGatewayV2HTTPRequestContext{
			HTTP: events.APIGatewayV2HTTPRequestContextHTTPDescription{
				Method: "GET",
				Path:   "/production/0xdeadbeef",
			},
		},
	})
	if err != nil {
		t.Fatal("client should be connect, instead:", err)
	}
	if event.StatusCode != http.StatusOK {
		t.Fatal("status code should be 200, instead:", event.StatusCode)
	}
	fmt.Println(event.Body)
}

func TestIntegrationSimpleJSONMessage(t *testing.T) {
	godotenv.Load()
	if os.Getenv("INTEGRATION") != "true" {
		t.Skip("Run only in integration...")
	}
	ctx := context.Background()
	store, err := NewStore(ctx)
	if err != nil {
		t.Fatal("client should be connect, instead:", err)
	}
	input := &dynamodb.GetItemInput{
		TableName: aws.String(os.Getenv("table")),
		Key: map[string]types.AttributeValue{
			"sessionPublicKey": &types.AttributeValueMemberS{
				Value: "0xdeadbeef",
			},
		},
	}
	output, err := store.client.GetItem(ctx, input)
	if err != nil {
		t.Fatal("error:", err)
	}
	item := SessionKey{}
	err = attributevalue.UnmarshalMap(output.Item, &item)
	if err != nil {
		t.Fatal("client should be connect, instead:", err)
	}
	if item.SessionPublicKey != "0xdeadbeef" {
		t.Fatal("expecting 0xdeadbeef, instead:", item.SessionPublicKey)
	}
}
