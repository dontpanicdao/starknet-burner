## scripts

This directory contains a number of scripts to interact with Starknet:

- `entrypoint.ts` encodes an entrypoint name into a big number
- `genkey.ts` generates a new private/public key pair
- `token.ts` generates a token and its signature from a public key and a timestamp.

## entrypoint.ts

This script provides the encoded key for your function entrypoints. To use it,
run:

```shell
npm run entrypoint -- [entrypoint name]
```

## entrypoint.ts

This script provides the encoded key for your function entrypoints. To use it,
run:

```shell
npm run entrypoint -- [entrypoint name]
```

## token.ts

Assuming you have properly set the `SIGNER_PRIVATE_KEY` environment variable,
you can generate a token from the session key (i.e. the public key from the
web provider) and a timestamp.

```shell
npm run token -- [session key] [timestamp]
```

```shell
npm run token -- 0x1234567890123456789012345678901234567890  \
   $(( $(date +%s) + 24*3600 ))
```

