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

func TestRouter(t *testing.T) {
	type testRouterSuite struct {
		body    string
		desc    string
		method  string
		path    string
		resBody string
		resCode int
		store   *IStoreMock
	}
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
		resBody: `{"message":"Key: 'AuthorizationRequest.DappTokenID' Error:Field validation for 'DappTokenID' failed on the 'required' tag\nKey: 'AuthorizationRequest.SessionPublicKey' Error:Field validation for 'SessionPublicKey' failed on the 'required' tag"}`,
	}, {
		desc:    "creating a request: all is good",
		method:  "POST",
		path:    "/requests",
		body:    `{"key":"foo", "dappTokenID": "bar"}`,
		resCode: http.StatusCreated,
		resBody: `{"requestID":"baz","dappTokenID":"bar","key":"foo"}`,
		store: &IStoreMock{
			createRequestFunc: func(r *Request) error {
				r.ID = "baz"
				return nil
			},
		},
	}, {
		desc:    "getting a request: bad format",
		method:  "GET",
		path:    "/requests/1234",
		resCode: http.StatusBadRequest,
		resBody: `{"message":"unsupported pin format"}`,
	}, {
		desc:    "getting a request: store function returns an error",
		method:  "GET",
		path:    "/requests/123456",
		resCode: http.StatusInternalServerError,
		resBody: `{"message":"foo"}`,
		store: &IStoreMock{
			findRequestFunc: func(pin string) (*Request, error) { return nil, errors.New("foo") },
		},
	}, {
		desc:    "getting a request: not found",
		method:  "GET",
		path:    "/requests/123456",
		resCode: http.StatusNotFound,
		resBody: `{"message":"not found"}`,
		store: &IStoreMock{
			findRequestFunc: func(pin string) (*Request, error) { return nil, nil },
		},
	}, {
		desc:    "getting a request: store all is good",
		method:  "GET",
		path:    "/requests/123456",
		resCode: http.StatusOK,
		resBody: `{"requestID":"123456","dappTokenID":"baz","key":"bar"}`,
		store: &IStoreMock{
			findRequestFunc: func(pin string) (*Request, error) {
				return &Request{
					ID:               "123456",
					SessionPublicKey: "bar",
					DappTokenID:      "baz",
				}, nil
			},
		},
	}, {
		desc:    "getting signed authorization: store function returns an error",
		method:  "GET",
		path:    "/authorizations/0xdeadbeef",
		resCode: http.StatusInternalServerError,
		resBody: `{"message":"foo"}`,
		store: &IStoreMock{
			findAuthorizationFunc: func(pk string) (*Authorization, error) { return nil, errors.New("foo") },
		},
	}, {
		desc:    "getting signed authorization: not found",
		method:  "GET",
		path:    "/authorizations/0xdeadbeef",
		resCode: http.StatusNotFound,
		resBody: `{"message":"not found"}`,
		store: &IStoreMock{
			findAuthorizationFunc: func(pk string) (*Authorization, error) { return nil, nil },
		},
	}, {
		desc:    "getting signed authorization: all is good",
		method:  "GET",
		path:    "/authorizations/0xdeadbeef",
		resCode: http.StatusOK,
		resBody: `{"account":"baz","expires":0,"root":"bar","policies":[],"key":"foo","signature":["qux"]}`,
		store: &IStoreMock{
			findAuthorizationFunc: func(pk string) (*Authorization, error) {
				return &Authorization{
					SessionPublicKey: "foo",
					Policies:         []Policy{},
					MerkleRoot:       "bar",
					Account:          "baz",
					Signature:        []string{"qux"},
				}, nil
			},
		},
	}, {
		desc:    "create signed authorization: no body provided",
		method:  "POST",
		path:    "/authorizations",
		resCode: http.StatusInternalServerError,
		resBody: `{"message":"invalid request"}`,
	}, {
		desc:    "create signed authorization: store function returns an error",
		method:  "POST",
		path:    "/authorizations",
		body:    `{"key":"0xdeadbeef"}`,
		resCode: http.StatusInternalServerError,
		resBody: `{"message":"foo"}`,
		store: &IStoreMock{
			createAuthorizationFunc: func(s *Authorization) error { return errors.New("foo") },
		},
	}, {
		desc:    "create signed authorization: all is good",
		method:  "POST",
		path:    "/authorizations",
		body:    `{"key":"0xdeadbeef"}`,
		resCode: http.StatusOK,
		resBody: `{"account":"","expires":0,"root":"foo","policies":null,"key":"0xdeadbeef","signature":null}`,
		store: &IStoreMock{
			createAuthorizationFunc: func(s *Authorization) error {
				s.MerkleRoot = "foo"
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
