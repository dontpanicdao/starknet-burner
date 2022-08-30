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
import { sendMessage, waitForMessage } from "./default";
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
  sendMessage({
    type: "provider_CallContract",
    data: {
      transactions: invokeTransaction,
      ...options,
    },
  });
  let me = await waitForMessage("provider_CallContractResponse");
  return me;
};

export const getContractAddresses = async () => {
  sendMessage({
    type: "provider_GetContractAddresses",
  });
  return await waitForMessage("provider_GetContractAddressesResponse");
};

export const getBlock = async (
  blockIdentifier?: BlockIdentifier
): Promise<GetBlockResponse> => {
  sendMessage({
    type: "provider_GetBlock",
    data: blockIdentifier,
  });
  return await waitForMessage("provider_GetBlockResponse");
};

export const getStorageAt = async (
  contractAddress: string,
  key: BigNumberish,
  blockIdentifier?: BlockIdentifier | undefined
): Promise<Object> => {
  sendMessage({
    type: "provider_GetStorageAt",
    data: {
      contractAddress,
      key,
      blockHashOrTag: blockIdentifier || undefined,
    },
  });
  return await waitForMessage("provider_GetStorageAtResponse");
};

export const getTransaction = async (
  transactionHash: BigNumberish
): Promise<GetTransactionResponse> => {
  sendMessage({
    type: "provider_GetTransaction",
    data: transactionHash,
  });
  return await waitForMessage("provider_GetTransactionResponse");
};

export const getTransactionStatus = async (
  transactionHash: BigNumberish
): Promise<GetTransactionStatusResponse> => {
  sendMessage({
    type: "provider_GetTransactionStatus",
    data: transactionHash,
  });
  return await waitForMessage("provider_GetTransactionStatusResponse");
};

export const getTransactionReceipt = async (transactionHash: BigNumberish) => {
  sendMessage({
    type: "provider_GetTransactionReceipt",
    data: transactionHash,
  });
  return await waitForMessage("provider_GetTransactionReceiptResponse");
};

export const invokeFunction = async (
  invocation: Invocation
): Promise<AddTransactionResponse> => {
  sendMessage({
    type: "provider_InvokeFunction",
    data: {
      invocation,
      details: {},
    },
  });
  return await waitForMessage("provider_InvokeFunctionResponse");
};

export const deployContract = async (
  payload: DeployContractPayload
): Promise<AddTransactionResponse> => {
  sendMessage({
    type: "provider_DeployContract",
    data: payload,
  });
  return await waitForMessage("provider_DeployContractResponse");
};

export const getCode = async (
  contractAddress: string,
  blockIdentifier: BlockIdentifier
): Promise<GetCodeResponse> => {
  sendMessage({
    type: "provider_GetCode",
    data: {
      contractAddress,
      blockIdentifier,
    },
  });
  return await waitForMessage("provider_GetCodeResponse");
};

export const waitForTransaction = async (
  txHash: BigNumberish,
  retryInterval?: number
): Promise<void> => {
  sendMessage({
    type: "provider_WaitForTx",
    data: {
      txHash,
      retryInterval,
    },
  });
  return await waitForMessage("provider_WaitForTxResponse");
};
