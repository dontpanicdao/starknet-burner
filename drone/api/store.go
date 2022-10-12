package main

type IStore interface {
	downloadRequest(string) (*Request, error)
	downloadSessionToken(string) (*SessionKey, error)
	uploadRequest(*Request) error
	uploadSessionToken(sessionKey *SessionKey) error
}
