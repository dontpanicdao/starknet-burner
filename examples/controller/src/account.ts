import fs from "fs";
import type { KeyType } from "./keys";

import {
  CompiledContract,
  Abi,
  Contract,
  json,
  SequencerProvider,
} from "starknet";

const readContract = async (name: string): Promise<CompiledContract> =>
  await json.parse(
    fs.readFileSync(`./starknet/${name}.json`).toString("ascii")
  );

export const deployAccount = async (
  provider: SequencerProvider,
  key: KeyType
) => {
  const accountCode = await readContract("account");
  const contractResponse = await provider.deployContract({
    contract: accountCode,
    constructorCalldata: [key.publicKey],
    addressSalt: key.publicKey,
  });
  return contractResponse;
};

export const declareAccount = async (provider: SequencerProvider) => {
  const accountCode = await readContract("account");
  const contractResponse = await provider.declareContract({
    contract: accountCode,
  });
  return contractResponse;
};

export const getAccount = async (
  abi: Abi,
  provider: SequencerProvider,
  address: string
) => {
  const contract = new Contract(abi, address, provider);
  contract.call;
};

export const saveAccount = async (key: KeyType, account: string) => {
  return await new Promise((resolve, reject) => {
    fs.writeFile(
      ".keys.json",
      JSON.stringify({
        ...key,
        account,
      }),
      (err) => {
        if (err) {
          return reject(err);
        }
        resolve({ ...key, account });
      }
    );
  });
};

export const waitForAccountCreation = async (
  provider: SequencerProvider,
  transactionHash: string
) => {
  await provider.waitForTransaction(transactionHash);
};
