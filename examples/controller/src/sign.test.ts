import { describe, expect, beforeEach, it } from "vitest";
import { getKeys } from "./keys";
import type { KeyType } from "./keys";
import { SequencerProvider } from "starknet";
import { sign } from "./sign";
import type { TypedData } from "starknet/dist/utils/typedData";

const msg: TypedData = {
  types: {
    StarkNetDomain: [
      { name: "name", type: "felt" },
      { name: "version", type: "felt" },
      { name: "chainId", type: "felt" },
    ],
    Person: [
      { name: "name", type: "felt" },
      { name: "wallet", type: "felt" },
    ],
    Mail: [
      { name: "from", type: "Person" },
      { name: "to", type: "Person" },
      { name: "contents", type: "felt" },
    ],
  },
  primaryType: "Mail",
  domain: {
    name: "StarkNet Mail",
    version: "1",
    chainId: 1,
  },
  message: {
    from: {
      name: "Cow",
      wallet: "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
    },
    to: {
      name: "Bob",
      wallet: "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
    },
    contents: "Hello, Bob!",
  },
};

describe("sign transaction", () => {
  let keys: KeyType = { privateKey: "", publicKey: "" };
  let provider: SequencerProvider;
  beforeEach(async () => {
    const v = await getKeys();
    if (!v) {
      throw "could not get keys";
    }
    keys = v;
    provider = new SequencerProvider({ baseUrl: "https://alpha4.starknet.io" });
  });

  it("should sign the message", async () => {
    const signature = await sign(provider, keys, msg);
    expect(signature.length).toBe(2);
    console.log(signature[0]);
    expect(signature[0]).toBe(
      "1892207465695449528547718901871882408627543414308246770043670130767760988480"
    );
  });
});
