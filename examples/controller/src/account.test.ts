import { describe, expect, beforeAll, beforeEach, it } from "vitest";
import { getKeys } from "./keys";
import type { KeyType } from "./keys";
import { SequencerProvider } from "starknet";
import { toBN } from "starknet/utils/number";
import {
  declareAccount,
  deployAccount,
  getAccount,
  saveAccount,
  waitForAccountCreation,
} from "./account";

describe("declare account", () => {
  let provider: SequencerProvider;
  const classHash =
    "0x2f4dd4f63f1d3357c3faa7b1d7ef7ce63a1502df17d060ab0049d882fe899b2";
  beforeAll(async () => {
    provider = new SequencerProvider({ baseUrl: "https://alpha4.starknet.io" });
  });

  it("class should already be installed", async () => {
    const url = `http://alpha4.starknet.io/feeder_gateway/get_class_by_hash?classHash=${classHash}`;
    const response = await fetch(url);
    expect(response.status).toBe(200);
  });

  it.skip("should deploy an OZ v0.3.2 account", async () => {
    const v = await declareAccount(provider);
    await waitForAccountCreation(provider, v.transaction_hash);
    expect(v.class_hash).toBe(classHash);
  });
});

describe("deploy account", () => {
  let keys: KeyType = { privateKey: "", publicKey: "" };
  let provider: SequencerProvider;

  beforeEach(async () => {
    const v = await getKeys();
    if (!v) {
      throw "could not get keys";
    }
    keys = v;
    provider = new SequencerProvider({ baseUrl: "https://alpha4.starknet.io" });
    getAccount;
  });

  it("deploy the account if not already", async () => {
    if (!keys.account) {
      const v = await deployAccount(provider, keys);
      if (v.contract_address) {
        await saveAccount(keys, v.contract_address);
      }
      await waitForAccountCreation(provider, v.transaction_hash);
      expect(v.contract_address).contains("0x");
    }
  });

  it("check account public key", async () => {
    if (!keys.account) {
      expect(1, "the account should be deployed!").toBe(0);
      return;
    }
    const output = await provider.callContract({
      contractAddress: keys.account,
      entrypoint: "get_public_key",
    });
    expect(toBN(output.result[0]).toString("hex")).toBe(
      toBN(keys.publicKey).toString("hex")
    );
  });

  it("check account eth", async () => {
    if (!keys.account) {
      expect(1, "the account should be deployed!").toBe(0);
      return;
    }
    const output = await provider.callContract({
      contractAddress:
        "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
      entrypoint: "balanceOf",
      calldata: [toBN(keys.account).toString(10)],
    });
    expect(output.result[0]).not.toBe("0x0");
  });
});
