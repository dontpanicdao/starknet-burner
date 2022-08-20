## Session Key Flow

Starknet Burner is a Javascript Wallet that relies on a Argent-X plugin to
provide seemless integration of your web and mobile application. Under the
hood, the plugin relies on a session key and session token to authenticate
user transaction. This section describes how it works.

The session key flow that is implemented as part of the burner is documented in
[Supporting On-chain Games](https://www.notion.so/argenthq/Argent-X-Supporting-On-chain-Games-1ec71fc2b6ad4fe19b8f22cc677838b9)
by Argent X.

Session keys do not require to store any data on chain. This contributes to
reduce the cost on Ethereum and helps to create some additional security
features. For instance, session key can limit the tokens or contracts involved.
They are always limited in time.

Compared to a wallet signer flow, the session key signer flow comes with few
notable additions that are described below. The flow involves the session key
signer, that is a web or mobile signer that running as part of an application
as well as an account signer is a signer for that account. The account signer
is usually owned by a wallet like Argent-X and potentially others.

> The session key signer uses the same signing scheme as any other signer. 

Before you can sign any transactions, an offchain process must be completed.
This process consists in:

- generating a session key in the application. It is worth noting that the
  session key is a private/public key pair and must be secured by any mean
  possible. It would be very important to not be able to guess the key,
  neither that it last too long, that it is stored in an unsafe place or
  shared with any third party. For instance, the session key should not be
  shared with the application server. It should not be stored in a global
  variable or made accessible via a function that can be accessed by a script
  from another site.
- once the session key is generated a session token should be generated. To
  generate token that token, a data set should be generated and hashed. The
  data set includes:
  - the session key public key,
  - the session key expiration time, and 
  - the session key authorizations, like the contract and token involved.

> For now, session key authorizations are not implemented which makes the
> session key not suitable for production use. This is a planned feature.

- the session token is generated off chain by signing the hash with the account
  signer. By doing it, the account signer delegates some abilities to the
  session key signer limited to the content of data set and the hash. The signing
  scheme relies on an EIP-712 like signature as you can read in the
  [learning more](./04-learning-more.md) section of the documentation.

> The account will enforce the check for the session key signer when checking
> the session token. It will be exchanged with Starknet and as a result, it
> will be available to third parties but it is not a concern since that is
> the session key that makes the session secured.

When calling running an invoke with an account to interact with a contract,
the session key signer requires you prefix the other calls with a special
invocation method that should include:
- the information saying it is a session key signer and the plugin identifier
  associated with tha feature
- the session key signer public key
- the data set that has been used to generate the session token, including the
  expires property
- the signed session token

The plugin then verifies the session token matches the authorization, key and
expiration and allows or block the other calls. The contract should implement
the logic in the `__execute__` method for now. It would implement the logic
in the `validate` method once starknet validation call is implemented.
