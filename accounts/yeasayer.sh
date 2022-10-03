#!/bin/bash

set -e 

go clean -testcache
go test -v -run TestYeaSayer_RegisterPlugin
go test -v -run TestYeaSayer_DeclareImplAccount
go test -v -run TestYeaSayer_DeployProxyAccount
go test -v -run TestYeaSayer_MintEth
go test -v -run TestYeaSayer_CheckEth
go test -v -run TestCounter_DeployContract
go test -v -run TestCounter_IncrementWithYeaSayerPlugin

