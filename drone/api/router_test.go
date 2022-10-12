package main

import (
	"io"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

type testingStore struct{}

func (testingStore) downloadRequest(string) (*Request, error)         { return nil, nil }
func (testingStore) downloadSessionToken(string) (*SessionKey, error) { return nil, nil }
func (testingStore) uploadRequest(*Request) error                     { return nil }
func (testingStore) uploadSessionToken(sessionKey *SessionKey) error  { return nil }

type testRouterSuite struct {
	body    io.Reader
	method  string
	path    string
	resBody string
	resCode int
}

var testRouterSuites = []testRouterSuite{{
	method:  "GET",
	path:    "/version",
	body:    nil,
	resCode: http.StatusOK,
	resBody: `{"version":"dev"}`,
}, {
	method:  "POST",
	path:    "/requests",
	body:    nil,
	resCode: http.StatusBadRequest,
	resBody: `{"message":"missing form body"}`,
}, {
	method:  "POST",
	path:    "/requests",
	body:    strings.NewReader(`{}`),
	resCode: http.StatusBadRequest,
	resBody: `{"message":"Key: 'Request.SessionPublicKey' Error:Field validation for 'SessionPublicKey' failed on the 'required' tag\nKey: 'Request.DappTokenID' Error:Field validation for 'DappTokenID' failed on the 'required' tag"}`,
}}

func TestRouter(t *testing.T) {
	store := testingStore{}
	router := NewRouter(store, "")

	for _, test := range testRouterSuites {
		w := httptest.NewRecorder()
		req, _ := http.NewRequest(test.method, test.path, test.body)
		router.ServeHTTP(w, req)
		if w.Code != test.resCode {
			t.Fatalf("expected response code %d, but got %d", test.resCode, w.Code)
		}
		if w.Body.String() != test.resBody {
			t.Fatalf("expected response body %q, but got %q", test.resBody, w.Body.String())
		}
	}
}
