## CHANGELOG


### v0.2.0 - 🐈‍⬛ not yet a tiger...  - 2022-07-16

This release works and implement the session key pattern. It can now be used as
a basis for bigger projects. It includes:
- a plugin class that can check against a signature that is EIP-712 adapted to
  Starknet
- an upgrade to the argent-x account (as part of a branch to
  [gregoryguillou:bugfix/session-key](https://github.com/gregoryguillou/argent-contracts-starknet/tree/bugfix/session-key)
  that supports plugins
- a EIP-712 like signature schema in a plugin provided in the project
- a working implementation of the burner wallet including the following
  features:
  - to generate a session key
  - register a session token
  - send tokens
  - track transactions.
- a working implementation of drone that allows to sign a session token request
- A getting started documentation

### v0.1.0 - 🥚 the first release ever - 2022-07-12

For now on, this release is just a web/mobile wallet called the `burner` that
we can use to interact with starknet. This release includes:
- a number of design documents and references to understand how an account
  works
- a set of scripts and docs that explains how to install and configure the
  argent-x wallet manually
- the burner that can not be used as a plugin yet but supports:
  - changing the private key and account
  - refreshing the current amount of ETH and STRK on the account
  - allow to send STRK to another account
  - display the transactions and allow to refresh them
