package main

//go:generate bin/moq -out router_mock_test.go . IStore

import (
	"bytes"
	"errors"
	"fmt"
	"io"
	"net/http"
	"net/http/httptest"
	"testing"
)

type testRouterSuite struct {
	body    string
	method  string
	path    string
	resBody string
	resCode int
	store   *IStoreMock
}

func TestRouter(t *testing.T) {
	testRouterSuites := []testRouterSuite{{
		method:  "GET",
		path:    "/version",
		resCode: http.StatusOK,
		resBody: `{"version":"dev"}`,
	}, {
		method:  "POST",
		path:    "/requests",
		resCode: http.StatusBadRequest,
		resBody: `{"message":"invalid request"}`,
	}, {
		method:  "POST",
		path:    "/requests",
		body:    `{}`,
		resCode: http.StatusBadRequest,
		resBody: `{"message":"Key: 'Request.SessionPublicKey' Error:Field validation for 'SessionPublicKey' failed on the 'required' tag\nKey: 'Request.DappTokenID' Error:Field validation for 'DappTokenID' failed on the 'required' tag"}`,
	}, {
		method:  "POST",
		path:    "/requests",
		body:    `{"key":"foo", "dappTokenID": "bar"}`,
		resCode: http.StatusCreated,
		resBody: `{"requestID":"baz","key":"foo","dappTokenID":"bar"}`,
		store: &IStoreMock{
			uploadRequestFunc: func(r *Request) error {
				r.RequestID = "baz"
				return nil
			},
		},
	}, {
		method:  "GET",
		path:    "/requests/1234",
		resCode: http.StatusBadRequest,
		resBody: `{"message":"unsupported pin format"}`,
	}, {
		method:  "GET",
		path:    "/requests/123456",
		resCode: http.StatusInternalServerError,
		resBody: `{"message":"foo"}`,
		store: &IStoreMock{
			downloadRequestFunc: func(pin string) (*Request, error) { return nil, errors.New("foo") },
		},
	}, {
		method:  "GET",
		path:    "/requests/123456",
		resCode: http.StatusNotFound,
		resBody: `{"message":"request not found"}`,
		store: &IStoreMock{
			downloadRequestFunc: func(pin string) (*Request, error) { return nil, nil },
		},
	}, {
		method:  "GET",
		path:    "/requests/123456",
		resCode: http.StatusOK,
		resBody: `{"requestID":"123456","key":"bar","dappTokenID":"baz"}`,
		store: &IStoreMock{
			downloadRequestFunc: func(pin string) (*Request, error) {
				return &Request{
					RequestID:        "123456",
					SessionPublicKey: "bar",
					DappTokenID:      "baz",
				}, nil
			},
		},
	}}
	for _, test := range testRouterSuites {
		var body io.Reader
		if test.body != "" {
			body = bytes.NewBuffer([]byte(test.body))
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
