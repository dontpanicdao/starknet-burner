import { ec } from "starknet";
import { toBN } from "starknet/utils/number";
import fs from "fs";

export type KeyType = {
  privateKey: string;
  publicKey: string;
  account?: string;
};

export const genKeys = async () => {
  try {
    const stats = fs.statSync(".keys.json");
    if (stats.isFile()) {
      return;
    }
  } catch (err) {}
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
        resolve({ privateKey, publicKey });
      }
    );
  });
};

export const getKeys = async (): Promise<KeyType> => {
  const keys: KeyType = await new Promise((resolve, reject) => {
    fs.readFile(".keys.json", (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(JSON.parse(data.toString()));
    });
  });
  return keys;
};
