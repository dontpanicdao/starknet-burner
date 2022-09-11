import { AccountInterface as AccountInterfacev3x } from "starknet3x/account/interface";
import { signer } from "./signer";
import { StarknetChainId } from "starknet3x/constants";
import { provider } from "./provider";
const {
  callContract,
  deployContract,
  getCode,
  getBlock,
  getStorageAt,
  getTransaction,
  getTransactionReceipt,
  getTransactionStatus,
  invokeFunction,
  waitForTransaction,
  getContractAddresses,
} = provider;

import type {
  Signature,
  Call,
  EstimateFeeDetails,
  Abi,
  InvocationsDetails,
  EstimateFee,
  AddTransactionResponse,
} from "starknet3x";
import { BigNumberish } from "starknet3x/utils/number";
import { sendMessage, waitForMessage, getKey } from "../shared/message";
import { TypedData } from "starknet3x/utils/typedData";

export type EstimateFeeRequest = {
  calls: Call | Call[];
  estimateFeeDetails: EstimateFeeDetails;
};

type EstimateFeeType =
  | {
      type: "account3x_EstimateFee";
      data: EstimateFeeRequest;
    }
  | {
      type: "account3x_EstimateFeeResponse";
      data: EstimateFee;
      exception?: string;
    };

const estimateFee = async (
  calls: Call | Call[],
  estimateFeeDetails: EstimateFeeDetails
): Promise<EstimateFee> => {
  const key = getKey();
  sendMessage(
    {
      type: "account3x_EstimateFee",
      data: {
        calls,
        estimateFeeDetails,
      },
    },
    key
  );
  return await waitForMessage("account3x_EstimateFeeResponse", key);
};

export type ExecuteRequest = {
  transactions: Call | Call[];
  abis?: Abi[];
  transactionsDetail?: InvocationsDetails;
};

type ExecuteType =
  | {
      type: "account3x_Execute";
      data: ExecuteRequest;
    }
  | {
      type: "account3x_ExecuteResponse";
      data: AddTransactionResponse;
      exception?: string;
    };

export const execute = async (
  transactions: Call | Call[],
  abis?: Abi[],
  transactionsDetail?: InvocationsDetails
): Promise<AddTransactionResponse> => {
  const key = getKey();
  sendMessage(
    {
      type: "account3x_Execute",
      data: {
        transactions,
        abis,
        transactionsDetail,
      },
    },
    key
  );
  const response = await waitForMessage("account3x_ExecuteResponse", key);
  return response;
};

export type SignMessageRequest = {
  typedData: TypedData;
};

type SignMessageType =
  | {
      type: "account3x_SignMessage";
      data: SignMessageRequest;
    }
  | {
      type: "account3x_SignMessageResponse";
      data: Signature;
      exception?: string;
    };

export const signMessage = async (typedData: TypedData): Promise<Signature> => {
  const key = getKey();
  sendMessage(
    {
      type: "account3x_SignMessage",
      data: typedData,
    },
    key
  );
  return await waitForMessage("account3x_SignMessageResponse", key);
};

export type HashMessageRequest = {
  typedData: TypedData;
};

type HashMessageType =
  | {
      type: "account3x_HashMessage";
      data: HashMessageRequest;
    }
  | {
      type: "account3x_HashMessageResponse";
      data: string;
      exception?: string;
    };

export const hashMessage = async (typedData: TypedData): Promise<string> => {
  const key = getKey();
  sendMessage(
    {
      type: "account3x_HashMessage",
      data: typedData,
    },
    key
  );
  return await waitForMessage("account3x_HashMessageResponse", key);
};

export type VerifyMessageRequest = {
  typedData: TypedData;
  signature: Signature;
};

type VerifyMessageType =
  | {
      type: "account3x_VerifyMessage";
      data: VerifyMessageRequest;
    }
  | {
      type: "account3x_VerifyMessageResponse";
      data: boolean;
      exception?: string;
    };

export const verifyMessage = async (
  typedData: TypedData,
  signature: Signature
): Promise<boolean> => {
  const key = getKey();
  sendMessage(
    {
      type: "account3x_VerifyMessage",
      data: {
        typedData,
        signature,
      },
    },
    key
  );
  return await waitForMessage("account3x_VerifyMessageResponse", key);
};

export type VerifyMessageHashRequest = {
  hash: BigNumberish;
  signature: Signature;
};

type VerifyMessageHashType =
  | {
      type: "account3x_VerifyMessageHash";
      data: VerifyMessageHashRequest;
    }
  | {
      type: "account3x_VerifyMessageHashResponse";
      data: boolean;
      exception?: string;
    };

export const verifyMessageHash = async (
  hash: BigNumberish,
  signature: Signature
): Promise<boolean> => {
  const key = getKey();
  sendMessage(
    {
      type: "account3x_VerifyMessageHash",
      data: {
        hash,
        signature,
      },
    },
    key
  );
  return await waitForMessage("account3x_VerifyMessageHashResponse", key);
};

type GetNonceType =
  | {
      type: "account3x_GetNonce";
    }
  | {
      type: "account3x_GetNonceResponse";
      data: string;
      exception?: string;
    };

const getNonce = async (): Promise<string> => {
  const key = getKey();
  sendMessage(
    {
      type: "account3x_GetNonce",
    },
    key
  );
  return await waitForMessage("account3x_GetNonceResponse", key);
};

export type AccountMessage =
  | EstimateFeeType
  | ExecuteType
  | SignMessageType
  | HashMessageType
  | VerifyMessageType
  | VerifyMessageHashType
  | GetNonceType;

export const account: AccountInterfacev3x = {
  signer,
  chainId: StarknetChainId.TESTNET,
  address: "",
  baseUrl: "",
  feederGatewayUrl: "",
  gatewayUrl: "",
  estimateFee,
  callContract,
  deployContract,
  execute,
  getBlock,
  getCode,
  getContractAddresses,
  getNonce,
  getStorageAt,
  getTransaction,
  getTransactionReceipt,
  getTransactionStatus,
  hashMessage,
  invokeFunction,
  signMessage,
  verifyMessage,
  verifyMessageHash,
  waitForTransaction,
};
