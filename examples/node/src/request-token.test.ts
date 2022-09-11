import { describe, it } from "vitest";
import { ec } from "starknet4";
import { getStarkKey } from "starknet4/utils/ellipticCurve";

describe("request a token", () => {
  it("let's request a session token...", async () => {
    const privateKey = "0x1";
    const keypair = ec.getKeyPair(privateKey);
    const publicKey = getStarkKey(keypair);
    console.log(`start drone and get a `);
    console.log(`http://localhost:5174/?s=${publicKey}`);
  });
});
