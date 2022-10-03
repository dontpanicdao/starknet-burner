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

	"github.com/dontpanicdao/caigo/rpc"
	"github.com/dontpanicdao/caigo/rpc/types"
)

// DeclareClass
func DeclareClass(t *testing.T, compiledClass []byte) string {
	provider := beforeEach(t)

	class := types.ContractClass{}
	if err := json.Unmarshal(compiledClass, &class); err != nil {
		t.Fatal(err)
	}
	ctx := context.Background()
	tx, err := provider.AddDeclareTransaction(ctx, class, "0x0")
	if err != nil {
		t.Fatal("declare should succeed, instead:", err)
	}
	if !strings.HasPrefix(tx.ClassHash, "0x") {
		t.Fatal("declare should return classHash, instead:", tx.ClassHash)
	}
	fmt.Printf("class Hash: %s\n", tx.ClassHash)
	fmt.Printf("transaction Hash: %s\n", tx.TransactionHash)
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
	return tx.ClassHash
}

// DeployContract
func DeployContract(t *testing.T, salt string, contractCompiled []byte, inputs []string) string {
	provider := beforeEach(t)
	contractClass := types.ContractClass{}

	if err := json.Unmarshal(contractCompiled, &contractClass); err != nil {
		t.Fatal(err)
	}
	ctx := context.Background()
	tx, err := provider.AddDeployTransaction(ctx, salt, inputs, contractClass)
	if err != nil {
		t.Fatal("deploy should succeed, instead:", err)
	}
	fmt.Printf("contract Address: %s\n", tx.ContractAddress)
	fmt.Printf("tx hash: %s\n", tx.TransactionHash)
	if !strings.HasPrefix(tx.ContractAddress, "0x") {
		t.Fatal("deploy should return account address, instead:", tx.ContractAddress)
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
	return tx.ContractAddress
}

// MintEth
func MintEth(t *testing.T, accountAddress string) {
	payload := fmt.Sprintf(`{"address": "%s","amount": 1000000000000000}`, accountAddress)
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

// CheckEth
func CheckEth(t *testing.T, accountAddress string) string {
	provider := beforeEach(t)
	ctx := context.Background()
	output, err := provider.Call(ctx, types.FunctionCall{
		ContractAddress:    types.HexToHash(devnetEth),
		EntryPointSelector: "balanceOf",
		CallData:           []string{accountAddress},
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
	return output[0]
}
