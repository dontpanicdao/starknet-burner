import BN from "bn.js";
import { StarknetChainId } from "starknet3x/constants";
import { ProviderInterface } from "starknet3x/provider/interface";
import { BlockIdentifier } from "starknet3x/provider/utils";
import {
  GetContractAddressesResponse,
  GetTransactionStatusResponse,
  TransactionReceiptResponse,
  AddTransactionResponse,
  GetCodeResponse,
  CallContractResponse,
  GetBlockResponse,
  GetTransactionResponse,
} from "starknet3x/types";
import type { Call, Invocation, DeployContractPayload } from "starknet3x";
import { BigNumberish } from "starknet3x/utils/number";
import { sendMessage, waitForMessage, getKey } from "../shared/message";
import { newLog } from "../shared/log";

const log = newLog();
type CallContractRequest = {
  transactions: Call | Call[];
  options: { blockIdentifier?: BlockIdentifier };
};

type CallContractType =
  | {
      type: "provider3x_CallContract";
      data: CallContractRequest;
    }
  | {
      type: "provider3x_CallContractResponse";
      data: CallContractResponse;
      exception?: string;
    };

const callContract = async (
  invokeTransaction: Call,
  options: { blockIdentifier?: BlockIdentifier }
): Promise<CallContractResponse> => {
  const key = getKey();
  sendMessage(
    {
      type: "provider3x_CallContract",
      data: {
        transactions: invokeTransaction,
        options,
      },
    },
    key
  );
  let me = await waitForMessage("provider3x_CallContractResponse", key);
  return me;
};

type GetBlockRequest = {
  blockIdentifier: BlockIdentifier;
};

type GetBlockType =
  | {
      type: "provider3x_GetBlock";
      data: GetBlockRequest;
    }
  | {
      type: "provider3x_GetBlockResponse";
      data: GetBlockResponse;
      exception?: string;
    };

const getBlock = async (
  blockIdentifier: BlockIdentifier = "pending"
): Promise<GetBlockResponse> => {
  const key = getKey();
  sendMessage(
    {
      type: "provider3x_GetBlock",
      data: blockIdentifier,
    },
    key
  );
  const output = await waitForMessage("provider3x_GetBlockResponse", key);
  return output;
};

type GetStorageAtRequest = {
  contractAddress: string;
  key: BigNumberish;
  blockHashOrTag?: string | number | BN;
};

type GetStorageAtType =
  | {
      type: "provider3x_GetStorageAt";
      data: GetStorageAtRequest;
    }
  | {
      type: "provider3x_GetStorageAtResponse";
      data: BigNumberish;
      exception?: string;
    };

const getStorageAt = async (
  contractAddress: string,
  key: BigNumberish,
  blockIdentifier?: BlockIdentifier
): Promise<object> => {
  const idKEY = getKey();
  sendMessage(
    {
      type: "provider3x_GetStorageAt",
      data: {
        contractAddress,
        key,
        blockIdentifier,
      },
    },
    idKEY
  );
  return await waitForMessage("provider3x_GetStorageAtResponse", idKEY);
};

type GetTransactionRequest = {
  transactionHash: BigNumberish;
};

type GetTransactionType =
  | {
      type: "provider3x_GetTransaction";
      data: GetTransactionRequest;
    }
  | {
      type: "provider3x_GetTransactionResponse";
      data: GetTransactionResponse;
      exception?: string;
    };

