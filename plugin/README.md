## Configure python and dependencies

> Note:
> The following steps only work on testnet since deploying contracts and
> classes on the mainnet requires they are whitelisted for now.

Before you start with the deployment, you should configure your python
environment and the associated dependencies; run the commands below:

```shell
cd plugin/py
python3 -m venv .
. ./bin/activate
pip install -r requirements.txt
starknet --version
cd ..
```

To ease the following steps, we will assume you have setup environment
variables for the following. You can generate a new private key by running
the scripts located in `plugin/scripts`:

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
  --output ../contracts/argentaccount_plugin.json \
  --abi ../contracts/argentaccount_plugin_abi.json \
  --account_contract
```

If you plan to make the account upgradable, you should also recompile the Proxy
contract to use in a way that makes the contract upgradable. That is how the
argent-x plugin is actually setup.

```shell
starknet-compile contracts/Proxy.cairo \
  --output ../contracts/proxy.json \
  --abi ../contracts/proxy_abi.json
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
declare the class with the argentaccount plugin:


```shell
cd plugin

starknet declare \
  --contract contracts/argentaccount_plugin.json
```

To continue, it is important that you note the class hash and set it in the
ACCOUNT_CLASS_HASH environment variable. We will assume, as explained earlier
that the SIGNER_PRIVATE_KEY, SIGNER_PUBLIC_KEY, SIGNER_GUARDIAN_KEY are set.
To deploy a proxy account that references the account class, you can use the
following command:

```shell
starknet deploy --salt $SIGNER_PUBLIC_KEY \
  --contract contracts/proxy.json \
  --inputs $ACCOUNT_CLASS_HASH \
  215307247182100370520050591091822763712463273430149262739280891880522753123 \
  2 $SIGNER_PUBLIC_KEY $SIGNER_GUARDIAN_KEY
```

You can monitor the progress of the deployment by using the following command:

```shell
export HASH=<Set the Transaction Hash>
starknet get_transaction --hash $HASH
```

> Add the account hash in the `ACCOUNT_ADDRESS` environment variable.

Once done, you should be able to check the class implementing the account by
running the command below:

```shell
starknet call --address $ACCOUNT_ADDRESS \
  --abi contracts/proxy_abi.json \
  --function get_implementation
```

- we need to deploy the session key plugin in the chain, i.e a separate
  contract

```shell
starknet declare \
  --contract contracts/sessionkey.json

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
   --abi ../contracts/argentaccount_plugin_abi.json \
   --max_fee 50000000000000

export HASH=<Set the Transaction Hash>
starknet get_transaction --hash $HASH
```

> If the command above succeeds, you have configured the plugin with the
> account. You can reset the OpenZeppelin account to
> `~/.starknet_accounts/starknet_open_zeppelin_accounts.json`

To check the plugin is correctly configured, you can run the command below:

```shell
starknet call --address $ACCOUNT_ADDRESS \
   --function is_plugin --inputs $PLUGIN_ADDRESS \
   --abi ../contracts/argentaccount_plugin_abi.json
```

### Collaboration setup

We should setup a collaboration between the session key wallet and the original
wallet, or, in that specific case, between `burner` and `drone`.

- with the current setup, we should create a session token; that token is
  make of:
  - the session public key
  - an expiration date

We assume the session public key is set in `SESSION_PUBLIC_KEY`; to generate an
expiration time we might want to run a script like the one below:

```shell
echo $(( $(date +%s) + 24*3600 ))
```

We will also set that value in the `SESSION_EXPIRATION_TIME` environment
variable.

- the session token is actually the hash of the 2 previous items
- the session token must be signed by the account signer to get a pair of
  signatures

To get the hash and signature, we can run the following command:

```shell
cd scripts
npm run token
```

### Before the invoke, deploy an ERC20 token

Before you go on, we will create an ERC20 so that we can play with it from the
session account. To do it:

- compile the ERC20 contract from the openzeppelin repository

```shell
cd plugin/cairo-contracts/src
starknet-compile \
   --output ../../contracts/erc20.json \
   --abi ../../contracts/erc20_abi.json \
   openzeppelin/token/erc20/ERC20.cairo
```

Then, assuming, $ACCOUNT_ADDRESS_BASE10 is the address of the account in base,
deploy the contract and mint 1000 token to the account:

```shell
starknet deploy \
   --salt 0x918188 \
   --contract contracts/erc20.json \
   --inputs 100890435118921322741918835 \
     357896964874 0 1000 0 $ACCOUNT_ADDRESS_BASE10
```

Set `STRK_CONTRACT_ADDRESS` to the contract HASH. You should be able to verify the
account own 1000 tokens of it:

```shell
export STARKNET_WALLET=starkware.starknet.wallets.open_zeppelin.OpenZeppelinAccount
export STARKNET_NETWORK=alpha-goerli

starknet call --feeder_gateway_url http://alpha4.starknet.io --no_wallet \
   --address $STRK_CONTRACT_ADDRESS \
   --function balanceOf --abi ../contracts/erc20_abi.json \
   --inputs $ACCOUNT_ADDRESS
```

Assuming, you set `ETH_CONTRACT_ADDRESS` to the address
`0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7`, i.e. the address
for ETH, you should also have some ETH to use the account:

```shell
export STARKNET_WALLET=starkware.starknet.wallets.open_zeppelin.OpenZeppelinAccount
export STARKNET_NETWORK=alpha-goerli
export STARKNET_ACCOUNT=open_zeppelin
starknet call --feeder_gateway_url http://alpha4.starknet.io --no_wallet \
   --address $ETH_CONTRACT_ADDRESS \
   --function balanceOf --abi ../contracts/erc20_abi.json \
   --inputs $ACCOUNT_ADDRESS
```

