package main

type IStore interface {
	createRequest(*Request) error
	readRequest(string) (*Request, error)
	readSessionToken(string) (*SessionKey, error)
	updateSessionToken(sessionKey *SessionKey) error
}
