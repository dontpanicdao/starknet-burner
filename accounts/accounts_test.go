package accounts

import (
	"context"
	_ "embed"
	"encoding/json"
	"fmt"
	"testing"
	"time"

	"github.com/dontpanicdao/caigo/rpc/types"
)

const (
	privateKey        = "0x1"
	sessionPrivateKey = "0x2"
	counterAddress    = "0x01bb5b121d95ddb29ea630a1fa6f03e1f998540ca821531c82d8c7e889398b6e"
	devnetEth         = "0x62230ea046a9a5fbc261ac77d03c8d41e5d442db2284587570ab46455fd2488"
)

//go:embed artifacts/account.json
var accountCompiled []byte

//go:embed artifacts/counter.json
var counterCompiled []byte

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
