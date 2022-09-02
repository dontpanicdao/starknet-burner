import { AccountInterface as AccountInterfacev3x } from "starknet3x/account/interface";
import { signer } from "./signer";
import { StarknetChainId } from "starknet3x/constants";
import { provider } from "./provider";
const {
  callContract,
  getBlock,
  getCode,
  getStorageAt,
  getTransaction,
  getTransactionReceipt,
  invokeFunction,
  getContractAddresses,
  getTransactionStatus,
  deployContract,
  waitForTransaction,
} = provider;

import type {
  AddTransactionResponse,
  Signature,
  Call,
  EstimateFeeDetails,
  Abi,
  InvocationsDetails,
} from "starknet3x";
import { BigNumberish } from "starknet3x/utils/number";
import { sendMessage, waitForMessage, getKey } from "../shared/message";
import { TypedData } from "starknet3x/utils/typedData";
import { EstimateFee } from "starknet3x/types/account";

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
      type: "account3x_EstimateFee";
      data: EstimateFeeRequest;
    }
  | {
      type: "account3x_EstimateFeeResponse";
      data?: EstimateFee;
      exception?: string;
    }
  | {
      type: "account3x_Execute";
      data: ExecuteRequest;
    }
  | {
      type: "account3x_ExecuteResponse";
      data: AddTransactionResponse;
      exception?: string;
    }
  | {
      type: "account3x_SignMessage";
      data: TypedData;
    }
  | {
      type: "account3x_SignMessageResponse";
      data: Signature;
      exception?: string;
    }
  | {
      type: "account3x_HashMessage";
      data: TypedData;
    }
  | {
      type: "account3x_HashMessageResponse";
      data: string;
      exception?: string;
    }
  | {
      type: "account3x_VerifyMessage";
      data: VerifyMessageRequest;
    }
  | {
      type: "account3x_VerifyMessageResponse";
      data: boolean;
      exception?: string;
    }
  | {
      type: "account3x_VerifyMessageHash";
      data: VerifyMessageHashRequest;
    }
  | {
      type: "account3x_VerifyMessageHashResponse";
      data: boolean;
      exception?: string;
    }
  | {
      type: "account3x_GetNonce";
    }
  | {
      type: "account3x_GetNonceResponse";
      data: string;
      exception?: string;
    };

export const estimateFee = async (
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
  return await waitForMessage("account3x_ExecuteResponse", key);
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

export const getNonce = async (): Promise<string> => {
  const key = getKey();
  sendMessage(
    {
      type: "account3x_GetNonce",
    },
    key
  );
  return await waitForMessage("account3x_GetNonceResponse", key);
};
export const account: AccountInterfacev3x = {
  signer,
  chainId: StarknetChainId.TESTNET,
  baseUrl: provider.baseUrl,
  feederGatewayUrl: provider.feederGatewayUrl,
  gatewayUrl: provider.gatewayUrl,
  address: "",
  getContractAddresses,
  estimateFee,
  execute,
  signMessage,
  hashMessage,
  verifyMessage,
  verifyMessageHash,
  getNonce,
  callContract,
  getCode,
  getStorageAt,
  getTransaction,
  getTransactionStatus,
  getTransactionReceipt,
  getBlock,
  invokeFunction,
  deployContract,
  waitForTransaction,
};
