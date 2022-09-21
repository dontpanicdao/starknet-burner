import { describe, expect, beforeEach, it } from "vitest";
import { getKeys } from "./keys";
import type { KeyType } from "./keys";
import { SequencerProvider } from "starknet";
import { getNonce, suggestedMaxFee, invoke } from "./invoke";

describe("invoke transaction", () => {
  let keys: KeyType = { privateKey: "", publicKey: "" };
  let provider: SequencerProvider;
  let nonce = "0x0";
  let maxFee = "0x0";
  let tx = "";
  const contractAddress =
    "0x036486801b8f42e950824cba55b2df8cccb0af2497992f807a7e1d9abd2c6ba1";

  beforeEach(async () => {
    const v = await getKeys();
    if (!v) {
      throw "could not get keys";
    }
    keys = v;
    provider = new SequencerProvider({ baseUrl: "https://alpha4.starknet.io" });
  });

  it("should return a nonce", async () => {
    nonce = await getNonce(provider, keys);
    expect(nonce).toContain("0x");
  });

  it("should return the suggestedMaxFee", async () => {
    maxFee = await suggestedMaxFee(
      provider,
      keys,
      [
        {
          contractAddress,
          entrypoint: "incrementCounter",
          calldata: ["0x1"],
        },
      ],
      nonce
    );
    expect(maxFee).toContain("0x");
  });

  it("should execute a transaction", async () => {
    tx = await invoke(
      provider,
      keys,
      [
        {
          contractAddress,
          entrypoint: "incrementCounter",
          calldata: ["0x1"],
        },
      ],
      nonce,
      maxFee
    );
    expect(tx).toContain("0x");
  });

  it("should display the transaction", async () => {
    console.log(tx);
  });

  it("should wait for transaction to succeed", async () => {
    await provider.waitForTransaction(tx);
    const receipt = await provider.getTransactionReceipt(tx);
    // TODO: It could be that a direct request returns the tx as still PENDING
    expect(receipt.status).toBe("ACCEPTED_ON_L2");
  });
});
