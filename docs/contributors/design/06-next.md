The Starknet burner helps builders to build dapps on mobile applications
without having to deal with all the abstract account interactions.

## Next Release

The next release is mostly a maintenance release...

### Milestone v0.4.0 (TBD)

This release is a maintenance release that is targeted to fix bugs and improve
the integration experience. It cleans up the code to prepare for the next stages.

It implements:
- support for typescript in the npm package
- support for commonjs and es6 in the npm package
- availability of @starknet/burner on a CDN via unpkg.com
- move the account/provider back to starknet-js 3.x to support starknet-react
- addition of the logo in .png and .svg
- chaneg for friendly id and name
- restructuration of the code to support multiple version of starknet-js
- removal of the nextjs api to support static deployment in addition to Vercel
- the ability to test all the components locally
- jest tests on extension and keyring
- playwright tests on extension and keyring
- an example with a static file and the CDN/unpkg package
- an example with the @starknet/burner package from npmjs.com
- an example with @starknet/burner and get-starknet
- an example with @starknet/burner and @starknet-react/core

It fixes:
- event leaks between waitForMessages()
- promises that were never fullfilled

## Content (sofar...)

### Milestone v0.3.0 - 🐾 it works!

The project is now a working extension that relies on Argent-X plugins to
pre-authorize a limited access to an account. It includes:

- the extension available from npmjs as @starknet/burner
- a tool called drone to generate session token with Argent-X and also to
  upgrade the account and deploy a plugin
- a simple UI embedded in the extension and running in an iFrame supported
  by a third-party website
- a demo application named starkpilled

### Milestone v0.2.0 - 🐈‍⬛ not yet a tiger

This release was the first real release after the hackathon. It was a
usable proof of concept.

## What to do next?

There is a number of things we still need to add to the project to make it
better:

1. better documentation and diagnostic tools. In particular, there should
   be examples of use with `vanilla` javacript, typescript, `get-starknet`
   and `starknet-react`. (target: v0.4.0)
2. The extension should check the validity of the account, including the
   signer public key and the validity of the token (target: v0.4.0)
3. proper deployment management so that the extension/keyring remain in
   sync and we do not break things with upgrade (target: v0.5.0)
4. the implementation of several interfaces (i.e. starknet-js 3.x and 4.x)
   in the extension and relying on the latest package, i.e. starknet-js 4.x
   in the keyring (target: v0.5.0)
5. an extensible drone. For now, only one plugin is supported we should
   generate plugins specifics to dapps (target: v0.6.0)
6. a social backed wallet that would rely on the OZ account and provide the
   extensibility of the burner out of the box (target: v0.7.0)

## Expected technical evolution

A number of evolutions are planned or proposed that might impact the project.
Below is a list of identified evolutions and technical work that we could rely
on.

### Validate and execute separation

Starknet 0.10 that is due in early September and should split the execution of
a transaction in 2 parts. The validation of the signature, the nonce and fees
should be removed from the execute and be managed by a function called
`validate`. This feature might not full impact the project, except that the
validation plugin would also have to be updated in the contract definition.

