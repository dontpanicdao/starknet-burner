A Javascript wallet to interact with Starknet from mobile and web applications.

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

This project is still in development. It is not yet ready for use in production.

## What is Starknet Burner?

`Starknet Burner` is a wallet built to help users that needs to interact with
Starknet for a limited period of time and for a limited number of assets from
mobile and web applications. Ideal to work with blockchain games or social
activities, the burner has been built to improve user experience and also to
help developers to participate with Hackathons. The project includes:

- the `burner` is a javascript library that can easily be added to any web
  or mobile applications and provides a simple way to interact with Starknet;
- the `plugin` is an argent-x account extension; it is used by the `burner`
  to invoke commands;
- `drone` is a web3 application that works on a browser with the argent-x
  wallet. `drone` helps users to grant access to different `burner` wallets.
- `starkpiller` is a demo application that uses the `burner` to mint and burn
  Stark pills.

To use the burner wallet, check the
[Getting Started](./docs/getting-started.md) guide.

## Special thanks to

- [Austin Griffith](https://twitter.com/austingriffith) for the original
  [burner wallet](https://github.com/austintgriffith/burner-wallet), dozens of
  projects and the many people he has brought to Ethereum. If one day you read
  these lines, you are an inspiration for so many of us.
- [argent](https://twitter.com/argentHQ) for the fantastic work they do daily
  to bring Argent-X to starknet and work with Starkware and the community to
  build a better future.
- [@crema](https://twitter.com/crema_fr) and
  [@DrSpacemn](https://twitter.com/DrSpacemn) for helping starting the project
  and providing some support.
- [0xs34n](https://twitter.com/0xs34n) from 
  [aspect.co](https://twitter.com/aspectdotco) for building and maintaining
  [starknet-js](https://github.com/0xs34n/starknet.js).
