## configure python and dependencies

starknet-compile contracts/ArgentAccount.cairo --output ../contracts/argentaccount.json --abi ../contracts/argentaccount_abi.json --account_contract

```shell
cd plugin/py
python3 -m py .
. ./bin/activate
pip install -r requirements.txt
starknet --version
```

## Regenerate argent-x contracts

Contract code depends on a few things that might change over time. However, for now at least,
you should regenerate the contract code by running:

```shell
cd plugin/argent-contracts-starknet
starknet-compile --account_contract \
   --output ../contracts/argentaccount.json \
   --abi ../contracts/argentaccount_abi.json \
   contracts/ArgentAccount.cairo
```

## The coming PR should change to the current flow

New things are to be done to transform the current calls into a session key
flow. These things are to be changed on 3 levels:
- on the contract itself. It should be changed to support the plugin and
  configured with the sessionkey plugin
- on the setup. A session key token should be requested and send back to the
  user.
- on the invoke since it must be slightly different so that the verification
  check the session key signature instead of the original signer signature.

> Argent provides a contract that implements the plugin and as a result, we can
> just use it. It is in the
> [explore/plugins](https://github.com/argentlabs/argent-contracts-starknet/tree/explore/plugins)
> branch of the `argentlabs/argent-contracts-starknet` repository at least for now.

### Change on the contract

That is the list of changes to perform on the contract:

- the contract must be updated with a version that supports the plugin
- we need to deploy the session key plugin in the chain, i.e a separate
  contract
- we need to reference the plugin from the contract so that it would delegate
  the call to the plugin.

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
