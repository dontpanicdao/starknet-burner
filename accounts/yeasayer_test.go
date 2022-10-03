package accounts

import (
	"context"
	"fmt"
	"math/big"
	"strings"
	"testing"
	"time"

	_ "embed"

	"github.com/dontpanicdao/caigo"
	"github.com/dontpanicdao/caigo/rpc/types"

	"github.com/dontpanicdao/starknet-burner/accounts/yeasayer"
)

//go:embed artifacts/yeasayer.json
var yeasayerPluginCompiled []byte

//go:embed artifacts/account.json
var pluginAccountCompiled []byte

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
	pluginHash := DeclareClass(t, yeasayerPluginCompiled)
	v := &accountPlugin{
		PluginHash: pluginHash,
	}
	err := v.Write(".yeasayer.json")
	if err != nil {
		t.Fatal("should be able to save pluginHash, instead:", err)
	}
}

// TestYeaSayer_DeclareImplAccount
func TestYeaSayer_DeclareImplAccount(t *testing.T) {
	v := &accountPlugin{}
	err := v.Read(".yeasayer.json")
	if err != nil {
		t.Fatal("should be able to read pluginHash, instead:", err)
	}
	accountHash := DeclareClass(t, pluginAccountCompiled)
	v.ImplAccountAddress = accountHash
	err = v.Write(".yeasayer.json")
	if err != nil {
		t.Fatal("should be able to save pluginHash, instead:", err)
	}
}

// TestYeaSayer_DeployProxyAccount
func TestYeaSayer_DeployProxyAccount(t *testing.T) {
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
		v.ImplAccountAddress,
		publicKeyString,
		v.PluginHash,
	}
	proxyAccountAddress := DeployContract(t, publicKeyString, proxyAccountCompiled, inputs)
	v.ProxyAccountAddress = proxyAccountAddress
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
	MintEth(t, v.ProxyAccountAddress)
}

// TestYeaSayer_CheckEth
func TestYeaSayer_CheckEth(t *testing.T) {
	v := &accountPlugin{}
	err := v.Read(".yeasayer.json")
	if err != nil {
		t.Fatal(err)
	}
	CheckEth(t, v.ProxyAccountAddress)
}

// IncrementWithYeaSayerPlugin
func IncrementWithYeaSayerPlugin(t *testing.T, accountAddress string, pluginClass string, token *yeasayer.YeaSayerToken, counterAddress string) {
	provider := beforeEach(t)
	account, err := provider.NewAccount(
		sessionPrivateKey,
		accountAddress,
		yeasayer.WithYeaSayerPlugin(
			pluginClass,
			token,
		))
	if err != nil {
		t.Fatal("deploy should succeed, instead:", err)
	}
	calls := []types.FunctionCall{
		{
			ContractAddress:    types.HexToHash(counterAddress),
			EntryPointSelector: "increment",
			CallData:           []string{},
		},
	}
	ctx := context.Background()
	tx, err := account.Execute(ctx, calls, types.ExecuteDetails{})
	if err != nil {
		t.Fatal("execute should succeed, instead:", err)
	}
	if !strings.HasPrefix(tx.TransactionHash, "0x") {
		t.Fatal("execute should return transaction hash, instead:", tx.TransactionHash)
	}
	fmt.Printf("tx hash: %s\n", tx.TransactionHash)
	status, err := provider.WaitForTransaction(ctx, types.HexToHash(tx.TransactionHash), 8*time.Second)
	if err != nil {
		t.Fatal("declare should succeed, instead:", err)
	}
	if status != types.TransactionStatus_AcceptedOnL2 {
		t.Log("unexpected status transaction status, check:", status)
		t.Log("...")
		t.Log("   verify transaction")
		t.Log("...")
		t.Log("export STARKNET_WALLET=starkware.starknet.wallets.open_zeppelin.OpenZeppelinAccount")
		t.Log("export STARKNET_NETWORK=alpha-goerli")
		t.Logf("export HASH=%s\n", tx.TransactionHash)
		t.Log("starknet get_transaction --hash $HASH --feeder_gateway http://localhost:5050/feeder_gateway")
		t.Log("...")
		t.Fail()
	}
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
	token := yeasayerToken(privateKey, v.ProxyAccountAddress, sessionPublicKey)
	IncrementWithYeaSayerPlugin(t, v.ProxyAccountAddress, v.PluginHash, token, counterAddress)
}
