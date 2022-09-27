## Accounts

This directory contains a number of **experimental** accounts and links related
to them. In particular, you will find:

- A link to the OZ v0.3.2 preset account you might not want to use
- A link to the OZ v0.4.0b preset account you might not want to use
- A link to the Argent-X session key plugin you might not want to use
- The implementation of the `YeaSayer` plugin that always agree on the
  transactions
- A simple OZ ERC-20 preset account that you probably can use
- A very basic counter account for demonstration purposes

## Building Accounts and Contracts

Since those contracts are being improved, we did not want to include them in
this repository but link them. To help you, we provide a `Makefile` that
shows how to build those contracts. You should:

- install cairo v0.9 with Python 3.9 and run the following commands

```shell
make
make contracts-v0
```

- install cairo v0.10 with Python 3.9 and run the following commands

```shell
make
make contracts-v1
make argent
```

> Explaination:
> Starknet v0.9 and v.10 contract bytecodes should be compatible. However, the
> v0 transaction implementations of protocol tend to be developed with Cairo
> v0.9 when v1 transaction implementations of protocol tend to be developed
> with Cairo v0.10. That is why we need the 2 versions for now. 

## Testing Accounts and Contracts

> Note 1: Tests are usually run on the devnet. for now at least we need to run 
> from the `master` branch of devnet project or from the `@next` of the devnet
> container image. Older version up to 0.3.1 included are not compatible with
> the RPC implementation we are using.

> Note 2: RPC v0.1 is not supposed to work with v1 of transactions and v0.2 is
> not yet implemented neither by Pathfinder neither by Devnet. As a result, we 
> did not upgrade to the new implementations yet. We will do the change when
> we have implementations that are good enough on the 2 fronts!

This directory includes a number of tests to the used on devnet. You should be
able to:

- declare the YeaSayer plugin
- deploy the OZ plugin-modified account
- charge the account with some ETH
- deploy a counter contract
- execute a transaction with the counter

### declare the YeaSayer plugin

```shell
go test -v -run TestYeaSayer_RegisterClass
```

### deploy the OZ plugin-modified account

> Note: the private key is currently hardcoded in the example.

```shell
go test -v -run TestYeaSayer_DeployAccount
```

### charge the account with some ETH

The 2 commands below provide ETH to the account and check how much have been
provided:

```shell
go test -v -run TestYeaSayer_MintEth
go test -v -run TestYeaSayer_CheckEth
```

### deploy a counter contract

```shell
go test -v -run TestCounter_DeployContract
```

### execute a transaction with the counter

```shell
go test -v -run TestCounter_ExecuteIncrementWithPlugin
```
