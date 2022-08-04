const sliceAddress = (address = "0xdeadbeef") =>
  `${address.slice(0, 5)}...${address.slice(-4)}`;

export { sliceAddress };
