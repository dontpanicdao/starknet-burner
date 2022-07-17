## Starkpill Faucet

The Starkpill Faucet is a contract that you can request to get starkpills
(STRK). The way it works it the following:

- the account you are using should not have more than 1 STRK already
- the account implementation should be the modified starknet account
  that supports plugins

Assuming all the condition above are met, you would get 5 Starkpills to play.

> For security reason, the Starkpill Faucet supply is limited. If it gets
> empty, contact-us.

The Faucet is available on voyager at
[0x05a8..aadf](https://goerli.voyager.online/contract/0x05a87f6bec0b6121e55f291f8e06e6149accd706fb43c725a7f1fd3f3f62aadf).

To withdraw some Starkpills, you can use the following command, assuming you
have change the content of
`~/.starknet_accounts/starknet_open_zeppelin_accounts.json` to match the
private and public of the signer and address of your account:

```shell
export STARKNET_WALLET=starkware.starknet.wallets.open_zeppelin.OpenZeppelinAccount
export STARKNET_NETWORK=alpha-goerli

export CONTRACT=0x05a87f6bec0b6121e55f291f8e06e6149accd706fb43c725a7f1fd3f3f62aadf

starknet invoke --address $CONTRACT \
  --abi ../../faucet/contracts/faucet_abi.json \
  --function withdraw
```

> Note: You should be able to run the withdraw function directly from voyager.
