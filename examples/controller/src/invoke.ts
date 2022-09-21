import type { KeyType } from "./keys";

import { SequencerProvider, type Call } from "starknet";
import { getAccount } from "./account";

export const getNonce = async (provider: SequencerProvider, key: KeyType) => {
  if (!key || !key.account || !key.privateKey) {
    throw new Error("account not deployed");
  }
  const account = await getAccount(provider, key);
  const nonceResult = await account.callContract({
    contractAddress: key.account,
    entrypoint: "get_nonce",
  });
  if (!nonceResult.result || nonceResult.result.length === 0) {
    throw new Error("error with nonce");
  }
  return nonceResult.result[0];
};

export const suggestedMaxFee = async (
  provider: SequencerProvider,
  key: KeyType,
  calls: Call[],
  nonce: string
) => {
  if (!key || !key.account || !key.privateKey) {
    throw new Error("account not deployed");
  }
  const account = await getAccount(provider, key);
  const estimateResult = await account.estimateFee(calls, {
    nonce,
    blockIdentifier: "pending",
  });
  if (!estimateResult) {
    throw new Error("error with estimateFee");
  }
  return `0x${estimateResult.suggestedMaxFee.toString(16)}`;
};

export const invoke = async (
  provider: SequencerProvider,
  key: KeyType,
  calls: Call[],
  nonce: string,
  maxFee: string
) => {
  if (!key || !key.account || !key.privateKey) {
    throw new Error("account not deployed");
  }
  const account = await getAccount(provider, key);
  const result = await account.execute(calls, undefined, {
    nonce,
    version: "0x0",
    maxFee,
  });
  return result.transaction_hash;
};
