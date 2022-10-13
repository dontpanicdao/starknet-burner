package main

type IStore interface {
	createRequest(*AuthorizationRequest) error
	readRequest(string) (*AuthorizationRequest, error)
	readSignedAuthorization(string) (*SignedAuthorization, error)
	createSignedAuthorization(sessionKey *SignedAuthorization) error
}
