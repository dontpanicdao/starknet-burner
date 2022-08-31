import type {
  AddTransactionResponse,
  Signature,
  Call,
  EstimateFeeDetails,
  Abi,
  InvocationsDetails,
} from "starknet";
import { BigNumberish } from "starknet/utils/number";
import { sendMessage, waitForMessage, getKey } from "./default";
import { TypedData } from "starknet/utils/typedData";
import { EstimateFee } from "starknet/types/account";

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
      data: EstimateFee;
    }
  | {
      type: "account_Execute";
      data: ExecuteRequest;
    }
  | {
      type: "account_ExecuteResponse";
      data: AddTransactionResponse;
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
): Promise<EstimateFee> => {
  const key = getKey();
  sendMessage(
    {
      type: "account_EstimateFee",
      data: {
        calls,
        estimateFeeDetails,
      },
    },
    key
  );
  return await waitForMessage("account_EstimateFeeResponse", key);
};

export const execute = async (
  transactions: Call | Call[],
  abis?: Abi[],
  transactionsDetail?: InvocationsDetails
): Promise<AddTransactionResponse> => {
  const key = getKey();
  sendMessage(
    {
      type: "account_Execute",
      data: {
        transactions,
        abis,
        transactionsDetail,
      },
    },
    key
  );
  return await waitForMessage("account_ExecuteResponse", key);
};

export const signMessage = async (typedData: TypedData): Promise<Signature> => {
  const key = getKey();
  sendMessage(
    {
      type: "account_SignMessage",
      data: typedData,
    },
    key
  );
  return await waitForMessage("account_SignMessageResponse", key);
};

export const hashMessage = async (typedData: TypedData): Promise<string> => {
  const key = getKey();
  sendMessage(
    {
      type: "account_HashMessage",
      data: typedData,
    },
    key
  );
  return await waitForMessage("account_HashMessageResponse", key);
};

export const verifyMessage = async (
  typedData: TypedData,
  signature: Signature
): Promise<boolean> => {
  const key = getKey();
  sendMessage(
    {
      type: "account_VerifyMessage",
      data: {
        typedData,
        signature,
      },
    },
    key
  );
  return await waitForMessage("account_VerifyMessageResponse", key);
};

export const verifyMessageHash = async (
  hash: BigNumberish,
  signature: Signature
): Promise<boolean> => {
  const key = getKey();
  sendMessage(
    {
      type: "account_VerifyMessageHash",
      data: {
        hash,
        signature,
      },
    },
    key
  );
  return await waitForMessage("account_VerifyMessageHashResponse", key);
};

export const getNonce = async (): Promise<string> => {
  const key = getKey();
  sendMessage(
    {
      type: "account_GetNonce",
    },
    key
  );
  return await waitForMessage("account_GetNonceResponse", key);
};
