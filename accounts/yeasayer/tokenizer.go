package yeasayer

import (
	"fmt"
	"math/big"
	"time"

	"github.com/dontpanicdao/caigo"
	"github.com/dontpanicdao/caigo/rpc"
)

var (
	_ rpc.AccountPlugin = &YeaSayerPlugin{}

	SESSION_TYPE_HASH         = caigo.HexToBN("0x1aa0e1c56b45cf06a54534fa1707c54e520b842feb21d03b7deddb6f1e340c")
	STARKNET_MESSAGE          = caigo.UTF8StrToBig("StarkNet Message")
	STARKNET_DOMAIN_TYPE_HASH = caigo.HexToBN("0x13cda234a04d66db62c06b8e3ad5f91bd0c67286c2c7519a826cf49da6ba478")
)

type Session struct {
	Key      string   `json:"key"`
	Expires  *big.Int `json:"expires"`
	Policies []Policy `json:"policies"`
}

type SignedSession struct {
	ChainID        string     `json:"cahinId"`
	AccountAddress string     `json:"account"`
	Root           string     `json:"root"`
	Signature      []*big.Int `json:"Signature"`
}

type YeaSayerToken struct {
	session       Session
	signedSession SignedSession
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

func getMerkleRoot(policies []Policy) (string, error) {
	leaves := []*big.Int{}
	for _, policy := range policies {
		leave, err := caigo.Curve.ComputeHashOnElements([]*big.Int{
			STARKNET_DOMAIN_TYPE_HASH,
			caigo.HexToBN(policy.ContractAddress),
			caigo.GetSelectorFromName(policy.Selector),
		})
		if err != nil {
			return "", err
		}
		leaves = append(leaves, leave)
	}
	tree, err := caigo.NewFixedSizeMerkleTree(leaves...)
	if err != nil {
		return "", err
	}
	return fmt.Sprintf("0x%s", tree.Root.Text(16)), nil
}

func SignToken(privateKey, chainId, sessionKey, accountAddress string, duration time.Duration, policies []Policy) (*YeaSayerToken, error) {
	root, err := getMerkleRoot(policies)
	if err != nil {
		return nil, err
	}
	expires := big.NewInt(time.Now().Add(duration).Unix())
	res, err := computeSessionHash(
		sessionKey,
		fmt.Sprintf("0x%s", expires.Text(16)),
		root,
		chainId,
		accountAddress,
	)
	if err != nil {
		return nil, err
	}
	x, y, err := caigo.Curve.Sign(res, caigo.HexToBN(privateKey))
	if err != nil {
		return nil, err
	}
	return &YeaSayerToken{
		session: Session{
			Key:      sessionKey,
			Expires:  expires,
			Policies: policies,
		},
		signedSession: SignedSession{
			ChainID:        chainId,
			AccountAddress: accountAddress,
			Root:           root,
			Signature:      []*big.Int{x, y},
		},
	}, nil
}
