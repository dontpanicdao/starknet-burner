## Testing the extension

```javascript
const a = window['burner-request']
a.callContract({
  contractAddress: "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
  entrypoint: "balanceOf",
  calldata: ["0x0207aCC15dc241e7d167E67e30E769719A727d3E0fa47f9E187707289885Dfde"],
})
```

