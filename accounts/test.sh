#!/bin/bash

set -e 

go clean -testcache
go test -v -run TestYeaSayer_RegisterClass
go test -v -run TestYeaSayer_DeployAccount
go test -v -run TestYeaSayer_MintEth
go test -v -run TestYeaSayer_CheckEth
go test -v -run TestCounter_DeployContract
go test -v -run TestCounter_ExecuteIncrementWithPlugin

