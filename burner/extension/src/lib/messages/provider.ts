import { BlockIdentifier } from "starknet/provider/utils";
import {
  CallContractResponse,
  GetBlockResponse,
  ContractClass,
  EstimateFeeResponse,
  GetTransactionResponse,
  InvokeTransactionReceiptResponse,
  InvokeFunctionResponse,
  DeployContractResponse,
  DeclareContractResponse,
  GetCodeResponse,
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
  blockIdentifier: BlockIdentifier;
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
      type: "provider_CallContract";
      data: CallContractRequest;
    }
  | {
      type: "provider_CallContractResponse";
      data: CallContractResponse;
    }
  | {
      type: "provider_GetBlock";
      data: BlockIdentifier;
    }
  | {
      type: "provider_GetBlockResponse";
      data: GetBlockResponse;
    }
  | {
      type: "provider_GetClassAt";
      data: GetClassAtRequest;
    }
  | {
      type: "provider_GetClassAtResponse";
      data: ContractClass;
    }
  | {
      type: "provider_GetEstimateFee";
      data: GetEstimateFeeRequest;
    }
  | {
      type: "provider_GetEstimateFeeResponse";
      data: EstimateFeeResponse;
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
      type: "provider_GetTransactionReceipt";
      data: BigNumberish;
    }
  | {
      type: "provider_GetTransactionReceiptResponse";
      data: InvokeTransactionReceiptResponse;
    }
  | {
      type: "provider_InvokeFunction";
      data: InvokeFunctionRequest;
    }
  | {
      type: "provider_InvokeFunctionResponse";
      data: InvokeFunctionResponse;
    }
  | {
      type: "provider_DeployContract";
      data: DeployContractPayload;
    }
  | {
      type: "provider_DeployContractResponse";
      data: DeployContractResponse;
    }
  | {
      type: "provider_DeclareContract";
      data: DeclareContractPayload;
    }
  | {
      type: "provider_DeclareContractResponse";
      data: DeclareContractResponse;
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
  call: Call,
  blockIdentifier: BlockIdentifier = "pending"
): Promise<CallContractResponse> => {
  sendMessage({
    type: "provider_CallContract",
    data: {
      transactions: call,
      blockIdentifier,
    },
  });
  return await waitForMessage("provider_CallContractResponse");
};

export const getBlock = async (
  blockIdentifier: BlockIdentifier = "pending"
): Promise<GetBlockResponse> => {
  sendMessage({
    type: "provider_GetBlock",
    data: {
      blockIdentifier,
    },
  });
  return await waitForMessage("provider_GetBlockResponse");
};

export const getClassAt = async (
  contractAddress: string,
  blockIdentifier: BlockIdentifier
): Promise<ContractClass> => {
  sendMessage({
    type: "provider_GetClassAt",
    data: {
      contractAddress,
      blockIdentifier,
    },
  });
  return await waitForMessage("provider_GetClassAtResponse");
};

export const getEstimateFee = async (
  invocation: Invocation,
  blockIdentifier: BlockIdentifier,
  details: InvocationsDetails
): Promise<EstimateFeeResponse> => {
  sendMessage({
    type: "provider_GetEstimateFee",
    data: {
      invocation,
      blockIdentifier,
      details,
    },
  });
  return await waitForMessage("provider_GetEstimateFeeResponse");
};

export const getStorageAt = async (
  contractAddress: string,
  key: BigNumberish,
  blockIdentifier: BlockIdentifier
): Promise<BigNumberish> => {
  sendMessage({
    type: "provider_GetStorageAt",
    data: {
      contractAddress,
      key,
      blockIdentifier,
    },
  });
  return await waitForMessage("provider_GetStorageAtResponse");
};

export const getTransaction = async (
  transactionHash: BigNumberish
): Promise<GetTransactionResponse> => {
  sendMessage({
    type: "provider_GetTransaction",
    data: {
      transactionHash,
    },
  });
  return await waitForMessage("provider_GetTransactionResponse");
};

export const getTransactionReceipt = async (transactionHash: BigNumberish) => {
  sendMessage({
    type: "provider_GetTransactionReceipt",
    data: {
      transactionHash,
    },
  });
  return await waitForMessage("provider_GetTransactionReceiptResponse");
};

export const invokeFunction = async (
  invocation: Invocation,
  details: InvocationsDetails
): Promise<InvokeFunctionResponse> => {
  sendMessage({
    type: "provider_InvokeFunction",
    data: {
      invocation,
      details,
    },
  });
  return await waitForMessage("provider_InvokeFunctionResponse");
};
export const deployContract = async (
  payload: DeployContractPayload
): Promise<DeployContractResponse> => {
  sendMessage({
    type: "provider_DeployContract",
    data: payload,
  });
  return await waitForMessage("provider_DeployContractResponse");
};
export const declareContract = async (
  payload: DeclareContractPayload
): Promise<DeclareContractResponse> => {
  sendMessage({
    type: "provider_DeclareContract",
    data: payload,
  });
  return await waitForMessage("provider_DeclareContractResponse");
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
