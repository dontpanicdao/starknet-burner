The Starknet burner helps builders to build dapps on mobile applications 
without having to deal with all the abstract account interactions.

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

1. proper deployment management so that the extension/keyring remain in
   sync and we do not break things with upgrade
2. better documentation and diagnostic tools. In particular, the extension
   should control the token and the account
3. an extensible drone. For now, only one plugin is supportedm we should
   generate plugins specifics to dapps
4. a social backed wallet that would rely on the OZ account and provide the
   extensibility of the burner out of the box (target v0.5.0)

## Expected technical evolution

A number of evolutions are planned or proposed that might impact the project.
Below is a list of identified evolutions and technical work that we could rely
on.

### Validate and execute separation

Starknet 0.10 that is due in August and should split the execution of a
transaction in 2 parts. The validation of the signature, the nonce and fees
should be removed from the execute and be managed by a function called
`validate`. This feature might not full impact the project, except that the
validation plugin would also have to be updated in the contract definition.

You will find more details about v0.10.0
[here](https://starkware.notion.site/StarkNet-0-10-0-4ac978234c384a30a195ce4070461257)

### Payment delegation

Once the previous change is done done, the roadmap would also include the
ability to delegate paiements to a `PaymentContract`. A third party contract
would be able to pay the fees for your transactions based on a previous
commitment. This could be a security improvement for the plugin that could
only access funds from that `PaymentContract`.

### Additions to OpenZeppelin account

There are also a number of additions to the OpenZeppelin account that could be
of some use. In particular, it supports a ETH signature as you can see from PR
[#361](https://github.com/OpenZeppelin/cairo-contracts/pull/361). It might rely
on [the secp implementations](https://community.starknet.io/t/is-it-possible-to-use-verify-ecdsa-signature-in-cairo-to-verify-a-web3-js-wallet-ecdsa-signature/338).

To check the changes associated with OpenZeppelin, we should review:
[release notes](https://github.com/OpenZeppelin/cairo-contracts/releases)

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

### Even more resources

Then there are a number of additional features that we could target. The list
below is provided without any specific order or priority:

- building demos to help people boostrap their projects with major frameworks
- enrich the interface to make the wallet perform more actions, like minting
  token or claiming a reward.
- addition a sign/autosign feature so that the user does not even see he is
  minting tokens.
- Have `drone` hosted or running on-demand to make it easier to use with
  hackathons. The project would "just implement the burner side" not the
  validation side to begin.
- Manage multiple accounts/sessionkeys in the same wallet so that we can
  interact with different dapps from the same wallet.
- Add extra filtering feature on an account to prevent the user from accessing
  dangerous resources via a 2nd signer.
- Setting up the same feature with other accounts, including OpenZeppelin, Braavos
  and Metamask.
- Integrate an Indexer to check the assets minted, transferred and burned with the
  Starknet Burner.
- Improve the interaction to refresh the components automatically.
- Provide various ways to exchanges between the mobile and the application. It
  could be:
  - we send an SMS with a key;
  - we scan a QR code from the session public key;
  - we use some pre-signed printed QR code;
  - we use the NFC tokens and a phone;
  - ... other ideas are welcome... open an issue if you have any.
- It can be used to automate tests on the Goerli network without risking to
  loose the funds by requesting a token based on an NFT or something else.
