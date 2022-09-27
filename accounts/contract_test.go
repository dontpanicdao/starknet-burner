package accounts

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"math/big"
	"net/http"
	"strings"
	"testing"

	_ "embed"

	"github.com/dontpanicdao/caigo"
	"github.com/dontpanicdao/caigo/rpc"
	"github.com/dontpanicdao/caigo/rpc/types"
)

//go:embed artifacts/sessionkey_3fc70024.json
var sessionkeyCompiled []byte

//go:embed artifacts/yeasayer.json
var yeasayerCompiled []byte

//go:embed artifacts/account.json
var accountCompiled []byte

//go:embed artifacts/counter.json
var counterCompiled []byte

var (
	sessionkeyClassHash = "0x05cf07fd427f19b180c125b70975db4caab0ba86c541d5b1ab5264f2daee265d"
	yeasayerClassHash   = "0x05386fcd71572eb2b8bf725b4ae60c0da59bbfa85398a504fc70ed12f67795e5"
	privateKey          = "0x1"
	// accountSessionKeyAddress = "0x08186a08f85dab49db1256760e840fa9c4c26c5a4c308d3bed3199d82140599"
	accountYeaSayerAddress = "0x047c15a7835fcaf677609531dd71810cb507ab755418b6fe7e35ee8308a07da6"
	counterAddress         = "0x01bb5b121d95ddb29ea630a1fa6f03e1f998540ca821531c82d8c7e889398b6e"
	devnetEth              = "0x62230ea046a9a5fbc261ac77d03c8d41e5d442db2284587570ab46455fd2488"
)

// TestSessionKey_RegisterClass
func TestSessionKey_RegisterClass(t *testing.T) {
	provider := beforeEach(t)

	sessionkeyClass := types.ContractClass{}
	if err := json.Unmarshal(sessionkeyCompiled, &sessionkeyClass); err != nil {
		t.Fatal(err)
	}
	ctx := context.Background()
	tx, err := provider.AddDeclareTransaction(ctx, sessionkeyClass, "0x0")
	if err != nil {
		t.Fatal("declare should succeed, instead:", err)
	}
	if tx.ClassHash != sessionkeyClassHash {
		t.Fatal("declare should return sessionkey class, instead:", tx.ClassHash)
	}
	fmt.Println("...")
	fmt.Println("   verify transaction")
	fmt.Println("...")
	fmt.Println("export STARKNET_WALLET=starkware.starknet.wallets.open_zeppelin.OpenZeppelinAccount")
	fmt.Println("export STARKNET_NETWORK=alpha-goerli")
	fmt.Printf("export HASH=%s\n", tx.TransactionHash)
	fmt.Println("starknet get_transaction --hash $HASH --feeder_gateway http://localhost:5050/feeder_gateway")
	fmt.Println("...")
}

// TestYeaSayer_RegisterClass
func TestYeaSayer_RegisterClass(t *testing.T) {
	provider := beforeEach(t)

	yeasayerClass := types.ContractClass{}
	if err := json.Unmarshal(yeasayerCompiled, &yeasayerClass); err != nil {
		t.Fatal(err)
	}
	ctx := context.Background()
	tx, err := provider.AddDeclareTransaction(ctx, yeasayerClass, "0x0")
	if err != nil {
		t.Fatal("declare should succeed, instead:", err)
	}
	if tx.ClassHash != yeasayerClassHash {
		t.Fatal("declare should return yeasayer class, instead:", tx.ClassHash)
	}
	fmt.Println("...")
	fmt.Println("   verify transaction")
	fmt.Println("...")
	fmt.Println("export STARKNET_WALLET=starkware.starknet.wallets.open_zeppelin.OpenZeppelinAccount")
	fmt.Println("export STARKNET_NETWORK=alpha-goerli")
	fmt.Printf("export HASH=%s\n", tx.TransactionHash)
	fmt.Println("starknet get_transaction --hash $HASH --feeder_gateway http://localhost:5050/feeder_gateway")
	fmt.Println("...")
}

