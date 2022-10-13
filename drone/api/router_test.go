package main

//go:generate bin/moq -out router_mock_test.go . IStore

import (
	"errors"
	"fmt"
	"io"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

type testRouterSuite struct {
	body    string
	desc    string
	method  string
	path    string
	resBody string
	resCode int
	store   *IStoreMock
}

func TestRouter(t *testing.T) {
	testRouterSuites := []testRouterSuite{{
		desc:    "getting version",
		method:  "GET",
		path:    "/version",
		resCode: http.StatusOK,
		resBody: `{"version":"dev"}`,
	}, {
		desc:    "creating a request: no body provided",
		method:  "POST",
		path:    "/requests",
		resCode: http.StatusBadRequest,
		resBody: `{"message":"invalid request"}`,
	}, {
		desc:    "creating a request: with bad body",
		method:  "POST",
		path:    "/requests",
		body:    `{}`,
		resCode: http.StatusBadRequest,
		resBody: `{"message":"Key: 'Request.SessionPublicKey' Error:Field validation for 'SessionPublicKey' failed on the 'required' tag\nKey: 'Request.DappTokenID' Error:Field validation for 'DappTokenID' failed on the 'required' tag"}`,
	}, {
		desc:    "creating a request: all is good",
		method:  "POST",
		path:    "/requests",
		body:    `{"key":"foo", "dappTokenID": "bar"}`,
		resCode: http.StatusCreated,
		resBody: `{"requestID":"baz","key":"foo","dappTokenID":"bar"}`,
		store: &IStoreMock{
			createRequestFunc: func(r *Request) error {
				r.RequestID = "baz"
				return nil
			},
		},
	}, {
		desc:    "getting pin: bad format",
		method:  "GET",
		path:    "/requests/1234",
		resCode: http.StatusBadRequest,
		resBody: `{"message":"unsupported pin format"}`,
	}, {
		desc:    "getting pin: store function returns an error",
		method:  "GET",
		path:    "/requests/123456",
		resCode: http.StatusInternalServerError,
		resBody: `{"message":"foo"}`,
		store: &IStoreMock{
			readRequestFunc: func(pin string) (*Request, error) { return nil, errors.New("foo") },
		},
	}, {
		desc:    "getting pin: not found",
		method:  "GET",
		path:    "/requests/123456",
		resCode: http.StatusNotFound,
		resBody: `{"message":"not found"}`,
		store: &IStoreMock{
			readRequestFunc: func(pin string) (*Request, error) { return nil, nil },
		},
	}, {
		desc:    "getting pin: store all is good",
		method:  "GET",
		path:    "/requests/123456",
		resCode: http.StatusOK,
		resBody: `{"requestID":"123456","key":"bar","dappTokenID":"baz"}`,
		store: &IStoreMock{
			readRequestFunc: func(pin string) (*Request, error) {
				return &Request{
					RequestID:        "123456",
					SessionPublicKey: "bar",
					DappTokenID:      "baz",
				}, nil
			},
		},
	}, {
		desc:    "getting session token: store function returns an error",
		method:  "GET",
		path:    "/0xdeadbeef",
		resCode: http.StatusInternalServerError,
		resBody: `{"message":"foo"}`,
		store: &IStoreMock{
			readSessionTokenFunc: func(pk string) (*SessionKey, error) { return nil, errors.New("foo") },
		},
	}, {
		desc:    "getting session token: not found",
		method:  "GET",
		path:    "/0xdeadbeef",
		resCode: http.StatusNotFound,
		resBody: `{"message":"not found"}`,
		store: &IStoreMock{
			readSessionTokenFunc: func(pk string) (*SessionKey, error) { return nil, nil },
		},
	}, {
		desc:    "getting session token: all is good",
		method:  "GET",
		path:    "/0xdeadbeef",
		resCode: http.StatusOK,
		resBody: `{"key":"foo","policies":[],"expires":0,"root":"bar","account":"baz","signature":["qux"]}`,
		store: &IStoreMock{
			readSessionTokenFunc: func(pk string) (*SessionKey, error) {
				return &SessionKey{
					SessionPublicKey: "foo",
					Policies:         []Policy{},
					Root:             "bar",
					Account:          "baz",
					Signature:        []string{"qux"},
				}, nil
			},
		},
	}, {
		desc:    "updating session token: no body provided",
		method:  "PUT",
		path:    "/0xdeadbeef",
		resCode: http.StatusInternalServerError,
		resBody: `{"message":"invalid request"}`,
	}, {
		desc:    "updating session token: store function returns an error",
		method:  "PUT",
		path:    "/0xdeadbeef",
		body:    `{"key":"0xdeadbeef"}`,
		resCode: http.StatusInternalServerError,
		resBody: `{"message":"foo"}`,
		store: &IStoreMock{
			updateSessionTokenFunc: func(s *SessionKey) error { return errors.New("foo") },
		},
	}, {
		desc:    "updating session token: all is good",
		method:  "PUT",
		path:    "/0xdeadbeef",
		body:    `{"key":"0xdeadbeef"}`,
		resCode: http.StatusOK,
		resBody: `{"key":"0xdeadbeef","policies":null,"expires":0,"root":"foo","account":"","signature":null}`,
		store: &IStoreMock{
			updateSessionTokenFunc: func(s *SessionKey) error {
				s.Root = "foo"
				return nil
			},
		},
	}}
	for _, test := range testRouterSuites {
		fmt.Println(test.desc)
		var body io.Reader
		if test.body != "" {
			body = strings.NewReader(test.body)
		}
		router := NewRouter(test.store, "")
		w := httptest.NewRecorder()
		req, _ := http.NewRequest(test.method, test.path, body)
		req.Header.Set("Content-Type", "application/json")
		router.ServeHTTP(w, req)
		fmt.Printf("called %q %q with %q\n", test.method, test.path, test.body)
		if w.Code != test.resCode {
			t.Fatalf("expected response code %d, but got %d", test.resCode, w.Code)
		}
		if w.Body.String() != test.resBody {
			t.Fatalf("expected response body %q, but got %q", test.resBody, w.Body.String())
		}
	}
}
