## To learn more...

First and foremost, it is important to understand Abstract Account in order to
develop a wallet. The following links are must read in order to fully
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
