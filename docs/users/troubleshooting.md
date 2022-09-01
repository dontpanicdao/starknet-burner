This document provides a set of hints to troubleshoot the starknet burner
configuration. You will find answers to the following questions:

- How to check the burner is installed?
- How to connect to the wallet?
- How to force the deletion of the sessionkey?
- How to open and close the key manager?
- How to setup the debugging mode?
- How to exchange messages between the extension and keyring?
- How to connect/disconnect without opening the window?

Do not hesitate to ask additional questions if needed.

## How to check the burner is installed?

The burner should be installed with the application. Usually the way to do that
consists in installing the library and running the register() script.
Once done, you should be able to check it is correctly installed by running the
following commands from your browser console...

```javascript
// the API to the burner is registered in the `window` and named 
// `starknet-burner`. Use the command below from your browser devtools to check
// it is installed correctly
const burner=window['starknet-burner'];

// to check the content of the StarknetWindowObject associated with the burner
// you can simply run:
console.log(burner);
// or to check it is connected, run
console.log(burner.isConnected);
```

## How to connect to the burner?

To connect to the burner, what you need to do is simply run the command below:

```javascript
await burner.enable();
```

If you are already connected, the enable will connect without opening
the window. To force the opening, run:

```javascript
await burner.enable({showModal: true});
```


## How to force the deletion of the sessionkey?

If you plan to delete the session key, you can do it directly from the
`request` function like below:

```javascript
await burner.request({type: "keyring_ResetSessionKey"})
```

## How to open and close the key manager?

To open of the key manager in your browser whether you are connected or not,
run: 

```javascript
await burner.request({type: "keyring_OpenModal"});
```

Once the window is opened, you should be able to close it with the command
below:

```javascript
await burner.request({type: "keyring_CloseModal"});
```

## How to setup the debugging mode?

the burner provides facilities to track what is happening between the extension
that is running in the application and keyring that is a NextJS application
running inside an iframe. To trigger the debugging, you can simply run the
command below:

```javascript
await burner.request({type: "keyring_SetDebug"});
```

If, at some point, you want to disable the debugging, execute:

```javascript
await burner.request({type: "keyring_ClearDebug"});
```

## How to exchange messages between the extension and keyring?

Starknet burner provides a simple tool to make a handcheck between the
extension and the keyring. To use that tool, run:

```javascript
burner.request({type: "keyring_Ping"});
```

Assuming you have setup the debug mode, you should be able to view the
messages moving to keyring and back to the extension.

## How to connect/disconnect without opening the window?

Starknet burner also provides a way to try to connect without opening
the window. To try to connect, run:

```javascript
await burner.request({type: "keyring_CheckStatus"})
```

To disconnect, without erasing the key, run:

```javascript
await burner.request({type: "keyring_Disconnect"})
```

## Where to get more help?

To get help, you should connect to the Starknet Discord and post on the
`#  | starknet-burner` channel or open an issue on
[dontpanicdao/starknet-burner](https://github.com/dontpanicdao/starknet-burner/issues).
