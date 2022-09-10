export const hex2ascii = (v) => {
  if (!/^0x([0-9a-fA-F]{2})+$/.test(v)) {
    throw new Error("not an hex string");
  }
  let str = "";
  for (let i = 2; i < v.length; i += 2) {
    str += String.fromCharCode(parseInt(v.substr(i, 2), 16));
  }
  return str;
};
