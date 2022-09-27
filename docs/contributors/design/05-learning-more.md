## To learn more...

First and foremost, it is important to understand Abstract Account in order to
develop a signer. The following links are must read in order to fully
understand what we are talking about:

- [StarkNet Account Abstraction Model - Part 1](https://community.starknet.io/t/starknet-account-abstraction-model-part-1/781).
  In particular, this article explains how the validation will be handled by the
  wallet with the validation logic.
- [StarkNet Account Abstraction Model - Part 2](https://community.starknet.io/t/starknet-account-abstraction-model-part-2/839).
  In particular, this article explains how the `paymentAccount` will be handled
  by the wallet and the validation logic.
- [Management of reverted transactions in StarkNet](https://community.starknet.io/t/management-of-reverted-transactions-in-starknet/136)
  explains the issue as well as some potential fix to avoid DDoS attacks on
  Starknet and some potential ways to deal with it with fees.
In addition, we would also need to read the following documentations:
- [Signing transactions and off-chain messages](https://github.com/argentlabs/argent-x/discussions/14)
   and its [associated article on Shamans](https://community.starknet.io/t/signing-transactions-and-off-chain-messages/66/3)

To go deeper on the subject, you might also want to read the following documents
extracted from Ethereum:

- [EIP-4337 Account Abstraction via Entry Point Contract specification](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-4337.md)
- [EIP-4337 Discourse](https://ethereum-magicians.org/t/erc-4337-account-abstraction-via-entry-point-contract-specification/7160)
- [EIP-712 Ethereum typed structured data hashing and signing](https://eips.ethereum.org/EIPS/eip-712)
- [EIP-712 Discourse](https://ethereum-magicians.org/t/eip-712-eth-signtypeddata-as-a-standard-for-machine-verifiable-and-human-readable-typed-data-signing/397)

Obviously, none of these documentations are very useful without the code. You
will want to check the following code:

- [The code for the tests of Argent-X plugin](https://github.com/argentlabs/argent-contracts-starknet/blob/explore/plugins/test/plugin_session.py)
- [the explore/plugins branch](https://github.com/argentlabs/argent-contracts-starknet/tree/explore/plugins)
- [the OpenZeppelin Account documentation](https://github.com/OpenZeppelin/cairo-contracts/blob/main/docs/Account.md)
- [The EIP-712 like code to verify the token](https://github.com/argentlabs/argent-contracts-starknet/blob/develop/contracts/test/StructHash.cairo)
- [A token gated account](https://github.com/udayj/token_gated_account)

## To learn more about security and payment systems

- [Integration security guide](https://stripe.com/docs/security/guide)
- [web3auth documentation](https://docs.tor.us/key-infrastructure/technical-architecture)
- [1password](https://1password.com/)

## blogs and conversations

- [Way to encrypt/decrypt data with Google-managed secrets?](https://stackoverflow.com/questions/41939884/server-side-google-sign-in-way-to-encrypt-decrypt-data-with-google-managed-secr)
- [How can you encrypt users' data server-side without ruining the experience?](https://stackoverflow.com/questions/3339814/how-can-you-encrypt-users-data-server-side-without-ruining-the-experience?rq=1
)
- [Storing Keys in the Secure Enclave](https://developer.apple.com/documentation/security/certificate_key_and_trust_services/keys/storing_keys_in_the_secure_enclave)
- [iOS Keychain: using Secure Enclave-stored keys](https://medium.com/@alx.gridnev/ios-keychain-using-secure-enclave-stored-keys-8f7c81227f4)
- Checkout [Web3Auth/sign-in-with-starkware](https://github.com/Web3Auth/sign-in-with-starkware)
  to see if that can somehow be leverage
- Checkout [abdelhamidbakhta/starkvest](https://github.com/abdelhamidbakhta/starkvest)
  to see if it can make sense to use it for the project.
- Checkout [Random thoughts on Account Abstraction](https://hackmd.io/@s0lness/BJUb16Yo9)
  as another source of inspiration.
- Checkout [An implementation of sessionkey](https://github.com/rvorias/starkdew-valley)
  by the people at Briq.

## Abstract Account and Recurring Payment

  - [Account Abstraction (EIP-2938)]
- [EIP-4337 Account Abstraction](https://eips.ethereum.org/EIPS/eip-4337)
- https://medium.com/infinitism/erc-4337-account-abstraction-without-ethereum-protocol-changes-d75c9d94dc4a
- [Account Abstraction on EthHub](https://docs.ethhub.io/ethereum-roadmap/ethereum-2.0/account-abstraction/)
- https://github.com/proofofsoulprotocol/smart-contract-wallet-4337
- https://github.com/eth-infinitism/account-abstraction/pull/96/files
- https://blog.questbook.xyz/posts/gasless-smart-contract-wallet-implementation/
- https://eip4337.com/en/latest/
- https://mirror.xyz/plusminushalf.eth/MIThq8Ford5O3b0hDA4LR_tsRteDfazRfpVQXOR3Euk
- https://nethermind.io/account-abstraction/
- https://devpost.com/software/social-recovery-account-abstraction
- https://github.com/ethereum/EIPs/blob/master/EIPS/eip-4337.md
  
## Smart contract wallet and Multi-Sig

- https://authereum.com/welcome/
- (https://www.stackup.sh/)
- Argent

- (https://docs.gnosis-safe.io/)
- https://multis.co/
- https://linen.app/assets/best-multisig-wallet-for-ethereum-polygon/
- https://zengo.com/
- 