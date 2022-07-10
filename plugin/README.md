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
