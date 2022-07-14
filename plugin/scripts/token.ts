import { ec, Signature } from "starknet";
import { toBN } from "starknet/utils/number";
import { computeHashOnElements } from "starknet/utils/hash";

import * as dotenv from "dotenv";
dotenv.config();

if (!process.env.SIGNER_PRIVATE_KEY) {
  throw new Error("PRIVATE_KEY is not set");
}

if (!process.env.SESSION_PUBLIC_KEY) {
  throw new Error("SESSION_PUBLIC_KEY is not set");
}

if (!process.env.SESSION_EXPIRATION_TIME) {
  throw new Error("SESSION_EXPIRATION_TIME is not set");
}

const getToken = async (
  signerPrivateKey: string,
  sessionPublicKey: string,
  ts: number
): Promise<[string, Signature]> => {
  let bnpubkey = toBN(sessionPublicKey);
  let bntimestamp = toBN(ts);
  let token = computeHashOnElements([bnpubkey, bntimestamp]);
  const pk = toBN(signerPrivateKey);
  const keypair = ec.getKeyPair(pk);
  const signature = ec.sign(keypair, token);
  return [token, signature];
};

console.log("session public key:", process.env.SESSION_PUBLIC_KEY);
let nowts = Math.round(new Date().getTime() / 1000) + 1800;
let ts = parseInt(process.env.SESSION_EXPIRATION_TIME, 10);
if (ts < nowts) {
  throw new Error(
    "SESSION_EXPIRATION_TIME should be greater than now + 30 minutes"
  );
}
console.log("expire time:", ts);

getToken(
  process.env.SIGNER_PRIVATE_KEY,
  process.env.SESSION_PUBLIC_KEY,
  ts
).then(([token, signature]) => {
  console.log("token hash:  ", token);
  console.log("          :  ", toBN(token).toString(10));
  console.log(`signature[0]: 0x${toBN(signature[0], 10).toString(16)}`);
  console.log("            :", signature[0]);
  console.log(`signature[1]: 0x${toBN(signature[1], 10).toString(16)}`);
  console.log("            :", signature[1]);
});
