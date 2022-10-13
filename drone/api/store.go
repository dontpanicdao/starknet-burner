package main

type Request struct {
	ID               string `dynamodbav:"requestID" json:"requestID" form:"requestID"`
	DappTokenID      string `dynamodbav:"dappTokenID" json:"dappTokenID" form:"dappTokenID" binding:"required"`
	SessionPublicKey string `dynamodbav:"sessionPublicKey" json:"key" form:"key" binding:"required"`
	TTL              int64  `dynamodbav:"TTL" json:"-"`
}

type Policy struct {
	ContractAddress string `dynamodbav:"contractAddress" json:"contractAddress"`
	Selector        string `dynamodbav:"selector" json:"selector"`
}

type Authorization struct {
	Account          string   `dynamodbav:"account" json:"account"`
	Expires          int      `dynamodbav:"expires" json:"expires"`
	MerkleRoot       string   `dynamodbav:"root" json:"root"`
	Policies         []Policy `dynamodbav:"policies" json:"policies"`
	SessionPublicKey string   `dynamodbav:"sessionPublicKey" json:"key"`
	Signature        []string `dynamodbav:"signature" json:"signature"`
	TTL              int64    `dynamodbav:"TTL" json:"-"`
}

type Storer interface {
	createAuthorization(*Authorization) error
	createRequest(*Request) error
	findAuthorization(string) (*Authorization, error)
	findRequest(string) (*Request, error)
}
