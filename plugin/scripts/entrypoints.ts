import { getSelectorFromName } from "starknet/utils/hash";
import { toBN } from "starknet/utils/number";

const names = process.argv.slice(2);
if (names.length === 0) {
  console.log("Usage: npm run entrypoints -- selector1 [selector2 ...]");
  process.exit(1);
}

names.forEach((name) => {
  console.log("entrypoint:   ", name);
  let v = getSelectorFromName(name);
  console.log("entrypoint#16:", v);
  console.log("entrypoint#10:", toBN(v).toString(10));
  console.log(
    "---------------------------------------------------------------------------------------------"
  );
});
