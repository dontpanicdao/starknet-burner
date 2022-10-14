//go:build tools

package tools

import (
	_ "github.com/matryer/moq"
)

//go:generate go install github.com/matryer/moq@latest
