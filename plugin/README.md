## Configure python and dependencies

> Note:
> The following steps only work on testnet since deploying contracts and
> classes on the mainnet requires they are whitelisted for now.

Before you start with the deployment, you should configure your python
environment and the associated dependencies; run the commands below:

```shell
cd plugin/py
python3 -m py .
. ./bin/activate
pip install -r requirements.txt
starknet --version
```

To ease the following steps, we will assume you have setup environment
variables for the following. You can generate a new private key by running
the scripts located in `burner/scripts`:

```shell
export SIGNER_PRIVATE_KEY=0x...
export SIGNER_PUBLIC_KEY=0x...
export GUARDIAN_PUBLIC_KEY=0x0
```

And also we would assume:

- you have deployed an account from the CLI as described
  [here](https://www.cairo-lang.org/docs/hello_starknet/account_setup.html).
- you have filled the account with some `ETH` to perform the invoke operations.

## Understand the operations sent by the CLI

To monitor what is happening behind the scene, you can use
[mitmproxy](https://mitmproxy.org/). To use it with goerli, start it as a
reverse proxy:

```shell
mitmweb --mode reverse:http://alpha4.starknet.io
```

And the use `http://127.0.0.1:8080` in the `--gateway_url` or
`--feeder_gateway_url` option or the CLI. The content of the request and
response will be logged in the [console](http://127.0.0.1:8081)

## Change to the previous flow

New things are to be done to transform the previous calls into a session key
flow. These things are to be changed on 3 levels:
- on the contract itself. It should be changed to support the plugin and
  configured with the sessionkey plugin.
- during the setup. A session key token should be requested and send back to
the user.
- on the invoke since it must be slightly different so that the verification
  check the session key signature instead of the original signer signature.

> Argent provides a contract that implements the plugin and as a result, we can
> use it. It is in the
> [explore/plugins](https://github.com/argentlabs/argent-contracts-starknet/tree/explore/plugins)
> branch of the `argentlabs/argent-contracts-starknet` repository.
> Unfortunately, the branch could not simply be applied to the project, because 
> of some change with the 0.9.0 release. We provide an updated branch
> [bugfix/session-key](https://github.com/gregoryguillou/argent-contracts-starknet/tree/bugfix/session-key)
> that fixes the issue. You have pushed the argent-x contract that supports in
>  the `plugin/contracts` directory of the project.

## Recompile contracts

Contracts are already compiled in the `plugin/contracts` directory of the project.
However, if you plan to do it again, those are the commands to run:

```shell
starknet-compile contracts/ArgentAccount.cairo \
  --output ../contracts/argentaccount.json \
  --abi ../contracts/argentaccount_abi.json \
  --account_contract
```

Once done, you should compile the session plugin and deploy the class to the
blockchain by running what follows:

```shell
starknet-compile contracts/plugins/SessionKey.cairo \
  --output ../contracts/sessionkey.json \
  --abi ../contracts/sessionkey_abi.json
```

### Deploy an account with the plugin enabled

You can now deploy a new contract and enable the sessionkey plugin. To proceed,
deploy the account from the compiled file. Change the SALT to avoid collisions.
with existing accounts:

```shell
cd plugin/py
export SALT=0x77

starknet deploy --salt $SALT \
  --contract ../contracts/argentaccount.json

export HASH=<Set the Transaction Hash>
starknet get_transaction --hash $HASH
```

> Add the account hash in the `ACCOUNT_ADDRESS` environment variable.

Once done, you should be able to initialize the account with 

```shell
export STARKNET_WALLET=starkware.starknet.wallets.open_zeppelin.OpenZeppelinAccount
export STARKNET_NETWORK=alpha-goerli

starknet invoke \
   --gateway_url https://alpha4.starknet.io \
   --address $ACCOUNT_ADDRESS \
   --function initialize \
   --inputs $SIGNER_PUBLIC_KEY $GUARDIAN_PUBLIC_KEY \
   --abi ../contracts/argentaccount_abi.json \
   --max_fee 50000000000000

export HASH=<Set the Transaction Hash>
starknet get_transaction --hash $HASH
```

- we need to deploy the session key plugin in the chain, i.e a separate
  contract

```shell
starknet declare \
  --contract ../contracts/sessionkey.json

export HASH=<Set the Transaction Hash>
starknet get_transaction --hash $HASH
```

> Add the plugin class hash in the `PLUGIN_ADDRESS` environment variable.

- we need to reference the plugin from the contract so that it would delegate
  the call to the plugin.

> Only the account itself can auto-register the plugin as a result, you would want
> to use the newly deployed account with the CLI. To proceed, you can (1) fund the
> account with some ETH and (2) change the content of 
> `~/.starknet_accounts/starknet_open_zeppelin_accounts.json` (keep a backup) and 
> replace `alpha-goerli.__default__` with the private key, publick key and account
> address you have set sofar. Once done you should be able to configure the plugin
> but running the command below.

```shell
export STARKNET_WALLET=starkware.starknet.wallets.open_zeppelin.OpenZeppelinAccount
export STARKNET_NETWORK=alpha-goerli

starknet invoke \
   --gateway_url https://alpha4.starknet.io \
   --address $ACCOUNT_ADDRESS \
   --function add_plugin \
   --inputs $PLUGIN_ADDRESS \
   --abi ../contracts/argentaccount_abi.json \
   --max_fee 50000000000000

export HASH=<Set the Transaction Hash>
starknet get_transaction --hash $HASH
```

> If the command above succeeds, you have configured the plugin with the
> account. You can reset the OpenZeppelin account to
> `~/.starknet_accounts/starknet_open_zeppelin_accounts.json`

### Collaboration setup

We should setup a collaboration between the session key wallet and the original
wallet, or, in that specific case, between `burner` and `drone`.

- with the current setup, we should make a session token from the burner public
  key and an expirition date. Later we assume more data will be required but
  this is a first step.
- the session token must be generated, i.e. signed by the original signer
- the session token with the additional data, like the expiration date, must
  be shared back with the burner.

### Invoke

Last but not least, the invoke should be improved so that we use the USE_PLUGIN
call as part its usage. This consists in adding the call as a 1st argument to
the multicall invoke.

## More


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
export STARKNET_WALLET=starkware.starknet.wallets.open_zeppelin.OpenZeppelinAccount
export STARKNET_NETWORK=alpha-goerli
export STARKNET_ACCOUNT=open_zeppelin
starknet call --feeder_gateway_url http://localhost:8080 --no_wallet \
   --address $ETH_CONTRACT_ADDRESS \
   --function balanceOf --abi ../contracts/erc20_abi.json \
   --inputs $ACCOUNT_ADDRESS
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
