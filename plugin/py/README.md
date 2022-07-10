## Prerequisites

To perform the creation/registration of a Argent-X account, the following
requirements must be met:

### Install Python and the starknet CLI

To work with the plugin, you must configure a Python virtual environment and
install the dependencies. You should run the following commands:

```shell
cd plugin/py
python3 -m venv .
. bin/activate
pip install -r requirements.txt
```

### Make sure you have an OpenZeppelin account

> For some reasons the Argent-X account requires you deploy the contract and
> call the `initialize` function that is not a constructor. As a result, you
> need to have a wallet already configured. I wonder how it is done in the
> current configuration.

We assume there is an OpenZeppelin account is already created and registered
in a file named `$HOME/.starknet_accounts/starknet_open_zeppelin_accounts.json`.

The content of the file should look like below:

```json
{
    "alpha-goerli": {
        "__default__": {
            "private_key": "0x1a99...5813",
            "public_key": "0x5ff5...08a6",
            "address": "0x7650...d3b0"
        }
    }
}
```

If that is not the case, check `starknet deploy_account --help`.

### `deploy` the account

We have provided a script `deploy_goerli.py` that can be used to deploy
an argent-x account.

```shell
python deploy_goerli.py
```

> The script assume you set a different salt every time. It is currently not
> the case but it could be modified to rely on the first public key.

## `initialize` the account

Once the account is created, it cannot be used. We should call the
`initialize` method first to register the signer and the guardian. Since we need
to run an Invoke, that is where we might want to use the openzeppelin account...
At least to start. Obviously we could do the same with an argent-X account later.

To monitor what is happening behind the scene, we will use `mitmproxy` with the
web console and connect it to goerli:

```shell
mitmweb --mode reverse:http://alpha4.starknet.io
```

`invoke` the the `initialize` function from starknet:

```shell
python starkware/starknet/cli/starknet_cli.py invoke \
   --gateway_url http://127.0.0.1:8080 \
   --address 0x345058e731bb3b809880175260eaaa284d2302afb3551f74c1832731f25ee40 \
   --function initialize \
   --inputs 0x6c751300215e750f0718b9f38fad96078312198755f71a880183f983e1215b0 \
   0x441c060be9bbaf135132dc0f31927d25508154d3d21ef474788be54c578bd30 \
   --abi /Users/gregory/project/blaqkube/starknet-burner/plugin/contracts/argentaccount_abi.json \
   --max_fee 50000000000000 \
   --wallet starkware.starknet.wallets.open_zeppelin.OpenZeppelinAccount \
   --network alpha-goerli
```

If you check what is happening under the hood, you can capture the changes like
below:

```shell
curl http://alpha4.starknet.io/gateway/add_transaction \
-H "Content-Type: application/json" \
-d '{
  "max_fee": "0x246139ca8000",
  "entry_point_selector": "0x15d40a3d6ca2ac30f4031e42be28da9b056fef9bb7357ac5e85627ee876e5ad",
  "signature": [
    "346241351129140376340994683251980810643793204699675719419376721164790194242",
    "2744044403700633517713478122368182262112615316296220238444723576795701899758"
  ],
  "calldata": [
    "1",
    "1478889342385977866847350421410405821707989742040860331696169838368143044160",
    "215307247182100370520050591091822763712463273430149262739280891880522753123",
    "0",
    "2",
    "2",
    "3066039993141662063739585251296492464926755368860570209992563090789693003184",
    "1925424197070523492806024522191363170937238997491423656916451384544812645680",
    "0"
  ],
  "version": "0x0",
  "contract_address": "0x7650576102685ba61dc00d0e863377bf775295700e99f31b4d49a9be92cd3b0",
  "type": "INVOKE_FUNCTION"
}'
```

The result is the transaction hash:

```json
{
	"code": "TRANSACTION_RECEIVED",
	"transaction_hash": "0x3943f18f26f941aefcdc80b1d8df6772d800fff6e0af1db339dddffae7337b5"
}
```

