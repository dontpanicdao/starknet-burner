package main

import (
	"context"
	"crypto/rand"
	"log"
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

type store struct {
	client dynamoClient
}

func NewStore(ctx context.Context) (*store, error) {
	cfg, err := config.LoadDefaultConfig(ctx)
	if err != nil {
		return nil, err
	}
	client := dynamodb.NewFromConfig(cfg)
	return &store{
		client: client,
	}, nil
}

func (s *store) uploadRequest(req *Request) error {
	req.TTL = time.Now().Add(time.Second * 120).Unix()
	nBig, _ := rand.Int(rand.Reader, big.NewInt(899999))
	req.RequestID = nBig.Add(nBig, big.NewInt(100000)).Text(10)
	item, err := attributevalue.MarshalMap(req)
	if err != nil {
		return err
	}
	input := &dynamodb.PutItemInput{
		TableName: aws.String(os.Getenv("table_request")),
		Item:      item,
	}
	_, err = s.client.PutItem(context.TODO(), input)
	return err
}

func (s *store) downloadRequest(pin string) (*Request, error) {
	input := &dynamodb.GetItemInput{
		TableName: aws.String(os.Getenv("table_request")),
		Key: map[string]types.AttributeValue{
			"requestID": &types.AttributeValueMemberS{
				Value: pin,
			},
		},
	}
	output, err := s.client.GetItem(context.TODO(), input)
	if err != nil {
		return nil, err
	}
	if output.Item == nil {
		return nil, nil
	}
	item := Request{}
	err = attributevalue.UnmarshalMap(output.Item, &item)
	return &item, err
}

func (s *store) downloadSessionToken(pk string) (*SessionKey, error) {
	pk = strings.ToLower(pk)
	input := &dynamodb.GetItemInput{
		TableName: aws.String(os.Getenv("table_session")),
		Key: map[string]types.AttributeValue{
			"sessionPublicKey": &types.AttributeValueMemberS{
				Value: pk,
			},
		},
	}
	output, err := s.client.GetItem(context.TODO(), input)
	if err != nil {
		return nil, err
	}
	if output.Item == nil {
		return nil, nil
	}
	item := SessionKey{}
	err = attributevalue.UnmarshalMap(output.Item, &item)
	if err != nil {
		log.Println("could not convert data", err)
		return nil, err
	}
	if item.SessionPublicKey == "" {
		return nil, nil
	}
	return &item, nil
}

func (s *store) uploadSessionToken(sessionKey *SessionKey) error {
	sessionKey.TTL = time.Now().Add(time.Second * 300).Unix()
	item, err := attributevalue.MarshalMap(sessionKey)
	if err != nil {
		return err
	}
	input := &dynamodb.PutItemInput{
		TableName: aws.String(os.Getenv("table_session")),
		Item:      item,
	}
	_, err = s.client.PutItem(context.TODO(), input)
	if err != nil {
		return err
	}
	return nil
}
