//go:build tools

package tools

import (
	_ "github.com/matryer/moq"
)

//go:generate go build -v -o ../bin/moq github.com/matryer/moq