The you should monitor the transaction with the command like the one below:

```shell
export HASH=0x3943f18f26f941aefcdc80b1d8df6772d800fff6e0af1db339dddffae7337b5
watch starknet get_transaction --hash $HASH --feeder_gateway_url http://127.0.0.1:8080
```

Again, the output is captured from the web console. It looks like below:

```json
{
    "block_hash": "0x1cde86ba02a8f4fdd6b2da9db7cb00738324b2ffc6094323d4ebc5c2788626c",
    "block_number": 263994,
    "status": "ACCEPTED_ON_L1",
    "transaction": {
        "calldata": [
            "0x1",
            "0x345058e731bb3b809880175260eaaa284d2302afb3551f74c1832731f25ee40",
            "0x79dc0da7c54b95f10aa182ad0a46400db63156920adb65eca2654c0945a463",
            "0x0",
            "0x2",
            "0x2",
            "0x6c751300215e750f0718b9f38fad96078312198755f71a880183f983e1215b0",
            "0x441c060be9bbaf135132dc0f31927d25508154d3d21ef474788be54c578bd30",
            "0x0"
        ],
        "contract_address": "0x7650576102685ba61dc00d0e863377bf775295700e99f31b4d49a9be92cd3b0",
        "entry_point_selector": "0x15d40a3d6ca2ac30f4031e42be28da9b056fef9bb7357ac5e85627ee876e5ad",
        "entry_point_type": "EXTERNAL",
        "max_fee": "0x246139ca8000",
        "signature": [
            "0xc3f7357e07b8768772bcfa77668de45d43431343c25bbd870874607dbce042",
            "0x61112f7ccb660e137e49f38866122d7dd321174fcbc991c90cf119df9b6f1ee"
        ],
        "transaction_hash": "0x3943f18f26f941aefcdc80b1d8df6772d800fff6e0af1db339dddffae7337b5",
        "type": "INVOKE_FUNCTION"
    },
    "transaction_index": 19
}
```

You can check on [voyager](https://goerli.voyager.online) the detail of the
contract `0x345058e731bb3b809880175260eaaa284d2302afb3551f74c1832731f25ee40`.
You should call `get_signer` and `get_guardian` to control the signer and
guardian of the contract.

## Sending ETH to the new contract

To send ETH to the new contract, you can use `transfer` function on `0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7`. The easiest way it to do it on voyager but it can also be done from the starknet CLI assuming you have eth on it.

Once you have filled the contract, you can check the balance of the contract. First generate an ABI for an ERC20 contract.

```shell
cd plugin/cairo-contracts/src
starknet-compile \
   --output ../../contracts/erc20.json \
   --abi ../../contracts/erc20_abi.json \
   openzeppelin/token/erc20/ERC20.cairo
```

Once done, you can check the balance of the contract.

```shell
starknet call --feeder_gateway_url http://localhost:8080 --no_wallet \
   --address 0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7
   --function balanceOf --abi ../contracts/erc20_abi.json
   --inputs 0x345058e731bb3b809880175260eaaa284d2302afb3551f74c1832731f25ee40
```

The input looks like the command below:

```json
// POST http://alpha4.starknet.io/feeder_gateway/call_contract?blockNumber=null HTTP/1.1
{
	"calldata": ["1478889342385977866847350421410405821707989742040860331696169838368143044160"],
	"entry_point_selector": "0x2e4263afad30923c891518314c3c95dbe830a16874e8abc5777a9a20b54c76e",
	"max_fee": "0x0",
	"signature": [],
	"version": "0x100000000000000000000000000000000",
	"contract_address": "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7"
}
```

And the output:

```json
{
    "result": [
        "0x11c37937e08000",
        "0x0"
    ]
}
```

To see the balance of the contract, you can use the command below:

```shell
export HEXNUM=$(echo 0x11c37937e08000 | cut -c2-)
echo $((16#$HEXNUM))
```