// TestYeaSayer_DeployAccount
func TestYeaSayer_DeployAccount(t *testing.T) {
	provider := beforeEach(t)

	accountClass := types.ContractClass{}
	pk, ok := big.NewInt(0).SetString(privateKey, 0)
	if !ok {
		t.Fatal("could not match *big.Int private key with current value")
	}
	publicKey, _, err := caigo.Curve.PrivateToPoint(pk)
	if err != nil {
		t.Fatal(err)
	}
	publicKeyString := fmt.Sprintf("0x%s", publicKey.Text(16))
	inputs := []string{
		publicKeyString,
		yeasayerClassHash,
	}

	if err := json.Unmarshal(accountCompiled, &accountClass); err != nil {
		t.Fatal(err)
	}
	ctx := context.Background()
	tx, err := provider.AddDeployTransaction(ctx, publicKeyString, inputs, accountClass)
	if err != nil {
		t.Fatal("deploy should succeed, instead:", err)
	}
	if tx.ContractAddress != accountYeaSayerAddress {
		t.Fatal("deploy should return account address, instead:", tx.ContractAddress)
	}
	fmt.Println("...")
	fmt.Println("   verify transaction")
	fmt.Println("...")
	fmt.Println("export STARKNET_WALLET=starkware.starknet.wallets.open_zeppelin.OpenZeppelinAccount")
	fmt.Println("export STARKNET_NETWORK=alpha-goerli")
	fmt.Printf("export HASH=%s\n", tx.TransactionHash)
	fmt.Println("starknet get_transaction --hash $HASH --feeder_gateway http://localhost:5050/feeder_gateway")
	fmt.Println("...")
}

// TestYeaSayer_MintEth
func TestYeaSayer_MintEth(t *testing.T) {
	payload := fmt.Sprintf(`{"address": "%s","amount": 1000000000000000}`, accountYeaSayerAddress)
	resp, err := http.Post(
		"http://localhost:5050/mint",
		"application/json",
		bytes.NewBuffer([]byte(payload)),
	)

	if err != nil {
		log.Fatal("could not POST data", err)
	}

	if resp.StatusCode != http.StatusOK {
		log.Fatal("unexpected status code:", resp.StatusCode)
	}
	ret, err := io.ReadAll(resp.Body)
	defer resp.Body.Close()
	if err != nil {
		log.Fatal("could not read body", err)
	}
	fmt.Println("output", string(ret))
}

// TestYeaSayer_CheckEth
func TestYeaSayer_CheckEth(t *testing.T) {
	provider := beforeEach(t)
	ctx := context.Background()
	output, err := provider.Call(ctx, types.FunctionCall{
		ContractAddress:    types.HexToHash(devnetEth),
		EntryPointSelector: "balanceOf",
		CallData:           []string{accountYeaSayerAddress},
	},
		rpc.WithBlockTag("latest"),
	)
	if err != nil {
		log.Fatal("could not call Eth", err)
	}
	fmt.Printf("amount of Eth is %+v\n", output)
}

// TestCounter_DeployContract
func TestCounter_DeployContract(t *testing.T) {
	provider := beforeEach(t)

	counterClass := types.ContractClass{}
	inputs := []string{}

	if err := json.Unmarshal(counterCompiled, &counterClass); err != nil {
		t.Fatal(err)
	}
	ctx := context.Background()
	tx, err := provider.AddDeployTransaction(ctx, "0xdeadbeef", inputs, counterClass)
	if err != nil {
		t.Fatal("deploy should succeed, instead:", err)
	}
	if tx.ContractAddress != counterAddress {
		t.Fatal("deploy should return counter address, instead:", tx.ContractAddress)
	}
	fmt.Println("...")
	fmt.Println("   verify transaction")
	fmt.Println("...")
	fmt.Println("export STARKNET_WALLET=starkware.starknet.wallets.open_zeppelin.OpenZeppelinAccount")
	fmt.Println("export STARKNET_NETWORK=alpha-goerli")
	fmt.Printf("export HASH=%s\n", tx.TransactionHash)
	fmt.Println("starknet get_transaction --hash $HASH --feeder_gateway http://localhost:5050/feeder_gateway")
	fmt.Println("...")
}

// TestCounter_ExecuteIncrementWithPlugin
func TestCounter_ExecuteIncrementWithPlugin(t *testing.T) {
	provider := beforeEach(t)
	account, err := provider.NewAccount(privateKey, accountYeaSayerAddress)
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
	fmt.Println("...")
	fmt.Println("   verify transaction")
	fmt.Println("...")
	fmt.Println("export STARKNET_WALLET=starkware.starknet.wallets.open_zeppelin.OpenZeppelinAccount")
	fmt.Println("export STARKNET_NETWORK=alpha-goerli")
	fmt.Printf("export HASH=%s\n", tx.TransactionHash)
	fmt.Println("starknet get_transaction --hash $HASH --feeder_gateway http://localhost:5050/feeder_gateway")
	fmt.Println("...")
}
