import { describe, expect, beforeAll, it } from "vitest";
import { genKeys, getKeys } from "./keys";
import type { KeyType } from "./keys";

describe("manage keys", () => {
  let keys: KeyType = { privateKey: "", publicKey: "" };

  beforeAll(async () => {
    await genKeys();
    const v = await getKeys();
    if (!v) {
      throw "could not get keys";
    }
    keys = v;
  });

  it("verify public key", async () => {
    expect(keys.publicKey).contains("0x");
  });
});
