import { SignerInterface } from "starknet3x/signer/interface";

import { TypedData } from "starknet3x/utils/typedData/types";
import type {
  Signature,
  Abi,
  Invocation,
  InvocationsSignerDetails,
} from "starknet3x";
import { BigNumberish } from "starknet3x/utils/number";
import { sendMessage, waitForMessage, getKey } from "../shared/message";

type GetPubKeyType =
  | {
      type: "signer3x_GetPubKey";
    }
  | {
      type: "signer3x_GetPubKeyResponse";
      data: string;
      exception?: string;
    };

export const getPubKey = async (): Promise<string> => {
  const key = getKey();
  sendMessage(
    {
      type: "signer3x_GetPubKey",
    },
    key
  );
  return await waitForMessage("signer3x_GetPubKeyResponse", key);
};

export type SignMessageRequest = {
  typedData: TypedData;
  accountAddress: string;
};

type SignMessageType =
  | {
      type: "signer3x_SignMessage";
      data: SignMessageRequest;
    }
  | {
      type: "signer3x_SignMessageResponse";
      data: Signature;
      exception?: string;
    };

export const signMessage = async (
  typedData: TypedData,
  accountAddress: string
): Promise<Signature> => {
  const key = getKey();
  sendMessage(
    {
      type: "signer3x_SignTransaction",
      data: {
        typedData,
        accountAddress,
      },
    },
    key
  );
  return await waitForMessage("signer3x_SignTransactionResponse", key);
};

export type SignTransactionRequest = {
  hash: BigNumberish;
  signature: Signature;
};

type SignTransactionType =
  | {
      type: "signer3x_SignTransaction";
      data: SignTransactionRequest;
    }
  | {
      type: "signer3x_SignTransactionResponse";
      data: Signature;
      exception?: string;
    };

export const signTransaction = async (
  transactions: Invocation[],
  transactionsDetail: InvocationsSignerDetails,
  abis?: Abi[]
): Promise<Signature> => {
  const key = getKey();
  sendMessage(
    {
      type: "signer3x_SignTransaction",
      data: {
        transactions,
        transactionsDetail,
        abis,
      },
    },
    key
  );
  return await waitForMessage("signer3x_SignTransactionResponse", key);
};

export type SignerMessage =
  | GetPubKeyType
  | SignTransactionType
  | SignMessageType;

export const signer: SignerInterface = {
  getPubKey,
  signTransaction,
  signMessage,
};
