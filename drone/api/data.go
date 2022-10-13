package main

import (
	"context"
	"crypto/rand"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"log"
	"math/big"
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

type AuthorizationRequest struct {
	ID               string `dynamodbav:"requestID" json:"requestID" form:"requestID"`
	DappTokenID      string `dynamodbav:"dappTokenID" json:"dappTokenID" form:"dappTokenID" binding:"required"`
	SessionPublicKey string `dynamodbav:"sessionPublicKey" json:"key" form:"key" binding:"required"`
	TTL              int64  `dynamodbav:"TTL" json:"-"`
}

type Policy struct {
	ContractAddress string `dynamodbav:"contractAddress" json:"contractAddress"`
	Selector        string `dynamodbav:"selector" json:"selector"`
}

type SignedAuthorization struct {
	Account          string   `dynamodbav:"account" json:"account"`
	Expires          int      `dynamodbav:"expires" json:"expires"`
	MerkleRoot       string   `dynamodbav:"root" json:"root"`
	Policies         []Policy `dynamodbav:"policies" json:"policies"`
	SessionPublicKey string   `dynamodbav:"sessionPublicKey" json:"key"`
	Signature        []string `dynamodbav:"signature" json:"signature"`
	TTL              int64    `dynamodbav:"TTL" json:"-"`
}

type pathKeys struct {
	store *store
	keys  map[string]string
}

// uploadRequest reads a POST and returns statusCreated with the requestID
func (pk *pathKeys) uploadRequest(ctx context.Context, request events.APIGatewayV2HTTPRequest) (events.APIGatewayV2HTTPResponse, error) {
	if request.RequestContext.HTTP.Method != "POST" {
		return events.APIGatewayV2HTTPResponse{
			StatusCode: http.StatusNotFound,
			Body:       `{"message": "NotFound"}`,
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
				Body:       `{"message": "BadRequest"}`,
				Headers:    map[string]string{"Content-Type": "application/json"},
			}, nil
		}
	}
	sessionrequest := AuthorizationRequest{}
	err = json.Unmarshal(data, &sessionrequest)
	fmt.Println("request", sessionrequest.SessionPublicKey, sessionrequest.DappTokenID)
	if err != nil || sessionrequest.SessionPublicKey == "" || sessionrequest.DappTokenID == "" {
		return events.APIGatewayV2HTTPResponse{
			StatusCode: http.StatusBadRequest,
			Body:       `{"message": "BadRequest"}`,
			Headers:    map[string]string{"Content-Type": "application/json"},
		}, nil
	}
	sessionrequest.TTL = time.Now().Add(time.Second * 120).Unix()
	nBig, _ := rand.Int(rand.Reader, big.NewInt(899999))
	sessionrequest.ID = nBig.Add(nBig, big.NewInt(100000)).Text(10)
	item, err := attributevalue.MarshalMap(sessionrequest)
	fmt.Printf("item %+v", item)
	if err != nil {
		return events.APIGatewayV2HTTPResponse{
			StatusCode: http.StatusInternalServerError,
			Body:       fmt.Sprintf(`{"message": "%v"}`, err),
			Headers:    map[string]string{"Content-Type": "application/json"},
		}, nil
	}
	input := &dynamodb.PutItemInput{
		TableName: aws.String(os.Getenv("table_request")),
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
	data, _ = json.Marshal(sessionrequest)
	return events.APIGatewayV2HTTPResponse{
		StatusCode: http.StatusCreated,
		Body:       string(data),
		Headers:    map[string]string{"Content-Type": "application/json"},
	}, nil
}

// downloadRequest reads a requestID and returns the associated sessionkey if it exists
func (pk *pathKeys) downloadRequest(ctx context.Context, request events.APIGatewayV2HTTPRequest) (events.APIGatewayV2HTTPResponse, error) {
	if request.RequestContext.HTTP.Method != "GET" {
		return events.APIGatewayV2HTTPResponse{
			StatusCode: http.StatusNotFound,
			Body:       `{"message": "NotFound"}`,
			Headers:    map[string]string{"Content-Type": "application/json"},
		}, nil
	}
	requestID := strings.ToLower(pk.keys["requestID"])
	input := &dynamodb.GetItemInput{
		TableName: aws.String(os.Getenv("table_request")),
		Key: map[string]types.AttributeValue{
			"requestID": &types.AttributeValueMemberS{
				Value: requestID,
			},
		},
	}
	output, err := pk.store.client.GetItem(ctx, input)
	if err != nil {
		log.Println("dynamodb error:", err)
		return events.APIGatewayV2HTTPResponse{
			StatusCode: http.StatusInternalServerError,
			Body:       fmt.Sprintf(`{"message": "%v"}`, err),
			Headers:    map[string]string{"Content-Type": "application/json"},
		}, nil
	}
	if output.Item == nil {
		log.Println("could not find item with key", requestID)
		return events.APIGatewayV2HTTPResponse{
			StatusCode: http.StatusNoContent,
			Body:       "",
			Headers:    map[string]string{"Content-Type": "application/json"},
		}, nil
	}
	item := AuthorizationRequest{}
	err = attributevalue.UnmarshalMap(output.Item, &item)
	if err != nil {
		log.Println("could not convert data", err)
		return events.APIGatewayV2HTTPResponse{
			StatusCode: http.StatusInternalServerError,
			Body:       fmt.Sprintf(`{"message": "%v"}`, err),
			Headers:    map[string]string{"Content-Type": "application/json"},
		}, nil
	}
	if item.SessionPublicKey == "" {
		return events.APIGatewayV2HTTPResponse{
			StatusCode: http.StatusNoContent,
			Body:       "",
			Headers:    map[string]string{"Content-Type": "application/json"},
		}, nil
	}
	return events.APIGatewayV2HTTPResponse{
		StatusCode: http.StatusOK,
		Body:       fmt.Sprintf(`{"key": "%s", "dappTokenID": "%s"}`, item.SessionPublicKey, item.DappTokenID),
		Headers:    map[string]string{"Content-Type": "application/json"},
	}, nil
}

// uploadSessionToken reads a PUT and returns statusCreated with the sessionPublicKey created
func (pk *pathKeys) uploadSessionToken(ctx context.Context, request events.APIGatewayV2HTTPRequest) (events.APIGatewayV2HTTPResponse, error) {
	if request.RequestContext.HTTP.Method != "PUT" {
		return events.APIGatewayV2HTTPResponse{
			StatusCode: http.StatusNotFound,
			Body:       `{"message": "NotFound"}`,
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
				Body:       `{"message": "BadRequest"}`,
				Headers:    map[string]string{"Content-Type": "application/json"},
			}, nil
		}
	}
	sessionKey := SignedAuthorization{}
	err = json.Unmarshal(data, &sessionKey)
	if err != nil || sessionKey.SessionPublicKey != pk.keys["sessionPublicKey"] {
		return events.APIGatewayV2HTTPResponse{
			StatusCode: http.StatusBadRequest,
			Body:       `{"message": "BadRequest"}`,
			Headers:    map[string]string{"Content-Type": "application/json"},
		}, nil
	}
	sessionKey.TTL = time.Now().Add(time.Second * 300).Unix()
	item, err := attributevalue.MarshalMap(sessionKey)
	if err != nil {
		return events.APIGatewayV2HTTPResponse{
			StatusCode: http.StatusInternalServerError,
			Body:       fmt.Sprintf(`{"message": "%v"}`, err),
			Headers:    map[string]string{"Content-Type": "application/json"},
		}, nil
	}
	input := &dynamodb.PutItemInput{
		TableName: aws.String(os.Getenv("table_session")),
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
		Body:       fmt.Sprintf(`{"message": "Created", "key": "%s"}`, sessionKey.SessionPublicKey),
		Headers:    map[string]string{"Content-Type": "application/json"},
	}, nil
}

