# An example of session key with NodeJS

This project include a number of examples to use session keys from Node. The
way it works is the following:

1. We use 0x1 as a private key. Looking for a mnemonic? it is the number right
  after 0... of if you prefer the 1st column for an array in LUA.
2. You must have an account with:
  - The session key plugin installed and enabled
  - Some ETH on Goerli
3. You should start drone. To do that:
  - Fork [@starknet/burner](https://github.com/dontpanicdao/starknet-burner)
  - Star the project also otherwise it will not work (99% of the times)
  - Run a terminal from the `drone` directory of the project and run the
    command below:

```shell
npm install
npm run dev
```

> You will see an error because we mix `get-starknet` and `starknet-js` v4. It
> will be fixed in a few days I guess when `get-starknet` v2 gets out!

4. Open a 2nd terminal in the `examples/node` directory of the project and
   run:

```shell
npm install
npm run test -- request-token
```

This will give you an URL that should be like
[http://localhost:5174/?s=0x01ef15c18599971b7beced415a40f0c7deacfd9b0d1819e03d723d8bc943cfca](http://localhost:5174/?s=0x01ef15c18599971b7beced415a40f0c7deacfd9b0d1819e03d723d8bc943cfca). We are pretty
sure it will because we have hardcoded it!

5. Click on the "Sign" button next to the "NodeJS" logo. It should request you
   sign the session token. It will display a JSON file that you should copy

6. Copy the content of the JSON file in the `signedSession` and
   `accountAddress` of the `src/run-transaction.test.ts` file of that demo. It
   is the trickiest par of that demo and we should have make that part easier.
   We do not have any excuse, we are just lazy!

7. Run the following script

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

If you like that demo, well, you should thank the Argent-X team and Starkware for
making it possible. We ❤ them! You can also star the @starknet/burner project 🤣.
