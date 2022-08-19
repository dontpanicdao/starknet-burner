import {
  EstimateFeeResponse,
  InvokeFunctionResponse,
  Signature,
} from "starknet";
import type {
  Call,
  EstimateFeeDetails,
  Abi,
  InvocationsDetails,
} from "starknet";
import { BigNumberish } from "starknet/utils/number";

import { sendMessage, waitForMessage } from "./index";
import { TypedData } from "starknet/utils/typedData";

type EstimateFeeRequest = {
  calls: Call | Call[];
  estimateFeeDetails: EstimateFeeDetails;
};

type ExecuteRequest = {
  transactions: Call | Call[];
  abis?: Abi[];
  transactionsDetail?: InvocationsDetails;
};

type VerifyMessageRequest = {
  typedData: TypedData;
  signature: Signature;
};

type VerifyMessageHashRequest = {
  hash: BigNumberish;
  signature: Signature;
};

export type AccountMessage =
  | {
      type: "account_EstimateFee";
      data: EstimateFeeRequest;
    }
  | {
      type: "account_EstimateFeeResponse";
      data: EstimateFeeResponse;
    }
  | {
      type: "account_Execute";
      data: ExecuteRequest;
    }
  | {
      type: "account_ExecuteResponse";
      data: InvokeFunctionResponse;
    }
  | {
      type: "account_SignMessage";
      data: TypedData;
    }
  | {
      type: "account_SignMessageResponse";
      data: Signature;
    }
  | {
      type: "account_HashMessage";
      data: TypedData;
    }
  | {
      type: "account_HashMessageResponse";
      data: string;
    }
  | {
      type: "account_VerifyMessage";
      data: VerifyMessageRequest;
    }
  | {
      type: "account_VerifyMessageResponse";
      data: boolean;
    }
  | {
      type: "account_VerifyMessageHash";
      data: VerifyMessageHashRequest;
    }
  | {
      type: "account_VerifyMessageHashResponse";
      data: boolean;
    }
  | {
      type: "account_GetNonce";
    }
  | {
      type: "account_GetNonceResponse";
      data: string;
    };

export const estimateFee = async (
  calls: Call | Call[],
  estimateFeeDetails: EstimateFeeDetails
): Promise<EstimateFeeResponse> => {
  sendMessage({
    type: "account_EstimateFee",
    data: {
      calls,
      estimateFeeDetails,
    },
  });
  return await waitForMessage("account_EstimateFeeResponse");
};

export const execute = async (
  transactions: Call | Call[],
  abis?: Abi[],
  transactionsDetail?: InvocationsDetails
): Promise<InvokeFunctionResponse> => {
  sendMessage({
    type: "account_Execute",
    data: {
      transactions,
      abis,
      transactionsDetail,
    },
  });
  return await waitForMessage("account_ExecuteResponse");
};

export const signMessage = async (typedData: TypedData): Promise<Signature> => {
  sendMessage({
    type: "account_SignMessage",
    data: typedData,
  });
  return await waitForMessage("account_SignMessageResponse");
};

export const hashMessage = async (typedData: TypedData): Promise<string> => {
  sendMessage({
    type: "account_HashMessage",
    data: typedData,
  });
  return await waitForMessage("account_HashMessageResponse");
};

export const verifyMessage = async (
  typedData: TypedData,
  signature: Signature
): Promise<boolean> => {
  sendMessage({
    type: "account_VerifyMessage",
    data: {
      typedData,
      signature,
    },
  });
  return await waitForMessage("account_VerifyMessageResponse");
};

export const verifyMessageHash = async (
  hash: BigNumberish,
  signature: Signature
): Promise<boolean> => {
  sendMessage({
    type: "account_VerifyMessageHash",
    data: {
      hash,
      signature,
    },
  });
  return await waitForMessage("account_VerifyMessageHashResponse");
};

export const getNonce = async (): Promise<string> => {
  sendMessage({
    type: "account_GetNonce",
  });
  return await waitForMessage("account_GetNonceResponse");
};
