import { describe, expect, it } from "vitest";
import { ec } from "starknet";
import { toBN } from "starknet/utils/number";
import fs from "fs";

describe("keys", () => {
  let keys = { privateKey: "", publicKey: "" };
  it("check or create a private key", async () => {
    try {
      keys = await new Promise((resolve, reject) => {
        fs.readFile(".keys.json", (err, data) => {
          if (err) {
            return reject(err);
          }
          resolve(JSON.parse(data.toString()));
        });
      });
    } catch (err) {
      const privateKey = `0x${ec.genKeyPair().getPrivate().toString(16)}`;
      const keypair = ec.getKeyPair(toBN(privateKey));
      const publicKey = ec.getStarkKey(keypair);
      return await new Promise((resolve, reject) => {
        fs.writeFile(
          ".keys.json",
          JSON.stringify({ privateKey, publicKey }),
          (err) => {
            if (err) {
              return reject(err);
            }
            resolve(null);
          }
        );
      });
    }
  });

  it("verify keys", async () => {
    expect(keys.publicKey).contains("0x");
  });
});
