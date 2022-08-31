import { AccountInterface } from "starknet/account/interface";
import {
  estimateFee,
  execute,
  signMessage,
  hashMessage,
  verifyMessage,
  verifyMessageHash,
  getNonce,
} from "../messages";
import { signer } from "./signer";
import { StarknetChainId } from "starknet/constants";
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

export const account: AccountInterface = {
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
