import { StarknetChainId } from "starknet/constants";
import { callContract, getBlock } from "../messages/provider";
import {
  ContractClass,
  DeclareContractResponse,
  DeployContractResponse,
  EstimateFeeResponse,
  GetCodeResponse,
  GetTransactionResponse,
  InvokeFunctionResponse,
  InvokeTransactionReceiptResponse,
} from "starknet/types/provider";
import { BigNumberish, toBN } from "starknet/utils/number";
import { ProviderInterface } from "starknet/provider/interface";
import { log } from "./window";

export const provider: ProviderInterface = {
  chainId: StarknetChainId.TESTNET,

  getBlock,
  getClassAt: async (contractAddress, blockIdentifier) => {
    log("contractAddress", contractAddress);
    log("blockIdentifier", blockIdentifier);
    const response: ContractClass = {
      program: "0x0",
      entry_points_by_type: {},
    };
    return Promise.resolve(response);
  },
  getEstimateFee: async (invocation, blockIdentifier, details) => {
    log("invocation", invocation);
    log("blockIdentifier", blockIdentifier);
    log("details", details);
    const response: EstimateFeeResponse = {
      overall_fee: toBN(0),
      gas_consumed: toBN(0),
      gas_price: toBN(0),
    };
    return Promise.resolve(response);
  },
  getStorageAt: async (contractAddress, key, blockIdentifier) => {
    log("contractAddress", contractAddress);
    log("key", key);
    log("blockIdentifier", blockIdentifier);
    const response: BigNumberish = key;
    return Promise.resolve(response);
  },
  getTransaction: async (transactionHash) => {
    log("transactionHash", transactionHash);
    const response: GetTransactionResponse = {
      calldata: [],
    };
    return Promise.resolve(response);
  },
  getTransactionReceipt: async (transactionHash) => {
    log("transactionHash", transactionHash);
    const response: InvokeTransactionReceiptResponse = {
      messages_sent: [],
      transaction_hash: "0x0",
      events: [],
      status: "REJECTED",
    };
    return Promise.resolve(response);
  },
  callContract,
  invokeFunction: async (invocation, details) => {
    log("invocation", invocation);
    log("details", details);
    const response: InvokeFunctionResponse = {
      transaction_hash: "0x0",
    };
    return Promise.resolve(response);
  },
  deployContract: async (payload) => {
    log("payload", payload);
    const response: DeployContractResponse = {
      transaction_hash: "0x0",
      contract_address: "0x0",
    };
    return Promise.resolve(response);
  },
  declareContract: async (payload) => {
    log("payload", payload);
    const response: DeclareContractResponse = {
      transaction_hash: "0x0",
      class_hash: "0x0",
    };
    return Promise.resolve(response);
  },
  getCode: async (contractAddress, blockIdentifier) => {
    log("contractAddress", contractAddress);
    log("blockIdentifier", blockIdentifier);
    const response: GetCodeResponse = { bytecode: ["000"] };
    return Promise.resolve(response);
  },
  waitForTransaction: async (txHash, retryInterval) => {
    log("txHash", txHash);
    log("retryInterval", retryInterval);
    return Promise.resolve();
  },
};
