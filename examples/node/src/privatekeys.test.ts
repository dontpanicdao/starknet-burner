import { expect, describe, it } from "vitest";
import { ec } from "starknet3";
import { toBN } from "starknet3/utils/number";
import { Provider as Provider4, Call as Call4 } from "starknet4";
import { Provider as Provider3, Call as Call3 } from "starknet3";

describe("playing with keys", () => {
  it("check private key matches", async () => {
    const pkBn = toBN(
      "0x0000000000000000000000000000000000000000000000000000000000000001"
    );
    const keypair = ec.getKeyPair(pkBn);
    const pkAgain = keypair.getPrivate().toString();
    // console.log(pkAgain) // returns 1
    expect(pkBn.toString()).toBe(pkAgain);
  });
});
