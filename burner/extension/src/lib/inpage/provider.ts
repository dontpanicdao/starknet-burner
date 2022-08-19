import { StarknetChainId } from "starknet/constants";
import { callContract } from "../messages/provider";

import {
  ContractClass,
  DeclareContractResponse,
  DeployContractResponse,
  EstimateFeeResponse,
  GetBlockResponse,
  GetCodeResponse,
  GetTransactionResponse,
  InvokeFunctionResponse,
  InvokeTransactionReceiptResponse,
} from "starknet/types/provider";
import { BigNumberish, toBN } from "starknet/utils/number";
import { ProviderInterface } from "starknet/provider/interface";

export const provider: ProviderInterface = {
  chainId: StarknetChainId.TESTNET,

  getBlock: async (blockIdentifier) => {
    console.log("blockIdentifier", blockIdentifier);
    const out: GetBlockResponse = {
      accepted_time: 1599098983,
      block_hash:
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      block_number: 1,
      gas_price: "0x1",
      new_root:
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      parent_hash:
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      sequencer:
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      status: "REJECTED",
      transactions: [],
    };
    return Promise.resolve(out);
  },
  getClassAt: async (contractAddress, blockIdentifier) => {
    console.log("contractAddress", contractAddress);
    console.log("blockIdentifier", blockIdentifier);
    const response: ContractClass = {
      program: "0x0",
      entry_points_by_type: {},
    };
    return Promise.resolve(response);
  },
  getEstimateFee: async (invocation, blockIdentifier, details) => {
    console.log("invocation", invocation);
    console.log("blockIdentifier", blockIdentifier);
    console.log("details", details);
    const response: EstimateFeeResponse = {
      overall_fee: toBN(0),
      gas_consumed: toBN(0),
      gas_price: toBN(0),
    };
    return Promise.resolve(response);
  },
  getStorageAt: async (contractAddress, key, blockIdentifier) => {
    console.log("contractAddress", contractAddress);
    console.log("key", key);
    console.log("blockIdentifier", blockIdentifier);
    const response: BigNumberish = key;
    return Promise.resolve(response);
  },
  getTransaction: async (transactionHash) => {
    console.log("transactionHash", transactionHash);
    const response: GetTransactionResponse = {
      calldata: [],
    };
    return Promise.resolve(response);
  },
  getTransactionReceipt: async (transactionHash) => {
    console.log("transactionHash", transactionHash);
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
    console.log("invocation", invocation);
    console.log("details", details);
    const response: InvokeFunctionResponse = {
      transaction_hash: "0x0",
    };
    return Promise.resolve(response);
  },
  deployContract: async (payload) => {
    console.log("payload", payload);
    const response: DeployContractResponse = {
      transaction_hash: "0x0",
      contract_address: "0x0",
    };
    return Promise.resolve(response);
  },
  declareContract: async (payload) => {
    console.log("payload", payload);
    const response: DeclareContractResponse = {
      transaction_hash: "0x0",
      class_hash: "0x0",
    };
    return Promise.resolve(response);
  },
  getCode: async (contractAddress, blockIdentifier) => {
    console.log("contractAddress", contractAddress);
    console.log("blockIdentifier", blockIdentifier);
    const response: GetCodeResponse = { bytecode: ["000"] };
    return Promise.resolve(response);
  },
  waitForTransaction: async (txHash, retryInterval) => {
    console.log("txHash", txHash);
    console.log("retryInterval", retryInterval);
    return Promise.resolve();
  },
};
