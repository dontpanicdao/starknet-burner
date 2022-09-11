# An example of session key with Node

This project include a number of examples to use session keys from Node. The
way it works is the following:

1. We use 0x1 as a private key. Looking for a mnemonic? it is the number right
  after 0... of if you prefer the 1st column for an array in LUA.

2. You must have an account with:
  - The session key plugin installed and enabled
  - Some ETH on Goerli

3. Click on the "Sign" button next to the "NodeJS" logo. It should request you
   sign the session token. It will display a JSON file that you should copy

4. Copy the content of the JSON file in the `signedSession` and
   `accountAddress` of the `src/run-transaction.test.ts` file of that demo. It
   is the trickiest par of that demo and we should have make that part easier.
   We do not have any excuse, we are just lazy!

5. Run the following script

```shell
npm install
npm run test -- run-transaction
```

It should return a transaction HASH that you can check. I guess here again, we
should provide a script to do the screening for but, remember, we are lazy... You
can probably add a PR here, btw...

8. Make sure the transaction did succeed. There are several ways to do that. The
   no brainer way is to go for a 15min walk and search for it in
   [goerli.voyager.online](https://goerli.voyager.online/). Another way would be
   to have the CLI installed and run a command like the one below:

```shell
export STARKNET_WALLET=starkware.starknet.wallets.open_zeppelin.OpenZeppelinAccount
export STARKNET_NETWORK=alpha-goerli
# Replace the hash below with the Hash you got from step 7.
export HASH=0x21a4...a66e
starknet get_transaction --hash $HASH
```

> If you want to understand what is happeing at the protocol level, you might
> want to install mitmproxy and start it as a reverse proxy on goerli with
> `mitmweb --mode reverse:https://alpha4.starknet.io`. We have left some
> comments in the `run-transaction.test.ts` file to help you going through it
> and capturing the various payloads.

If you like that demo, well..., you should thank the argent-X team at argentlabs
and Starkware for making it possible. We ❤ them! You might also want to star the
[@starknet/burner](https://github.com/dontpanicdao/starknet-burner) project 🤣.
