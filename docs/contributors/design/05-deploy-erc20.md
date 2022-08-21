## Deploy an ERC20 token

In order to demonstrate the burner wallet, we have created a demo project
called Starkpiller. It is a simple project that uses an ERC20 token called
STRK. The following sessions explain how to deploy the token and how to
use it. 

### Deploy an ERC20 token

To deploy the contract, here again, for now we have done it manually.

- the script below saves the compiled ERC20 contract in `plugin/contracts`

```shell
cd plugin/cairo-contracts/src
starknet-compile \
   --output ../../contracts/erc20.json \
   --abi ../../contracts/erc20_abi.json \
   openzeppelin/token/erc20/ERC20.cairo
```

- to deploy the contract and send 1000 Stark Pill to `0x0207aCC15dc241e7d167E67e30E769719A727d3E0fa47f9E187707289885Dfde`, run:

```shell
cd plugin
starknet deploy --gateway_url https://alpha4.starknet.io \
   --salt 0x918187 \
   --contract contracts/erc20.json \
   --inputs 100890435118921322741918835 357896964874 0 1000 0 918185940135292206422541882614518470140962972696466615727279704460583362526 
```

The output looks like below:

```json
{
	"code": "TRANSACTION_RECEIVED",
	"transaction_hash": "0x17bdfcfcbac9749d3a1e7c9f655b7b00b07b7b6df6bbae59d62fc99984473d", 
	"address": "0x7a1a9784591aad3cc294ed3d89fa45add74e96e8c20e46a21153a6aa979a9cb"
}
```

```text
Deploy transaction was sent.
Contract address: 0x07a1a9784591aad3cc294ed3d89fa45add74e96e8c20e46a21153a6aa979a9cb
Transaction hash: 0x17bdfcfcbac9749d3a1e7c9f655b7b00b07b7b6df6bbae59d62fc99984473d
```

- to monitor the deployment, you can the following command:

```shell
export HASH=0x17bdfcfcbac9749d3a1e7c9f655b7b00b07b7b6df6bbae59d62fc99984473d
watch starknet get_transaction --hash $HASH --feeder_gateway_url http://localhost:8080
```

After a while, the output should look like below:

```json
{
    "block_hash": "0x1b5c25103b8c680c11abec455bfc6fccbcc8a79a96d3a9f961400280e82df2f",
    "block_number": 264230,
    "status": "ACCEPTED_ON_L2",
    "transaction": {
        "class_hash": "0x170c179d67b857e64cee8b860e09308272104b95453bfa927a065017abacce4",
        "constructor_calldata": [
            "0x537461726b2050696c6c73",
            "0x5354524b0a",
            "0x0",
            "0x3e8",
            "0x0",
            "0x207acc15dc241e7d167e67e30e769719a727d3e0fa47f9e187707289885dfde"
        ],
        "contract_address": "0x7a1a9784591aad3cc294ed3d89fa45add74e96e8c20e46a21153a6aa979a9cb",
        "contract_address_salt": "0x918187",
        "transaction_hash": "0x17bdfcfcbac9749d3a1e7c9f655b7b00b07b7b6df6bbae59d62fc99984473d",
        "type": "DEPLOY"
    },
    "transaction_index": 4
}
```

We are almost ready to use the contract. Before we continue, we will send 5 tokens
to the account that we will use with the burner wallet. 

### Send 5 tokens to the burner wallet

Connect to
[goerli voyager](https://goerli.voyager.online/contract/0x07a1a9784591aad3cc294ed3d89fa45add74e96e8c20e46a21153a6aa979a9cb#writeContract)
and transfer data to the burner account, i.e. `0x345058E731BB3B809880175260EAAA284D2302AFB3551F74C1832731F25EE40`.

Once the operation is done, you can check the balance of the burner account.

```shell
starknet call --feeder_gateway_url http://localhost:8080 --no_wallet \
   --address 0x07a1a9784591aad3cc294ed3d89fa45add74e96e8c20e46a21153a6aa979a9cb \
   --function balanceOf --abi contracts/erc20_abi.json \
   --inputs 0x345058E731BB3B809880175260EAAA284D2302AFB3551F74C1832731F25EE40
```

The output show there is 5 tokens in the burner account.

```
5 0
```

> The reason why there are 2 number is because the output is a Uint256 which is
> actually `[low: Felt, high: Felt]`.
