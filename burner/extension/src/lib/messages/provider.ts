import { BlockIdentifier } from "starknet/provider/utils";
import BN from "bn.js";
import {
  AddTransactionResponse,
  CallContractResponse,
  GetBlockResponse,
  GetTransactionResponse,
  GetContractAddressesResponse,
  GetCodeResponse,
  TransactionReceiptResponse,
  GetTransactionStatusResponse,
} from "starknet/types";
import type {
  Abi,
  Call,
  Invocation,
  InvocationsDetails,
  DeployContractPayload,
  DeclareContractPayload,
} from "starknet";
import { sendMessage, waitForMessage, getKey } from "./default";
import { BigNumberish } from "starknet/utils/number";

export interface CallContractRequest {
  transactions: Call | Call[];
  blockIdentifier?: BlockIdentifier;
  abis?: Abi[];
}
export interface GetClassAtRequest {
  contractAddress: string;
  blockIdentifier?: BlockIdentifier;
}
export interface GetEstimateFeeRequest {
  invocation: Invocation;
  blockIdentifier: BlockIdentifier;
  details: InvocationsDetails;
}
export interface GetStorageAtRequest {
  contractAddress: string;
  key: BigNumberish;
  blockHashOrTag?: string | number | BN | undefined;
}
export interface InvokeFunctionRequest {
  invocation: Invocation;
  details: InvocationsDetails;
}

export interface WaitForTxRequest {
  txHash: BigNumberish;
  retryInterval?: number;
}

export type ProviderMessage =
  | {
      type: "provider_GetContractAddresses";
    }
  | {
      type: "provider_GetContractAddressesResponse";
      data: GetContractAddressesResponse;
    }
  | {
      type: "provider_CallContract";
      data: CallContractRequest;
    }
  | {
      type: "provider_CallContractResponse";
      data: CallContractResponse;
    }
  | {
      type: "provider_GetBlock";
      data?: BlockIdentifier;
    }
  | {
      type: "provider_GetBlockResponse";
      data: GetBlockResponse;
    }
  | {
      type: "provider_GetStorageAt";
      data: GetStorageAtRequest;
    }
  | {
      type: "provider_GetStorageAtResponse";
      data: BigNumberish;
    }
  | {
      type: "provider_GetTransaction";
      data: BigNumberish;
    }
  | {
      type: "provider_GetTransactionResponse";
      data: GetTransactionResponse;
    }
  | {
      type: "provider_GetTransactionStatus";
      data: BigNumberish;
    }
  | {
      type: "provider_GetTransactionStatusResponse";
      data: GetTransactionStatusResponse;
    }
  | {
      type: "provider_GetTransactionReceipt";
      data: BigNumberish;
    }
  | {
      type: "provider_GetTransactionReceiptResponse";
      data: TransactionReceiptResponse;
    }
  | {
      type: "provider_InvokeFunction";
      data: InvokeFunctionRequest;
    }
  | {
      type: "provider_InvokeFunctionResponse";
      data: AddTransactionResponse;
    }
  | {
      type: "provider_DeployContract";
      data: DeployContractPayload;
    }
  | {
      type: "provider_DeployContractResponse";
      data: AddTransactionResponse;
    }
  | {
      type: "provider_DeclareContract";
      data: DeclareContractPayload;
    }
  | {
      type: "provider_GetCode";
      data: GetClassAtRequest;
    }
  | {
      type: "provider_GetCodeResponse";
      data: GetCodeResponse;
    }
  | {
      type: "provider_WaitForTx";
      data: WaitForTxRequest;
    }
  | {
      type: "provider_WaitForTxResponse";
      data: void;
    };

export const callContract = async (
  invokeTransaction: Call,
  options: {
    blockIdentifier: BlockIdentifier;
  }
): Promise<CallContractResponse> => {
  const key = getKey();
  sendMessage(
    {
      type: "provider_CallContract",
      data: {
        transactions: invokeTransaction,
        ...options,
      },
    },
    key
  );
  let me = await waitForMessage("provider_CallContractResponse", key);
  return me;
};

export const getContractAddresses = async () => {
  const key = getKey();
  sendMessage(
    {
      type: "provider_GetContractAddresses",
    },
    key
  );
  return await waitForMessage("provider_GetContractAddressesResponse", key);
};

export const getBlock = async (
  blockIdentifier?: BlockIdentifier
): Promise<GetBlockResponse> => {
  const key = getKey();
  sendMessage(
    {
      type: "provider_GetBlock",
      data: blockIdentifier,
    },
    key
  );
  return await waitForMessage("provider_GetBlockResponse", key);
};

export const getStorageAt = async (
  contractAddress: string,
  key: BigNumberish,
  blockIdentifier?: BlockIdentifier | undefined
): Promise<Object> => {
  const idKEY = getKey();
  sendMessage(
    {
      type: "provider_GetStorageAt",
      data: {
        contractAddress,
        key,
        blockHashOrTag: blockIdentifier || undefined,
      },
    },
    idKEY
  );
  return await waitForMessage("provider_GetStorageAtResponse", idKEY);
};

export const getTransaction = async (
  transactionHash: BigNumberish
): Promise<GetTransactionResponse> => {
  const key = getKey();
  sendMessage(
    {
      type: "provider_GetTransaction",
      data: transactionHash,
    },
    key
  );
  return await waitForMessage("provider_GetTransactionResponse", key);
};

export const getTransactionStatus = async (
  transactionHash: BigNumberish
): Promise<GetTransactionStatusResponse> => {
  const key = getKey();
  sendMessage(
    {
      type: "provider_GetTransactionStatus",
      data: transactionHash,
    },
    key
  );
  return await waitForMessage("provider_GetTransactionStatusResponse", key);
};

export const getTransactionReceipt = async (transactionHash: BigNumberish) => {
  const key = getKey();
  sendMessage(
    {
      type: "provider_GetTransactionReceipt",
      data: transactionHash,
    },
    key
  );
  return await waitForMessage("provider_GetTransactionReceiptResponse", key);
};

export const invokeFunction = async (
  invocation: Invocation
): Promise<AddTransactionResponse> => {
  const key = getKey();
  sendMessage(
    {
      type: "provider_InvokeFunction",
      data: {
        invocation,
        details: {},
      },
    },
    key
  );
  return await waitForMessage("provider_InvokeFunctionResponse", key);
};

export const deployContract = async (
  payload: DeployContractPayload
): Promise<AddTransactionResponse> => {
  const key = getKey();
  sendMessage(
    {
      type: "provider_DeployContract",
      data: payload,
    },
    key
  );
  return await waitForMessage("provider_DeployContractResponse", key);
};

export const getCode = async (
  contractAddress: string,
  blockIdentifier: BlockIdentifier
): Promise<GetCodeResponse> => {
  const key = getKey();
  sendMessage(
    {
      type: "provider_GetCode",
      data: {
        contractAddress,
        blockIdentifier,
      },
    },
    key
  );
  return await waitForMessage("provider_GetCodeResponse", key);
};

export const waitForTransaction = async (
  txHash: BigNumberish,
  retryInterval?: number
): Promise<void> => {
  const key = getKey();
  sendMessage(
    {
      type: "provider_WaitForTx",
      data: {
        txHash,
        retryInterval,
      },
    },
    key
  );
  return await waitForMessage("provider_WaitForTxResponse", key);
};
