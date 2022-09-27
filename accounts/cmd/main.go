package main

import (
	"context"
	"fmt"
	"os"

	"github.com/dontpanicdao/caigo/rpc"
	ethrpc "github.com/ethereum/go-ethereum/rpc"
	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load()
	url := os.Getenv("STARKNET_NODE_URL")
	ctx := context.Background()
	client, err := ethrpc.DialContext(ctx, url)
	if err != nil {
		fmt.Println("cannot run ethrpc", err)
		os.Exit(1)
	}
	starknet := rpc.NewProvider(client)
	chain, err := starknet.ChainID(ctx)
	if err != nil {
		fmt.Println("cannot connect to starknet", err)
		os.Exit(1)
	}
	fmt.Println("you are connected to", chain, "via", url)
}
