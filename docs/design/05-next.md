The Starknet Burner helps builders to build dapps on mobile applications during
hackathons without having to deal with all the abstract account interactions.

## Content (Sofar...)

The project contains a set of hardcoded methods that allow to
transfer an ERC20 named Stark Pills from the mobile application.

## Milestone v0.1.0

For now the project contains a simple component that demonstrates
is is actually possible to transfer Stark Pills from the mobile

## What to do next?

There is a number of things we can added to the project to make it better:

1. relying on session key/token instead of just signature (target v0.2.0)
2. make the burner a library that can be embedded in other projects (target
   v0.3.0)
3. move back to an upgradable contract (target v0.4.0) as for now all the
   tests have been done with a regular contract.

Then there are a number of additional feature that we should target. The list
below is provided without any specific order:

- enrich the interface to make the wallet perform more actions, like minting
  token or claiming a reward.
- providing an interface that is close to the one from the other wallets so
  that we can use starknet.js or a subset of it
- addition a sign/autosign feature so that the user does not even see he is
  minting tokens.
- Building demos to help people boostrap their projects.
- Have `drone` hosted or running on-demand to make it easier to use with
  hackathons. The project would "just implement the burner side" not the
  validation side to begin.
- Setting up the same feature with other accounts, including OpenZeppelin, Braavos
  and Metamask.
- Integrate an Indexer to check the assets minted, transferred and burned with the
  Starknet Burner.
- Improve the interaction to refresh the components automatically.
- Provide various ways to exchanges between the mobile and the application. It
  could be 
  - we send an SMS with a key;
  - we scan a QR code from the session public key;
  - we use some pre-signed printed QR code;
  - we use the NFC tokens and a phone;
  - ... other ideas are welcome... open an issue if you have any.
- It can be used to automate tests on the Goerli network without risking to
  loose the funds by requesting a token based on an NFT or something else.

## Expected technical evolution

A number of evolutions are planned or proposed that might impact the project.
Below is a list of identified evolutions and technical work that we could rely
on.

### validate and execute separation

Starknet 0.10 that is due in a few weeks and should split the execution of a
transaction in 2 parts. The validation of the signature, the nonce and fees
should be removed from the execute and be managed by a function called
`validate`. This feature might not full impact the project, except that the
validation plugin would also have to be updated in the contract definition.

### payment delegation

Once the previous change is done done, the roadmap would also include the
ability to delegate paiements to a `PaymentContract`. A third party contract
would be able to pay the fees for your transactions based on a previous
commitment. This could be a security improvement for the plugin that could
only access funds from that `PaymentContract`.

### More secure signing on mobiles

We can find some work here and there to support hashing/signing with other
schemes than [sn_keccak and pederson](https://docs.starknet.io/docs/Hashing/hash-functions/).

For instance, you can find these resources:
- [A cairo implementation of NIST P-256](https://github.com/spartucus/nistp256-cairo) 
- [Cairo examples](https://github.com/starkware-libs/cairo-examples/tree/master/secp)

This area has still to be research, both to change the validation scheme in Cairo and to
rely on the secure enclave, including with webauthn. the following documentations might
be interesting to read in detail:

- [Storing Keys in the Secure Enclave](https://developer.apple.com/documentation/security/certificate_key_and_trust_services/keys/storing_keys_in_the_secure_enclave)
- [iOS Keychain: using Secure Enclave-stored keys](https://medium.com/@alx.gridnev/ios-keychain-using-secure-enclave-stored-keys-8f7c81227f4)
