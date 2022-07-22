## burner wallet and security

Security is by far the biggest challenge of the burner wallet. As a rule of
thumb, always consider that solution **NOT** secure at all and audit it. In
addition, you should: 

- limit the access to one contract only and probably also reduce the surface of
  that contract by splitting it from whatever else.
- make sure the user is aware of the risks of using the wallet and rely on an
  account that does not hold valuable assets.
- implement the wallet in conjunction with another signer that would provide
  some fraud detection system. That external signer could be used as a circuit
  switch to block requests coming from the session key of the user if it had
  been compromised. It could also be used as a 2FA provider for instance.
- be extra-careful with the use case you are implementing. It is definitely a
  great tool to develop a demonstration on the testnet. It is very usable if
  you need to develop a mobile dapp on goerli. This is simply not a tool to use
  with a DeFi Dapp on mainnet. Or at least, think it twice.

## To learn more about security and payment systems

- [Integration security guide](https://stripe.com/docs/security/guide)