const getTransaction = async (
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

type GetTransactionReceiptRequest = {
  transactionHash: BigNumberish;
};

type GetTransactionReceiptType =
  | {
      type: "provider3x_GetTransactionReceipt";
      data: GetTransactionReceiptRequest;
    }
  | {
      type: "provider3x_GetTransactionReceiptResponse";
      data: TransactionReceiptResponse;
      exception?: string;
    };

const getTransactionReceipt = async (
  transactionHash: BigNumberish
): Promise<TransactionReceiptResponse> => {
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

type InvokeFunctionRequest = {
  invocation: Invocation;
};

type InvokeFunctionType =
  | {
      type: "provider3x_InvokeFunction";
      data: InvokeFunctionRequest;
    }
  | {
      type: "provider3x_InvokeFunctionResponse";
      data: AddTransactionResponse;
      exception?: string;
    };

const invokeFunction = async (
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

type DeployContractRequest = {
  payload: DeployContractPayload;
};

type DeployContractType =
  | {
      type: "provider3x_DeployContract";
      data: DeployContractRequest;
    }
  | {
      type: "provider3x_DeployContractResponse";
      data: AddTransactionResponse;
      exception?: string;
    };

const deployContract = async (
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

type WaitForTransactionRequest = {
  txHash: BigNumberish;
  retryInterval?: number;
};

type WaitForTransactionType =
  | {
      type: "provider3x_WaitForTransaction";
      data: WaitForTransactionRequest;
    }
  | {
      type: "provider3x_WaitForTransactionResponse";
      exception?: string;
    };

const waitForTransaction = async (
  txHash: BigNumberish,
  retryInterval?: number
): Promise<void> => {
  const key = getKey();
  sendMessage(
    {
      type: "provider3x_WaitForTransaction",
      data: {
        txHash,
        retryInterval,
      },
    },
    key
  );
  return await waitForMessage("provider3x_WaitForTransactionResponse", key);
};

type GetContractAddressesType =
  | {
      type: "provider3x_GetContractAddresses";
    }
  | {
      type: "provider3x_GetContractAddressesResponse";
      data: GetContractAddressesResponse;
      exception?: string;
    };

export const getContractAddresses =
  async (): Promise<GetContractAddressesResponse> => {
    const key = getKey();
    sendMessage(
      {
        type: "provider3x_GetContractAddresses",
      },
      key
    );
    return await waitForMessage("provider3x_GetContractAddressesResponse", key);
  };

type GetTransactionStatusRequest = {
  txHash: BigNumberish;
};

type GetTransactionStatusType =
  | {
      type: "provider3x_GetTransactionStatus";
      data: GetTransactionStatusRequest;
    }
  | {
      type: "provider3x_GetTransactionStatusResponse";
      data: GetTransactionStatusResponse;
      exception?: string;
    };

export const getTransactionStatus = async (
  txHash: BigNumberish
): Promise<GetTransactionStatusResponse> => {
  const key = getKey();
  sendMessage(
    {
      type: "provider3x_GetTransactionStatus",
      data: { txHash },
    },
    key
  );
  return await waitForMessage("provider3x_GetTransactionStatusResponse", key);
};

type GetCodeRequest = {
  contractAddress: string;
  blockIdentifier?: BlockIdentifier;
};

type GetCodeType =
  | {
      type: "provider3x_GetCode";
      data: GetCodeRequest;
    }
  | {
      type: "provider3x_GetCodeResponse";
      exception?: string;
    };

export const getCode = async (
  contractAddress: string,
  blockIdentifier?: BlockIdentifier
): Promise<GetCodeResponse> => {
  const key = getKey();
  sendMessage(
    {
      type: "provider3x_GetCode",
      data: { contractAddress, blockIdentifier },
    },
    key
  );
  return await waitForMessage("provider3x_GetCodeResponse", key);
};
export type ProviderMessage =
  | CallContractType
  | DeployContractType
  | GetBlockType
  | GetCodeType
  | GetContractAddressesType
  | GetStorageAtType
  | GetTransactionReceiptType
  | GetTransactionStatusType
  | GetTransactionType
  | InvokeFunctionType
  | WaitForTransactionType;

export const provider: ProviderInterface = {
  baseUrl: "https://alpha4.starknet.io",
  feederGatewayUrl: "https://alpha4.starknet.io/feeder_gateway",
  gatewayUrl: "https://alpha4.starknet.io/gateway",
  chainId: StarknetChainId.TESTNET,
  callContract,
  deployContract,
  getBlock,
  getCode,
  getContractAddresses,
  getStorageAt,
  getTransaction,
  getTransactionReceipt,
  getTransactionStatus,
  invokeFunction,
  waitForTransaction,
};
