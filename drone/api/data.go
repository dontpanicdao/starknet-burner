package main

import (
	"context"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/attributevalue"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb/types"
)

type SessionKey struct {
	SessionPublicKey string   `dynamodbav:"sessionPublicKey" json:"sessionPublicKey"`
	Account          string   `dynamodbav:"account" json:"account"`
	Expires          int      `dynamodbav:"expires" json:"expires"`
	Contract         *string  `dynamodbav:"contract,omitempty" json:"contract,omitempty"`
	Token            []string `dynamodbav:"token" json:"token"`
	TTL              int64    `dynamodbav:"TTL" json:"-"`
}

type pathKeys struct {
	store *store
	keys  map[string]string
}

// uploadJSON reads a PUT and returns statusCreated with the sessionPublicKey created
func (pk *pathKeys) uploadJSON(ctx context.Context, request events.APIGatewayV2HTTPRequest) (events.APIGatewayV2HTTPResponse, error) {
	if request.RequestContext.HTTP.Method != "PUT" {
		return events.APIGatewayV2HTTPResponse{
			StatusCode: http.StatusNotFound,
			Body:       fmt.Sprintf(`{"message": "NotFound"}`),
			Headers:    map[string]string{"Content-Type": "application/json"},
		}, nil
	}
	data := []byte(request.Body)
	var err error
	if request.IsBase64Encoded {
		data, err = base64.StdEncoding.DecodeString(request.Body)
		if err != nil {
			return events.APIGatewayV2HTTPResponse{
				StatusCode: http.StatusBadRequest,
				Body:       fmt.Sprintf(`{"message": "BadRequest"}`),
				Headers:    map[string]string{"Content-Type": "application/json"},
			}, nil
		}
	}
	sessionKey := SessionKey{}
	err = json.Unmarshal(data, &sessionKey)
	if err != nil || sessionKey.SessionPublicKey != pk.keys["sessionPublicKey"] {
		return events.APIGatewayV2HTTPResponse{
			StatusCode: http.StatusBadRequest,
			Body:       fmt.Sprintf(`{"message": "BadRequest"}`),
			Headers:    map[string]string{"Content-Type": "application/json"},
		}, nil
	}
	sessionKey.TTL = time.Now().Add(time.Second * 300).Unix()
	data, _ = json.Marshal(sessionKey)
	item, err := attributevalue.MarshalMap(sessionKey)
	if err != nil {
		return events.APIGatewayV2HTTPResponse{
			StatusCode: http.StatusInternalServerError,
			Body:       fmt.Sprintf(`{"message": "%v"}`, err),
			Headers:    map[string]string{"Content-Type": "application/json"},
		}, nil
	}
	input := &dynamodb.PutItemInput{
		TableName: aws.String(os.Getenv("table")),
		Item:      item,
	}
	_, err = pk.store.client.PutItem(ctx, input)
	if err != nil {
		return events.APIGatewayV2HTTPResponse{
			StatusCode: http.StatusInternalServerError,
			Body:       fmt.Sprintf(`{"message": "%v"}`, err),
			Headers:    map[string]string{"Content-Type": "application/json"},
		}, nil
	}
	return events.APIGatewayV2HTTPResponse{
		StatusCode: http.StatusCreated,
		Body:       fmt.Sprintf(`{"message": "Created", "sessionKey": "%s"}`, sessionKey.SessionPublicKey),
		Headers:    map[string]string{"Content-Type": "application/json"},
	}, nil
}

// getJSON reads a sessionPublicKey and returns the associated token if it exists
func (pk *pathKeys) getJSON(ctx context.Context, request events.APIGatewayV2HTTPRequest) (events.APIGatewayV2HTTPResponse, error) {
	if request.RequestContext.HTTP.Method != "GET" {
		return events.APIGatewayV2HTTPResponse{
			StatusCode: http.StatusNotFound,
			Body:       fmt.Sprintf(`{"message": "NotFound"}`),
			Headers:    map[string]string{"Content-Type": "application/json"},
		}, nil
	}
	sessionPublicKey := strings.ToLower(pk.keys["sessionPublicKey"])
	input := &dynamodb.GetItemInput{
		TableName: aws.String(os.Getenv("table")),
		Key: map[string]types.AttributeValue{
			"sessionPublicKey": &types.AttributeValueMemberS{
				Value: sessionPublicKey,
			},
		},
	}
	output, err := pk.store.client.GetItem(ctx, input)
	if err != nil {
		return events.APIGatewayV2HTTPResponse{
			StatusCode: http.StatusInternalServerError,
			Body:       fmt.Sprintf(`{"message": "%v"}`, err),
			Headers:    map[string]string{"Content-Type": "application/json"},
		}, nil
	}
	if output.Item == nil {
		fmt.Println("could not find item with key", sessionPublicKey)
		return events.APIGatewayV2HTTPResponse{
			StatusCode: http.StatusNotFound,
			Body:       fmt.Sprintf(`{"message": "NotFound"}`),
			Headers:    map[string]string{"Content-Type": "application/json"},
		}, nil
	}
	item := SessionKey{}
	err = attributevalue.UnmarshalMap(output.Item, &item)
	if err != nil {
		return events.APIGatewayV2HTTPResponse{
			StatusCode: http.StatusInternalServerError,
			Body:       fmt.Sprintf(`{"message": "%v"}`, err),
			Headers:    map[string]string{"Content-Type": "application/json"},
		}, nil
	}

	if item.SessionPublicKey == "" {
		return events.APIGatewayV2HTTPResponse{
			StatusCode: http.StatusNotFound,
			Body:       fmt.Sprintf(`{"message": "NotFound"}`),
			Headers:    map[string]string{"Content-Type": "application/json"},
		}, nil
	}
	body, _ := json.Marshal(item)
	return events.APIGatewayV2HTTPResponse{
		StatusCode:      http.StatusCreated,
		Body:            string(body),
		IsBase64Encoded: true,
		Headers:         map[string]string{"Content-Type": "application/json"},
	}, nil
}
