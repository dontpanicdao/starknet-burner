A Key Manager to interact with Starknet accounts. Starknet burner allows to
build mobile and web applications without any security compromise.

<!-- badges -->
<p align="center">
  <a href="https://starkware.co/">
    <img src="https://img.shields.io/badge/powered_by-StarkWare-navy">
  </a>
  <a href="https://github.com/dontpanicdao/starknet-burner/blob/main/LICENSE/">
    <img src="https://img.shields.io/badge/license-MIT-black">
  </a>
</p>

## Warning ** Experimental Project **

This project is in alpha release. It has a number of limitation that should be
lift progressively, including (1) the fact that it is limited to a simple
plugin for now and (2) it has not yet been audited.

## What is the Starknet Burner?

The `Starknet Burner` is a Key Manager, i.e. a library that you add to your
application and helps users to manage keys that are not their regular signing
keys. The way it works depends on the type of keys. For now, the burner manages
session keys, i.e. keys that work with an account that has a plugin setup and
have been authorized by the signer offline.

## Why use the Starknet Burner?

See the Starknet Burner as a way to create and some temporary/limited keys
that could be validated by your personal wallet like Argent-X for some specific
purposes. What could you do with it?

- You could use that key for a limited time to interact in an "auto-validating"
  scenario with a video game or some social engaging activities. This could
  only position at risk a small part of your assets.
- You could provide the key to a third party, including friends, relatives
  or managed services to use it with a for a very specific case.
- You could use it as part of a multi-party interaction with an service that
  could/would only approve a subset of conditions. For instance you could wire
  a monthly amount to a specific account
- You would use it to access an account managed by a third party for some
  specific operations. 

Ultimately, Starknet Burner is a project that would help people to experience
the power of Starknet with the ease of regular web and mobile applications.
Ideal to develop new experiences, the starknet burner has been built to improve
user experience and help developers to participate with hackathons.

To use the burner wallet, check the [Getting Started](./docs/getting-started.md) 
guide.

## Special Thanks

- [Austin Griffith](https://twitter.com/austingriffith) for the original
  [burner wallet](https://github.com/austintgriffith/burner-wallet), dozens of
  projects and the many people he has brought to Ethereum. If one day you read
  these lines, you are an inspiration for so many of us.
- [Argent](https://twitter.com/argentHQ) for the fantastic work they do daily
  to bring Argent-X to Starknet and work with Starkware and the community to
  build a better future.
- [@crema](https://twitter.com/crema_fr) and
  [@DrSpacemn](https://twitter.com/DrSpacemn) for helping starting the project
  and providing some support before and during the Hackathon
- [0xs34n](https://twitter.com/0xs34n) for starting
  [starknet.js](https://github.com/0xs34n/starknet.js) and
  [0xjanek](https://twitter.com/0xjanek) for maintening it as well a number of other javascript projects around Starknet.
