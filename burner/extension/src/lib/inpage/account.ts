import { BigNumberish, toBN } from "starknet/utils/number";
import { AccountInterface } from "starknet/account/interface";
import {
  EstimateFeeResponse,
  GetCodeResponse,
  InvokeFunctionResponse,
  GetTransactionResponse,
  GetBlockResponse,
  ContractClass,
  InvokeTransactionReceiptResponse,
  DeployContractResponse,
  DeclareContractResponse,
} from "starknet/types";

import { signer } from "./signer";
import { StarknetChainId } from "starknet/constants";
import { callContract } from "../messages/provider";

export const account: AccountInterface = {
  signer,
  chainId: StarknetChainId.TESTNET,
  estimateFee: async (calls, EstimateFeeDetails) => {
    console.log("calls", calls);
    console.log("EstimateFeeDetails", EstimateFeeDetails);
    const response: EstimateFeeResponse = {
      overall_fee: "0",
      gas_consumed: "0",
      gas_price: "0",
    };
    return Promise.resolve(response);
  },
  address: "0x0",
  getNonce: async () => {
    return Promise.resolve("0");
  },
  execute: async (call, abis, invocationsDetails) => {
    console.log("call", call);
    console.log("abis", abis);
    console.log("invocationsDetails", invocationsDetails);
    const response: InvokeFunctionResponse = {
      transaction_hash: "0x0",
    };
    return Promise.resolve(response);
  },
  signMessage: async (typedData) => {
    console.log("typedData", typedData);
    return await signer.signMessage(typedData, account.address);
  },
  hashMessage: async (message) => {
    console.log("message", message);
    return Promise.resolve("0x0");
  },
  verifyMessage: async (typedData, signature) => {
    console.log("typedData", typedData);
    console.log("signature", signature);
    return Promise.resolve(true);
  },
  verifyMessageHash: async (hash, signature) => {
    console.log("hash", hash);
    console.log("signature", signature);
    return Promise.resolve(true);
  },
  callContract,
  getCode: async (address, blockIdentifier) => {
    console.log("address", address);
    console.log("blockIdentifier", blockIdentifier);
    const response: GetCodeResponse = {
      bytecode: ["0x0"],
    };
    return Promise.resolve(response);
  },
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
  waitForTransaction: async (txHash, retryInterval) => {
    console.log("txHash", txHash);
    console.log("retryInterval", retryInterval);
    return Promise.resolve();
  },
};