You can also check on [voyager](https://goerli.voyager.online) the detail of the
contract and of your account. You should call `get_signer` and `get_guardian` to
control the signer and guardian of the contract and make sure they differ from the
session key.

### Invoke

Last but not least, the invoke uses the `USE_PLUGIN` to notify the account that
it should check against the plugin. We will assume the following variables are
set:

```shell
ACCOUNT_ADDRESS=0x0332a9bcd863896074508d6449177f227990f3377e53d2aeb04c83c05c8a31ed

PLUGIN_ADDRESS=0x1872a7cab935b053c68f2c05fa83632ef0503e7a3e36c1ec3b9a5fd8c73a8af
STRK_CONTRACT_ADDRESS=0x7a1a9784591aad3cc294ed3d89fa45add74e96e8c20e46a21153a6aa979a9cb
ARGENT_ACCOUNT_ADDRESS=0x207aCC15dc241e7d167E67e30E769719A727d3E0fa47f9E187707289885Dfde

SESSION_PRIVATE_KEY=0x4063...
SESSION_PUBLIC_KEY=0x0779...
SESSION_EXPIRATION_TIME=1657871865
SESSION_TOKEN_SIGNATURE0=0x6194...
SESSION_TOKEN_SIGNATURE1=0x5684...
```

Run the script `sample.ts` located in `plugin/scripts`. The script assume the account
has STRK and ETH tokens and transfer one STRK to another account associated with
`ARGENT_ACCOUNT_ADDRESS`. To run the script, run:

```shell
npm run sample
```

It should display a transaction hash. You can check the status of the transaction with
the command below:

```shell
export HASH=<Set the Transaction Hash>
starknet get_transaction --hash $HASH
```

### Contract upgrade

To demonstrate the upgrade of a contract, we will get back to the main branch
of [argentlabs/argent-contracts-starknet/](https://github.com/argentlabs/argent-contracts-starknet)
and compile the contracts again. You do not have to do it since the contracts
are  already compiled in the `plugin/contracts` directory of the project. If
you plan to do it again, those are the commands to run:

```shell
starknet-compile contracts/ArgentAccount.cairo \
  --output ../contracts/argentaccount.json \
  --abi ../contracts/argentaccount_abi.json \
  --account_contract
```

You should be able to declare the contract:

```shell
cd plugin

starknet declare \
  --contract contracts/argentaccount.json

export HASH=0x7dc0100401c18f58c96724447de012e9ca1fdab498b213b593dbf07b08710b1
watch starknet get_transaction --hash $HASH
```

To perform the upgrade, you should set `NEW_IMPLEMENTATION` with the new class hash.

```shell
export NEW_IMPLEMENTATION=0x3e327de1c40540b98d05cbcb13552008e36f0ec8d61d46956d2f9752c294328
```

> make sure `alpha-goerli.__default__` in
> `~/.starknet_accounts/starknet_open_zeppelin_accounts.json`
> points to the signer private/public key and the account address.

To upgrade the account, you can simply invoke the contract `upgrade` function:

```shell
export STARKNET_WALLET=starkware.starknet.wallets.open_zeppelin.OpenZeppelinAccount
export STARKNET_NETWORK=alpha-goerli

starknet invoke \
   --gateway_url https://alpha4.starknet.io \
   --address $ACCOUNT_ADDRESS \
   --function upgrade \
   --inputs $NEW_IMPLEMENTATION \
   --abi contracts/argentaccount_plugin_abi.json \
   --max_fee 50000000000000

export HASH=<Set the Transaction Hash>
starknet get_transaction --hash $HASH
```

> If the command above succeeds, you have configured the plugin with the
> account. You can reset the OpenZeppelin account to
> `~/.starknet_accounts/starknet_open_zeppelin_accounts.json`

To check the plugin is correctly configured, you can run the command below:

```shell
starknet call --address $ACCOUNT_ADDRESS \
   --function get_signer \
   --abi contracts/argentaccount_abi.json
```

If you contraol the implementation, you should see that it has changed:

```shell
starknet call --address $ACCOUNT_ADDRESS \
   --function get_implementation \
   --abi contracts/proxy_abi.json
```

If you check on [voyager](https://goerli.voyager.online) the detail of the
contract and of your account, you will see that `is_plugin` is not available
anymore and if you try to access the fonction with the former ABI, it will
fail:

```shell
# This fails as expected
starknet call --address $ACCOUNT_ADDRESS \
   --function is_plugin --inputs $PLUGIN_ADDRESS \
   --abi contracts/argentaccount_plugin_abi.json
```

To switch the contract back to a version that support the plugin, you can
invoke the contract `upgrade` function again. Check the class hash with the
command below:

```shell
starknet declare \
  --contract contracts/argentaccount_plugin.json

export NEW_IMPLEMENTATION=0x443e7c09ffda6b7cf5fe88fb18eb0a78d285db8ef8277c3918326d476c73efa

starknet invoke \
   --gateway_url https://alpha4.starknet.io \
   --address $ACCOUNT_ADDRESS \
   --function upgrade \
   --inputs $NEW_IMPLEMENTATION \
   --abi contracts/argentaccount_abi.json \
   --max_fee 50000000000000

export HASH=<Set the Transaction Hash>
starknet get_transaction --hash $HASH
```

Once the implementation has switched back, you can check the implementation
is back to the one with the plugin:

```shell
starknet call --address $ACCOUNT_ADDRESS \
   --function get_implementation \
   --abi contracts/proxy_abi.json

# This now succeeds
starknet call --address $ACCOUNT_ADDRESS \
   --function is_plugin --inputs $PLUGIN_ADDRESS \
   --abi contracts/argentaccount_plugin_abi.json
```

> As you can see from that test, upgrading the contract does not reset the
> associated data.