// downloadSessionToken reads a sessionPublicKey and returns the associated token if it exists
func (pk *pathKeys) downloadSessionToken(ctx context.Context, request events.APIGatewayV2HTTPRequest) (events.APIGatewayV2HTTPResponse, error) {
	if request.RequestContext.HTTP.Method != "GET" {
		return events.APIGatewayV2HTTPResponse{
			StatusCode: http.StatusNotFound,
			Body:       `{"message": "NotFound"}`,
			Headers:    map[string]string{"Content-Type": "application/json"},
		}, nil
	}
	sessionPublicKey := strings.ToLower(pk.keys["sessionPublicKey"])
	input := &dynamodb.GetItemInput{
		TableName: aws.String(os.Getenv("table_session")),
		Key: map[string]types.AttributeValue{
			"sessionPublicKey": &types.AttributeValueMemberS{
				Value: sessionPublicKey,
			},
		},
	}
	output, err := pk.store.client.GetItem(ctx, input)
	if err != nil {
		log.Println("dynamodb error:", err)
		return events.APIGatewayV2HTTPResponse{
			StatusCode: http.StatusInternalServerError,
			Body:       fmt.Sprintf(`{"message": "%v"}`, err),
			Headers:    map[string]string{"Content-Type": "application/json"},
		}, nil
	}
	if output.Item == nil {
		log.Println("could not find item with key", sessionPublicKey)
		return events.APIGatewayV2HTTPResponse{
			StatusCode: http.StatusNoContent,
			Body:       "",
			Headers:    map[string]string{"Content-Type": "application/json"},
		}, nil
	}
	item := SignedAuthorization{}
	err = attributevalue.UnmarshalMap(output.Item, &item)
	if err != nil {
		log.Println("could not convert data", err)
		return events.APIGatewayV2HTTPResponse{
			StatusCode: http.StatusInternalServerError,
			Body:       fmt.Sprintf(`{"message": "%v"}`, err),
			Headers:    map[string]string{"Content-Type": "application/json"},
		}, nil
	}
	if item.SessionPublicKey == "" {
		return events.APIGatewayV2HTTPResponse{
			StatusCode: http.StatusNoContent,
			Body:       "",
			Headers:    map[string]string{"Content-Type": "application/json"},
		}, nil
	}
	body, err := json.Marshal(item)
	if err != nil {
		log.Println("could not convert body", err)
		return events.APIGatewayV2HTTPResponse{
			StatusCode: http.StatusInternalServerError,
			Body:       fmt.Sprintf(`{"message": "%v"}`, err),
			Headers:    map[string]string{"Content-Type": "application/json"},
		}, nil
	}
	return events.APIGatewayV2HTTPResponse{
		StatusCode: http.StatusOK,
		Body:       string(body),
		Headers:    map[string]string{"Content-Type": "application/json"},
	}, nil
}
