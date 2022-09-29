package accounts

import (
	"errors"
	"fmt"
	"math/big"
	"time"

	"github.com/dontpanicdao/caigo"
	"github.com/dontpanicdao/caigo/rpc"
	"github.com/dontpanicdao/caigo/rpc/types"
)

var (
	_ rpc.AccountPlugin = &YeaSayerPlugin{}

	SESSION_TYPE_HASH         = caigo.HexToBN("0x1aa0e1c56b45cf06a54534fa1707c54e520b842feb21d03b7deddb6f1e340c")
	STARKNET_MESSAGE          = caigo.UTF8StrToBig("StarkNet Message")
	STARKNET_DOMAIN_TYPE_HASH = caigo.HexToBN("0x13cda234a04d66db62c06b8e3ad5f91bd0c67286c2c7519a826cf49da6ba478")
)

type YeaSayerPlugin struct {
	accountAddress types.Hash
	classHash      *big.Int
	private        *big.Int
}

func WithYeaSayerPlugin(pluginClassHash string) rpc.AccountOptionFunc {
	return func(private, address string) (rpc.AccountOption, error) {
		plugin, ok := big.NewInt(0).SetString(pluginClassHash, 0)
		if !ok {
			return rpc.AccountOption{}, errors.New("could not convert plugin class hash")
		}
		pk, ok := big.NewInt(0).SetString(private, 0)
		if !ok {
			return rpc.AccountOption{}, errors.New("could not convert plugin class hash")
		}
		return rpc.AccountOption{
			AccountPlugin: &YeaSayerPlugin{
				accountAddress: types.HexToHash(address),
				classHash:      plugin,
				private:        pk,
			},
		}, nil
	}
}

// TODO remove use of `HexToBN`
func computeSessionHash(sessionKey, expires, root, chainId, accountAddress string) (*big.Int, error) {
	hashDomain, err := caigo.Curve.ComputeHashOnElements([]*big.Int{
		STARKNET_DOMAIN_TYPE_HASH,
		caigo.HexToBN(chainId),
	})
	if err != nil {
		return nil, err
	}
	hashMessage, err := caigo.Curve.ComputeHashOnElements([]*big.Int{
		SESSION_TYPE_HASH,
		caigo.HexToBN(sessionKey),
		caigo.HexToBN(expires),
		caigo.HexToBN(root),
	})
	if err != nil {
		return nil, err
	}
	return caigo.Curve.ComputeHashOnElements([]*big.Int{
		STARKNET_MESSAGE,
		hashDomain,
		caigo.HexToBN(accountAddress),
		hashMessage,
	})
}

func (plugin *YeaSayerPlugin) PluginCall(calls []types.FunctionCall) (types.FunctionCall, error) {
	expires := big.NewInt(time.Now().Add(2 * time.Hour).Unix())
	res, err := computeSessionHash(
		"0x0",
		fmt.Sprintf("0x%s", expires.Text(16)),
		"0x0",
		"0x534e5f474f45524c49",
		plugin.accountAddress.Hex(),
	)
	if err != nil {
		return types.FunctionCall{}, err
	}
	x, y, err := caigo.Curve.Sign(res, caigo.HexToBN("0x1"))
	if err != nil {
		return types.FunctionCall{}, err
	}
	if err != nil {
		return types.FunctionCall{}, err
	}
	data := []string{
		fmt.Sprintf("0x%s", plugin.classHash.Text(16)),
		"0x0",                                 // empty (yeasayer), would have been: session_key
		fmt.Sprintf("0x%s", expires.Text(16)), // empty (yeasayer), would have been: session_expires
		"0x0",                                 // empty (yeasayer), would have been: merkle_root
		"0x1",                                 // empty (yeasayer), would have been: proof_len
		"0x1",                                 // empty (yeasayer), would have been: proofs with size = prool_len * call_array_len, i.e. 1
		fmt.Sprintf("0x%s", x.Text(16)),       // empty (yeasayer), would have been: session_token[0]
		fmt.Sprintf("0x%s", y.Text(16)),       // empty (yeasayer), would have been: session_token[1]
	}
	return types.FunctionCall{
		ContractAddress:    plugin.accountAddress,
		EntryPointSelector: "use_plugin",
		CallData:           data,
	}, nil
}
