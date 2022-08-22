## Running the extension locally

There are 2 things to known when you run the extension locally:

- when running the extension with `npm run dev` the iframe opens on
  [localhost:3000](http://localhost:3000), so assuming keyring has been started
  already on localhost:3000 the extension will use that version
- there is a simple demo page when you run the extension locally. As a result,
  when you use it, you will see a button that is not part of the extension.

As a result, to run the extension locally, you need to open 2 terminal
sessions:

- open a terminal session in `burner/keyring` and run the command below; make
  sure the server opens on port 3000. Otherwise, it might be that another
  application is running on your desktop on that port:

```shell
npm install
npm run dev
```

- open a terminal session in `burner/extension` and run the command below:

```shell
npm install
npm run dev
```

The 2nd session open a server on port 5173. To test the application, you can
open your browser on [localhost:5173](http://localhost:5173)

## Using Starkpilled with a local version of the Extension

Usually, you will want Starkpilled to work with the latest extension published
on [npmjs.com](https://npmjs.com/@starknet/burner). However, if you want
starkpilled to work with a local version of the extension, this is what you
need to do:

- open a terminal session in `burner/keyring` and run the command below; make
  sure the server opens on port 3000. Otherwise, it might be that another
  application is running on your desktop on that port:

```shell
npm install
npm run dev
```

- open a terminal session in `burner/extension` and build the extension en
  development mode so that it linked to the local keyring version. To do that,
  you should run the `dev:build` script like below:

```shell
npm install
npm run dev:build
```

- export the extension to the npm local packages by running, from the
  `burner/extension` directory again:

```shell
npm link
```

- the change the configuration of the starkpilled project to use the local
  extension by running the command below from `starkpilled`:

```shell
npm link @starknet/burner
```

The output of `npm list` should look like below:

```text
starkpilled@0.2.102 /starknet-burner/starkpilled
├── @starknet/burner@0.2.102 -> ./../burner/extension
```

To run starkpilled locally

```shell
npm install
npm run dev
```

Starkpilled should open on port :3001; you can open your browser on
[localhost:3001](http://localhost:3001) and test the application.

> Note: make sure you get back to the original configuration of starkpilled
> by running `npm unlink @starknet/burner` followed by `npm list` and if
> necessary by reinstalling the latest extension with
> `npm install --upgrade --save-dev @starknet/burner`.

## A simple test of the extension

To test the extension, tou can simply open the development tools in your
browser and iteract with the StarknetWindowObject. A good starting point
would be the [troubleshooting](../../users/troubleshooting.md) guide.

Below is a simple test you can run to check

```javascript
const burner = window["starknet-burner"];

burner.enable();

console.log(burner.isConnected);

const output = await burner.provider.callContract({
  contractAddress:
    "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
  entrypoint: "balanceOf",
  calldata: [
    "0x0207aCC15dc241e7d167E67e30E769719A727d3E0fa47f9E187707289885Dfde",
  ],
});

console.log(output);
```

The output should be an array with 2 strings in it representing Felts in
hexadecimals.
