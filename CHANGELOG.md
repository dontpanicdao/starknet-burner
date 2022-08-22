## CHANGELOG

### v0.3.0 - 🐾 it works! - 2022-08-31

This release implements the session key pattern on an upgraded argent-x
accounr. the new release implements:

- a full rewrite of `extension` and `keyring`; the former in vanilla typescript
  and the later with nextjs as well as a messaging system for the 2 to interact
  together.
- the deletion of the hackathon version.
- a fully functional sessionkey stored in the browser session store.
- a third-party iframe to serve the starknet burner.
- a Starknet signer, provider and account exposed in the extension.
- the starknet.js 4+ interfaces in the extension.
- an object compatible with `get-starknet` injected in 
  `window['starknet-burner]` 
- an automatic publication of the session token from `drone` as well as the
  automatic download from `keyring`.
- a demo application, starkpilled that rely on the extension. It can be
  installed as a PWA on Android and iPhone.
- the copy/paste of the address from the iframe.
- the removal of all references to wallet and replacement with key manager.
- a version label injected in every one of the projects.
- an automatic deployment of all the components, including: the extension
  available in npmjs as @starknet/burner; starkpilled and keyring in vercel.
- technical tools to help debug the project and perform technical operations
- a better user and a contributor documentation.

### v0.2.0 - 🐈‍⬛ not yet a tiger...  - 2022-07-16

This release works and implement the session key pattern. It can now be used as
a basis for bigger projects. It includes:
- a plugin class that can check against a signature that is EIP-712 adapted to
  Starknet
- an upgrade to the argent-x account (as part of a branch to
  [gregoryguillou:bugfix/session-key](https://github.com/gregoryguillou/argent-contracts-starknet/tree/bugfix/session-key)
  that supports plugins
- a EIP-712 like signature schema in a plugin provided in the project
- a working implementation of the starknet burner including the following
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
