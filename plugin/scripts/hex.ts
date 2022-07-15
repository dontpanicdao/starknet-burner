import { toBN } from "starknet/utils/number";

const names = process.argv.slice(2);
if (names.length === 0) {
  console.log("Usage: npm run entrypoints -- hex1 [hex2 ...]");
  process.exit(1);
}

const string2hex = (str: string) => {
  let output = "";
  for (var i = 0; i < str.length; i++) {
    output += str[i].charCodeAt(0).toString(16);
  }
  return output;
};

names.forEach((hex) => {
  let hex64 = string2hex(hex);
  console.log("string: ", hex);
  console.log("hex:    ", `0x${hex64}`);
  console.log("matches:", toBN(`0x${hex64}`).toString(10));
  console.log(
    "---------------------------------------------------------------------------------------------"
  );
});
