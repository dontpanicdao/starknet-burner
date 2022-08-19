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
  getClassAt,
  getEstimateFee,
  getStorageAt,
  getTransaction,
  getTransactionReceipt,
  invokeFunction,
  deployContract,
  declareContract,
  waitForTransaction,
} = provider;

export const account: AccountInterface = {
  signer,
  chainId: StarknetChainId.TESTNET,
  address: "",
  estimateFee,
  execute,
  signMessage,
  hashMessage,
  verifyMessage,
  verifyMessageHash,
  getNonce,
  callContract,
  getCode,
  getClassAt,
  getEstimateFee,
  getStorageAt,
  getTransaction,
  getTransactionReceipt,
  getBlock,
  invokeFunction,
  deployContract,
  declareContract,
  waitForTransaction,
};
