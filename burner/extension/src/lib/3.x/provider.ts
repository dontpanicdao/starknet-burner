import BN from "bn.js";
import { StarknetChainId } from "starknet3x/constants";
import { ProviderInterface } from "starknet3x/provider/interface";
import { BlockIdentifier } from "starknet3x/provider/utils";
import {
  AddTransactionResponse,
  CallContractResponse,
  GetBlockResponse,
  GetTransactionResponse,
  GetContractAddressesResponse,
  GetCodeResponse,
  TransactionReceiptResponse,
  GetTransactionStatusResponse,
} from "starknet3x/types";
import type {
  Abi,
  Call,
  Invocation,
  InvocationsDetails,
  DeployContractPayload,
  DeclareContractPayload,
} from "starknet3x";

import { BigNumberish } from "starknet3x/utils/number";

import { sendMessage, waitForMessage, getKey } from "../shared/message";

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
      type: "provider3x_GetContractAddresses";
    }
  | {
      type: "provider3x_GetContractAddressesResponse";
      data: GetContractAddressesResponse;
    }
  | {
      type: "provider3x_CallContract";
      data: CallContractRequest;
    }
  | {
      type: "provider3x_CallContractResponse";
      data: CallContractResponse;
    }
  | {
      type: "provider3x_GetBlock";
      data?: BlockIdentifier;
    }
  | {
      type: "provider3x_GetBlockResponse";
      data: GetBlockResponse;
    }
  | {
      type: "provider3x_GetStorageAt";
      data: GetStorageAtRequest;
    }
  | {
      type: "provider3x_GetStorageAtResponse";
      data: BigNumberish;
    }
  | {
      type: "provider3x_GetTransaction";
      data: BigNumberish;
    }
  | {
      type: "provider3x_GetTransactionResponse";
      data: GetTransactionResponse;
    }
  | {
      type: "provider3x_GetTransactionStatus";
      data: BigNumberish;
    }
  | {
      type: "provider3x_GetTransactionStatusResponse";
      data: GetTransactionStatusResponse;
    }
  | {
      type: "provider3x_GetTransactionReceipt";
      data: BigNumberish;
    }
  | {
      type: "provider3x_GetTransactionReceiptResponse";
      data: TransactionReceiptResponse;
    }
  | {
      type: "provider3x_InvokeFunction";
      data: InvokeFunctionRequest;
    }
  | {
      type: "provider3x_InvokeFunctionResponse";
      data: AddTransactionResponse;
    }
  | {
      type: "provider3x_DeployContract";
      data: DeployContractPayload;
    }
  | {
      type: "provider3x_DeployContractResponse";
      data: AddTransactionResponse;
    }
  | {
      type: "provider3x_DeclareContract";
      data: DeclareContractPayload;
    }
  | {
      type: "provider3x_GetCode";
      data: GetClassAtRequest;
    }
  | {
      type: "provider3x_GetCodeResponse";
      data: GetCodeResponse;
    }
  | {
      type: "provider3x_WaitForTx";
      data: WaitForTxRequest;
    }
  | {
      type: "provider3x_WaitForTxResponse";
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
      type: "provider3x_CallContract",
      data: {
        transactions: invokeTransaction,
        ...options,
      },
    },
    key
  );
  let me = await waitForMessage("provider3x_CallContractResponse", key);
  return me;
};

export const getContractAddresses = async () => {
  const key = getKey();
  sendMessage(
    {
      type: "provider3x_GetContractAddresses",
    },
    key
  );
  return await waitForMessage("provider3x_GetContractAddressesResponse", key);
};

export const getBlock = async (
  blockIdentifier?: BlockIdentifier
): Promise<GetBlockResponse> => {
  const key = getKey();
  sendMessage(
    {
      type: "provider3x_GetBlock",
      data: blockIdentifier,
    },
    key
  );
  return await waitForMessage("provider3x_GetBlockResponse", key);
};

export const getStorageAt = async (
  contractAddress: string,
  key: BigNumberish,
  blockIdentifier?: BlockIdentifier | undefined
): Promise<Object> => {
  const idKEY = getKey();
  sendMessage(
    {
      type: "provider3x_GetStorageAt",
      data: {
        contractAddress,
        key,
        blockHashOrTag: blockIdentifier || undefined,
      },
    },
    idKEY
  );
  return await waitForMessage("provider3x_GetStorageAtResponse", idKEY);
};

export const getTransaction = async (
  transactionHash: BigNumberish
): Promise<GetTransactionResponse> => {
  const key = getKey();
  sendMessage(
    {
      type: "provider3x_GetTransaction",
      data: transactionHash,
    },
    key
  );
  return await waitForMessage("provider3x_GetTransactionResponse", key);
};

export const getTransactionStatus = async (
  transactionHash: BigNumberish
): Promise<GetTransactionStatusResponse> => {
  const key = getKey();
  sendMessage(
    {
      type: "provider3x_GetTransactionStatus",
      data: transactionHash,
    },
    key
  );
  return await waitForMessage("provider3x_GetTransactionStatusResponse", key);
};

export const getTransactionReceipt = async (transactionHash: BigNumberish) => {
  const key = getKey();
  sendMessage(
    {
      type: "provider3x_GetTransactionReceipt",
      data: transactionHash,
    },
    key
  );
  return await waitForMessage("provider3x_GetTransactionReceiptResponse", key);
};

export const invokeFunction = async (
  invocation: Invocation
): Promise<AddTransactionResponse> => {
  const key = getKey();
  sendMessage(
    {
      type: "provider3x_InvokeFunction",
      data: {
        invocation,
        details: {},
      },
    },
    key
  );
  return await waitForMessage("provider3x_InvokeFunctionResponse", key);
};

export const deployContract = async (
  payload: DeployContractPayload
): Promise<AddTransactionResponse> => {
  const key = getKey();
  sendMessage(
    {
      type: "provider3x_DeployContract",
      data: payload,
    },
    key
  );
  return await waitForMessage("provider3x_DeployContractResponse", key);
};

export const getCode = async (
  contractAddress: string,
  blockIdentifier: BlockIdentifier
): Promise<GetCodeResponse> => {
  const key = getKey();
  sendMessage(
    {
      type: "provider3x_GetCode",
      data: {
        contractAddress,
        blockIdentifier,
      },
    },
    key
  );
  return await waitForMessage("provider3x_GetCodeResponse", key);
};

export const waitForTransaction = async (
  txHash: BigNumberish,
  retryInterval?: number
): Promise<void> => {
  const key = getKey();
  sendMessage(
    {
      type: "provider3x_WaitForTx",
      data: {
        txHash,
        retryInterval,
      },
    },
    key
  );
  return await waitForMessage("provider3x_WaitForTxResponse", key);
};

export const provider: ProviderInterface = {
  baseUrl: "https://alpha4.starknet.io",
  feederGatewayUrl: "https://alpha4.starknet.io/feeder_gateway",
  gatewayUrl: "https://alpha4.starknet.io/gateway",
  chainId: StarknetChainId.TESTNET,
  getContractAddresses,
  getBlock,
  getStorageAt,
  getTransaction,
  getTransactionStatus,
  getTransactionReceipt,
  callContract,
  invokeFunction,
  deployContract,
  getCode,
  waitForTransaction,
};