You will find more details about v0.10.0
[here](https://starkware.notion.site/StarkNet-0-10-0-4ac978234c384a30a195ce4070461257)

### Payment delegation

Once the previous change is done, the roadmap would also include the
ability to delegate paiements to a `PaymentContract`. A third party contract
would be able to pay the fees for your transactions based on a previous
commitment. This could be a security improvement for the plugin that could
only access funds from that `PaymentContract`.

### A more advanced plugin

There are a few ideas that we could implement to make the plugin more
advanced. In particular:

- limiting the plugin to interact with only one contract is a must. This is
  an hard requirement to make the solution usable in games or other
  applications.
- there is an open question about how we could limit the cost managed by the
  plugin. Can we embed something on the PaymentContract to track the actual
  signer? Could we have several Nonce (i.e. 1 per signer), etc
- there is an interesting branch in called
  [explore/pluginsv2](https://github.com/CremaFR/argent-contracts-starknet/tree/explore/pluginsv2)
  that should be reviewed to get some additional ideas of what could be done.
  There is also another plugin called `ArgentSecurity.cairo` with the current
  `explore/plugins` branch.

### More secure signing on mobiles

We can find some work here and there to support hashing/signing with other
schemes than [sn_keccak and pederson](https://docs.starknet.io/docs/Hashing/hash-functions/).

For instance, you can find these resources:

- [A cairo implementation of NIST P-256, aka secp256r1](https://github.com/spartucus/nistp256-cairo)
- [Cairo examples, including Ethereum secp256k1](https://github.com/starkware-libs/cairo-examples/tree/master/secp)
- [A set of contracts that embed secp256r1 signature](https://github.com/cartridge-gg/contracts)
- [Sign In With Starkware and Web3Auth](https://github.com/Web3Auth/sign-in-with-starkware)
- [Integrate Web3Auth with the StarkNet Blockchain](https://web3auth.io/docs/connect-blockchain/starknet)
- [StarkEx Playground for Web3Auth](https://github.com/Web3Auth/web3auth-starkex-playground)
- 
### Even more resources

Then there are a number of additional features that we could target. The list
below is provided without any specific order or priority:

- Building demos to help people boostrap their projects with major frameworks
- Providing both a 3.x and 4.x compliant interface for starknet-js.
- Providing an RPC and Gateway compliant interfaces for starknet-js in the
  component
- Enrich the interface to make the burner report data like, an history of the
  transactions with the associated fees and execution statistics.
- Enrich the interface to make the burner perform more actions, like minting
  token or claiming a reward.
- Unit test, e2e test and mock the extension and keyring
- Generate the reference documentation fron the code.
- Add some additional configuration parameters, like sign/autosign feature
  so that the user does not even see he is minting tokens.
- Provide an interface so that use can sign the sessionkey without actually
  opening the modal.
- Add the version as part of the deployment of keyring
- make the burner work with nodejs, i.e. on a server
- Have `drone` hosted or running on-demand to make it easier to use with
  hackathons. The project would "just implement the burner side" not the
  validation side to begin.
- Check if we can install the wallet as a first party app so that we can
  store data in the localstore rather than in the sessionstore.
- Provide the wallet as a local deployment to use with the devnet
- Manage multiple accounts/sessionkeys in the same wallet so that we can
  interact with different dapps from the same wallet.
- Add extra filtering feature on an account to prevent the user from accessing
  dangerous resources via a 2nd signer.
- Setting up the same feature with other accounts, including OpenZeppelin, Braavos
  and Metamask.
- Integrate an Indexer to check the assets minted, transferred and burned with
  the Starknet Burner.
- Improve the interaction to refresh the components automatically.
- Improve the way we can get a session token. That would mean providing various
  ways to exchanges between the mobile and the application. It
  could be:
  - we send an SMS with a key;
  - we scan a QR code from the session public key;
  - we use some pre-signed printed QR code;
  - we use the NFC tokens and a phone;
  - ... other ideas are welcome... open an issue if you have any.
- It can be used to automate tests on the Goerli network without risking to
  loose the funds by requesting a token based on an NFT or something else.
- Start some additional experimentations including: (1) creating the burner as
  a service worker; (2) creating the burner as a node worker

### Additions to OpenZeppelin account

There are also a number of additions to the OpenZeppelin account that could be
of some use. In particular, it supports a ETH signature as you can see from PR
[#361](https://github.com/OpenZeppelin/cairo-contracts/pull/361). It might rely
on [the secp implementations](https://community.starknet.io/t/is-it-possible-to-use-verify-ecdsa-signature-in-cairo-to-verify-a-web3-js-wallet-ecdsa-signature/338).

To check the changes associated with OpenZeppelin, we should review:
[release notes](https://github.com/OpenZeppelin/cairo-contracts/releases)
