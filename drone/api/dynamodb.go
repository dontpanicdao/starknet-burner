package main

import (
	"context"
	"crypto/rand"
	"math/big"
	"os"
	"strings"
	"time"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/attributevalue"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb/types"
)

type dynamoClient interface {
	PutItem(ctx context.Context, params *dynamodb.PutItemInput, optFns ...func(*dynamodb.Options)) (*dynamodb.PutItemOutput, error)
	GetItem(ctx context.Context, params *dynamodb.GetItemInput, optFns ...func(*dynamodb.Options)) (*dynamodb.GetItemOutput, error)
}

type dynStore struct {
	client       dynamoClient
	requestTable *string
	sessionTable *string
}

type Key = map[string]types.AttributeValue

var (
	// ensure `dynStore` implements `IStore` interface
	_ Storer = &dynStore{}

	authorizationDuration = time.Second * 300
	requestDuration       = time.Second * 120
)

func NewStore(ctx context.Context) (*dynStore, error) {
	cfg, err := config.LoadDefaultConfig(ctx)
	if err != nil {
		return nil, err
	}
	return &dynStore{
		client:       dynamodb.NewFromConfig(cfg),
		requestTable: aws.String(os.Getenv("table_request")),
		sessionTable: aws.String(os.Getenv("table_session")),
	}, nil
}

func (s *dynStore) createAuthorization(ctx context.Context, auth *Authorization) error {
	auth.TTL = time.Now().Add(authorizationDuration).Unix()
	item, err := attributevalue.MarshalMap(auth)
	if err != nil {
		return err
	}
	input := &dynamodb.PutItemInput{TableName: s.sessionTable, Item: item}
	_, err = s.client.PutItem(ctx, input)
	return err
}

func (s *dynStore) createRequest(ctx context.Context, req *Request) error {
	req.TTL = time.Now().Add(requestDuration).Unix()
	nBig, _ := rand.Int(rand.Reader, big.NewInt(899999))
	req.ID = nBig.Add(nBig, big.NewInt(100000)).Text(10)
	item, err := attributevalue.MarshalMap(req)
	if err != nil {
		return err
	}
	input := &dynamodb.PutItemInput{TableName: s.requestTable, Item: item}
	_, err = s.client.PutItem(ctx, input)
	return err
}

func (s *dynStore) findAuthorization(ctx context.Context, pk string) (*Authorization, error) {
	input := &dynamodb.GetItemInput{
		TableName: s.sessionTable,
		Key:       Key{"sessionPublicKey": &types.AttributeValueMemberS{Value: strings.ToLower(pk)}},
	}
	output, err := s.client.GetItem(ctx, input)
	if err != nil {
		return nil, err
	}
	if output.Item == nil {
		return nil, nil
	}
	var auth Authorization
	if err := attributevalue.UnmarshalMap(output.Item, &auth); err != nil {
		return nil, err
	}
	if auth.SessionPublicKey == "" {
		return nil, nil
	}
	return &auth, nil
}

func (s *dynStore) findRequest(ctx context.Context, id string) (*Request, error) {
	input := &dynamodb.GetItemInput{
		TableName: s.requestTable,
		Key:       Key{"requestID": &types.AttributeValueMemberS{Value: id}},
	}
	output, err := s.client.GetItem(ctx, input)
	if err != nil {
		return nil, err
	}
	if output.Item == nil {
		return nil, nil
	}
	var req Request
	err = attributevalue.UnmarshalMap(output.Item, &req)
	return &req, err
}
