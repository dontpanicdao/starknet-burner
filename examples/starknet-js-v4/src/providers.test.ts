import { expect, describe, it } from "vitest";
import { Provider as Provider3, Call as Call3 } from "starknet3";
import { Provider as Provider4, Call as Call4 } from "starknet4";
import { diff } from "json-diff";

describe("evaluating differences between v3 and v4 providers", () => {
  it("getblock", async () => {
    const starknet3 = new Provider3();
    const block3 = await starknet3.getBlock();
    expect(block3.block_number).greaterThan(
      300000,
      "should be higher than 300000 on Goerli"
    );

    const starknet4 = new Provider4();
    const block4 = await starknet4.getBlock();
    expect(block4.block_number).greaterThan(
      300000,
      "should be higher than 300000 on Goerli"
    );
    console.log(JSON.stringify(block3, null, " "));
    console.log(JSON.stringify(block4, null, " "));
    // console.log(diff(block3, block4));
  });

  it("callContract", async () => {
    const starknet3 = new Provider3();
    const call3: Call3 = {
      contractAddress:
        "0x036486801b8f42e950824cba55b2df8cccb0af2497992f807a7e1d9abd2c6ba1",
      entrypoint: "counter",
      calldata: [],
    };
    const response3 = await starknet3.callContract(call3);
    const starknet4 = new Provider4();
    const call4: Call4 = {
      contractAddress:
        "0x036486801b8f42e950824cba55b2df8cccb0af2497992f807a7e1d9abd2c6ba1",
      entrypoint: "counter",
      calldata: [],
    };
    const response4 = await starknet4.callContract(call4);
    console.log(diff(response3, response4));
  });
});
