import type { KeyType } from "./keys";

import { SequencerProvider } from "starknet";
import { getAccount } from "./account";
import type { TypedData } from "starknet/dist/utils/typedData";

export const sign = async (
  provider: SequencerProvider,
  key: KeyType,
  typedData: TypedData
) => {
  if (!key || !key.account || !key.privateKey) {
    throw new Error("account not deployed");
  }
  const account = await getAccount(provider, key);
  const result = await account.signMessage(typedData);
  return result;
};
