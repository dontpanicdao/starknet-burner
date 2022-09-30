package accounts

import (
	"fmt"
	"math/big"
	"testing"
	"time"

	_ "embed"

	"github.com/dontpanicdao/caigo"

	"github.com/dontpanicdao/starknet-burner/accounts/yeasayer"
)

//go:embed artifacts/yeasayer.json
var yeasayerPluginCompiled []byte

func yeasayerToken(privateKey, accountAddress, sessionPublicKey string) *yeasayer.YeaSayerToken {
	token, _ := yeasayer.SignToken(
		privateKey,
		caigo.UTF8StrToBig("SN_GOERLI").Text(16),
		sessionPublicKey,
		accountAddress,
		2*time.Hour,
		[]yeasayer.Policy{{ContractAddress: counterAddress, Selector: "increment"}},
	)
	return token
}

// TestYeaSayer_RegisterPlugin
func TestYeaSayer_RegisterPlugin(t *testing.T) {
	pluginHash := RegisterClass(t, yeasayerPluginCompiled)
	v := &accountPlugin{
		PluginHash: pluginHash,
	}
	err := v.Write(".yeasayer.json")
	if err != nil {
		t.Fatal("should be able to save pluginHash, instead:", err)
	}
}

// TestYeaSayer_DeployAccount
func TestYeaSayer_DeployAccount(t *testing.T) {
	pk, ok := big.NewInt(0).SetString(privateKey, 0)
	if !ok {
		t.Fatal("could not match *big.Int private key with current value")
	}
	publicKey, _, err := caigo.Curve.PrivateToPoint(pk)
	if err != nil {
		t.Fatal(err)
	}
	publicKeyString := fmt.Sprintf("0x%s", publicKey.Text(16))
	v := &accountPlugin{}
	err = v.Read(".yeasayer.json")
	if err != nil {
		t.Fatal(err)
	}
	inputs := []string{
		publicKeyString,
		v.PluginHash,
	}
	accountAddress := DeployContract(t, accountCompiled, inputs)
	v.AccountAddress = accountAddress
	err = v.Write(".yeasayer.json")
	if err != nil {
		t.Fatal(err)
	}
}

// TestYeaSayer_MintEth
func TestYeaSayer_MintEth(t *testing.T) {
	v := &accountPlugin{}
	err := v.Read(".yeasayer.json")
	if err != nil {
		t.Fatal(err)
	}
	MintEth(t, v.AccountAddress)
}

// TestYeaSayer_CheckEth
func TestYeaSayer_CheckEth(t *testing.T) {
	v := &accountPlugin{}
	err := v.Read(".yeasayer.json")
	if err != nil {
		t.Fatal(err)
	}
	CheckEth(t, v.AccountAddress)
}

// TestCounter_IncrementWithYeaSayerPlugin
func TestCounter_IncrementWithYeaSayerPlugin(t *testing.T) {
	v := &accountPlugin{}
	err := v.Read(".yeasayer.json")
	if err != nil {
		t.Fatal(err)
	}
	sessionPrivateKeyInt, ok := big.NewInt(0).SetString(sessionPrivateKey, 0)
	if !ok {
		t.Fatal("could not match *big.Int private key with current value")
	}
	sessionPublicKeyInt, _, err := caigo.Curve.PrivateToPoint(sessionPrivateKeyInt)
	if err != nil {
		t.Fatal(err)
	}
	sessionPublicKey := fmt.Sprintf("0x%s", sessionPublicKeyInt.Text(16))
	token := yeasayerToken(privateKey, v.AccountAddress, sessionPublicKey)
	IncrementWithPlugin(t, v.AccountAddress, v.PluginHash, token, counterAddress)
}
