import { toBN } from "starknet/utils/number";

const names = process.argv.slice(2);
if (names.length === 0) {
  console.log("Usage: npm run entrypoints -- hex1 [hex2 ...]");
  process.exit(1);
}

names.forEach((hex) => {
  console.log("hex:    ", hex);
  console.log("matches:", toBN(hex).toString(10));
  console.log(
    "---------------------------------------------------------------------------------------------"
  );
});
