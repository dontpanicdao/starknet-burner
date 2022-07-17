import { toBN } from "starknet/utils/number";

const names = process.argv.slice(2);
if (names.length === 0) {
  console.log("Usage: npm run int2hex -- int1 [int2 ...]");
  process.exit(1);
}

names.forEach((int) => {
  console.log("int: ", int);
  let hex64 = toBN(int, 10).toString(16)
  console.log("hex:    ", `0x${hex64}`);
  console.log("matches:", toBN(`0x${hex64}`).toString(10));
  console.log(
    "---------------------------------------------------------------------------------------------"
  );
});
