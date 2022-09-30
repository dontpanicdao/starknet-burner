package yeasayer

import (
	"github.com/dontpanicdao/caigo"
	"github.com/dontpanicdao/caigo/rpc"
)

var (
	_ rpc.AccountPlugin = &YeaSayerPlugin{}

	POLICY_TYPE_HASH = caigo.HexToBN("0x2f0026e78543f036f33e26a8f5891b88c58dc1e20cbbfaf0bb53274da6fa568")
)

type Policy struct {
	ContractAddress string `json:"contractAddress"`
	Selector        string `json:"selector"`
}

func IncrementLands(contractAddress string) []Policy {
	return []Policy{{
		ContractAddress: contractAddress,
		Selector:        "increment",
	}}
}
