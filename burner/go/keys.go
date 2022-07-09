package main

import (
	"fmt"
	"math/big"

	"github.com/dontpanicdao/caigo"
)

func pubkey(priv string) (string, error) {
	curve, err := caigo.SC(caigo.WithConstants())
	if err != nil {
		panic(err.Error())
	}

	i, ok := big.NewInt(0).SetString(priv, 0)
	if !ok {
		return "", fmt.Errorf("invalid priv")
	}
	x, _, err := curve.PrivateToPoint(i)
	if err != nil {
		return "", err
	}
	fmt.Println("--------------------------------------------------------------------------------")
	fmt.Printf("publickey:  0x%s\n", x.Text(16))
	fmt.Println("--------------------------------------------------------------------------------")
	return x.Text(16), nil
}
