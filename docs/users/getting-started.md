The @starknet/burner manages keys that have been granted an access offchain by
your account and wallet. Opposite to wallets like `braavos` or `argent-x`, the
burner needs to be installed and probably also configured. This document
explains how to start with the burner with your application.

## Installing @starknet/burner

The first step consists in deciding how to install the wallet. Usually, you
would use a package manager like `npm` or `yarn` or you would install the
@starknet/burner from a CDN. The sections below explains those configurations.

### With a package manager

@starknet/burner is available as a package on npmjs.com. You should be able
to install it with a simple command the one below:

```shell
npm install --save-dev @starknet/burner
```

The package would install different versions, with a browser as a target. It
concludes Universal Module Definition (UMD) and ES6

### With unpkg.com, i.e. a CDN

@starknet/burner is also available on cloudflare CDNs with unpkg.com. To use
it, you can simply import the script with it with a `script` tag. Once done,
the script exports should be accessible from `starknetburner` and
`window.starknetburner`. The html file below shows how to install the script.
`<div id="starknetburner">` is used as an anchor for the burner. The components
will be attached to it. You should run `keyManager()` at the end of the file
so that the `div` with id `starknetburner` is available when starting the
burner:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <script
      type="text/javascript"
      src="https://unpkg.com/@starknet/burner"
    ></script>
  </head>
  <body>
    <div id="starknetburner"></div>
    <h1>hello</h1>
    <script type="text/javascript">
      const { keyManager } = starknetburner;
      keyManager();
    </script>
  </body>
</html>
```

Once done, you should be able to access it from the console with the command
below:

```javascript
const burner = window['starknet-burner'];
burner.enable();
```

### From a Bookmarklet

Bookmarklets run javascript from the your browser menus. To install one, create
a bookmark and copy/paste the content of the script below instead of the URL:

```javascript
javascript:(function(){document.body.appendChild(document.createElement('script')).src='https://unpkg.com/@starknet/burner';document.body.appendChild(document.createElement('div')).setAttribute('id','starknetburner');setTimeout(()=>{window.starknetburner.keyManager();console.log('inject starknet-burner in the browser window...')},2000)})();
```

> Note: If the website implements
> [Content Security Policy (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
> as it should, you won't be able to inject the burner and you will have to do
> a proper configuration. You can check it the case by looking at your console.
> However, in many cases, the bookmarklet is a way to demonstrate the burner
> without changing any code at all. 

Once you have, installed the burner, call it from the console by running:

```javascript
const burner = window['starknet-burner'];
burner.enable();
```

### An example

## Opening the Burner Modal Window

## Interacting with a contract with the provider

## Executing Transaction

## Resetting the sessionKey


