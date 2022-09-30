package yeasayer

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
