# Burner

## Tools

This package includes a number of tools to help you interact with Starknet.
Among those tools is:

- `scripts/genkey.ts` is a tool to generate a new keypair for Starknet

```shell
npm install
npm run genkey
```

- Last, I have started a project that is inspired by Austin Griffith Burner Wallet. It would be a web/mobile wallet that would obviously be **way** less secure than Argent-X. It would rely on a session key and an Argent-X plugin so that the account would in fact be an Argent-X account. The idea would be to have the project as an opensource so that people can easily develop dapps that can work on a mobile, for instance during hackatons. I could later provide some nice feature like "autosign". It would be restricted by the plugin in time/contract calls. The project would be
- a front-end that people would run on their laptop to authorize the mobile session with their argent-X . It could have some added value like track assets collected with the burner wallet.
- the burner, i.e. a javascript-only wallet that could be available as a component to use in other projects

Do you think it would be useful to people ? If you think that can be of any value, I'll define a small project plan and would try to get to some sort of MVP by starknet.cc... What do you think of the idea ? If you like it, would you mind having it in your `dontpanicdao` organization on github ?