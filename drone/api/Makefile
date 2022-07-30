
PROJECT := burner
VERSION := $(shell git log -1 --pretty=%h)

.PHONY: build
build:
	GOOS=linux GOARCH=amd64 go build -o build/$(PROJECT)-linux-amd64 .
	zip -j build/$(VERSION).zip build/$(PROJECT)-linux-amd64

.PHONY: publish
publish: build
	aws s3 cp build/$(VERSION).zip s3://$(BUCKET)/lambda/$(PROJECT)/$(VERSION).zip

.PHONY: download
download:
	aws s3 cp s3://$(BUCKET)/lambda/$(PROJECT)/$(VERSION).zip build/$(VERSION).zip
