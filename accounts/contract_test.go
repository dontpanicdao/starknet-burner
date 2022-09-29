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
	"time"

	_ "embed"

	"github.com/dontpanicdao/caigo"
	"github.com/dontpanicdao/caigo/rpc"
	"github.com/dontpanicdao/caigo/rpc/types"
)

//go:embed artifacts/yeasayer.json
var yeasayerCompiled []byte

//go:embed artifacts/account.json
var accountCompiled []byte

//go:embed artifacts/counter.json
var counterCompiled []byte

var (
	// sessionkeyClassHash = "0x05cf07fd427f19b180c125b70975db4caab0ba86c541d5b1ab5264f2daee265d"
	yeasayerClassHash = "0x03f3d1efc312b3a4472a37658bcfc8935602a1297d407f6922b7a2795a16b04d"
	privateKey        = "0x1"
	sessionPrivateKey = "0x2"
	// accountSessionKeyAddress = "0x08186a08f85dab49db1256760e840fa9c4c26c5a4c308d3bed3199d82140599"
	accountYeaSayerAddress = "0x04fe2f5059a54fe4a729b2cfbfee1faeff06baf378c6512c0249901abb316805"
	counterAddress         = "0x01bb5b121d95ddb29ea630a1fa6f03e1f998540ca821531c82d8c7e889398b6e"
	devnetEth              = "0x62230ea046a9a5fbc261ac77d03c8d41e5d442db2284587570ab46455fd2488"
)

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
	if len(output) != 2 {
		log.Fatal("should return an uint256, i.e. 2 felts")
	}
	amount, _ := big.NewInt(0).SetString(output[0], 0)
	fmt.Printf("account has %s wei\n", amount.Text(10))
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
	fmt.Printf("tx hash: %s\n", tx.TransactionHash)
}

// TestCounter_ExecuteIncrementWithPlugin
func TestCounter_ExecuteIncrementWithPlugin(t *testing.T) {
	provider := beforeEach(t)
	// account, err := provider.NewAccount(privateKey, accountYeaSayerAddress)
	account, err := provider.NewAccount(sessionPrivateKey, accountYeaSayerAddress, WithYeaSayerPlugin(yeasayerClassHash))
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
	fmt.Printf("tx hash: %s\n", tx.TransactionHash)
}
