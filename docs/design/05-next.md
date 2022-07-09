The Starknet Burner helps builders to build dapps on mobile applications during
hackathons without having to deal with all the abstract account interactions.

## Project Content

The list below contains the first steps with the project. The goal is to build a
dapp that is a webapp for mobile. The first step consists in:

- [ ] Generate a private/public Key pair
- [ ] Deploy a argent-x account on Goerli
- [ ] Add Eth to the account
- [ ] Deploy a NFT contract on Goerli to Mint NFT
- [ ] Build a simple Javascript with Private key hardcoded
- [ ] Load the App on the mobile device
- [ ] Mint an NFT from the mobile device

## What to do next?

There is a number of things we can added to the project to make it better:

- Building the same component with ReactJS. We could start by simply wrapping
  the svelte component as [Rich Harris has done in its project](https://github.com/Rich-Harris/react-svelte).
- Building demos to help people boostrap their projects.
- Have the application run on-demand to make it even easier to use with hackatons
- Setting up the same feature with other accounts, including OpenZeppelin, Bravoos
  and Metamask.
- Integrate an Indexer to check the assets minted, transferred and burned with the
  Starknet Burner.
- Provide various ways to exchanges between the mobile and the application. It
  could be that (1) we send an SMS with a key; (2) we scan a QR code from the session
  public key, (3) that we use some pre-signed printed QR code or (4) that we use the
  NFC technology.
- It can be used to automate tests on the Goerli network without risking to
  loose the funds.

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
