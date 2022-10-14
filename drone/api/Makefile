
PROJECT := burner
BUCKET := $(shell grep BUCKET .env | cut -d'=' -f2 | tr -d '"')
VERSION := $(shell git log -1 --pretty=%h .)

.PHONY: build
build:
	GOOS=linux GOARCH=amd64 go build -ldflags="-X main.version=$(VERSION)" -o build/$(PROJECT)-linux-amd64 .
	zip -j build/$(VERSION).zip build/$(PROJECT)-linux-amd64

.PHONY: download
download:
	aws s3 cp s3://$(BUCKET)/lambda/$(PROJECT)/$(VERSION).zip build/$(VERSION).zip

.PHONY: generate
generate:
	go generate -tags tools tools/tools.go
	go generate -x ./..

.PHONY: publish
publish: build
	aws s3 cp build/$(VERSION).zip s3://$(BUCKET)/lambda/$(PROJECT)/$(VERSION).zip
