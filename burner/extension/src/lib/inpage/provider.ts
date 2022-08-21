import { StarknetChainId } from "starknet/constants";
import {
  callContract,
  getBlock,
  getClassAt,
  getEstimateFee,
  getStorageAt,
  getTransaction,
  getTransactionReceipt,
  invokeFunction,
  deployContract,
  declareContract,
  getCode,
  waitForTransaction,
} from "../messages/provider";
import { ProviderInterface } from "starknet/provider/interface";
import { log } from "./window";

export const provider: ProviderInterface = {
  chainId: StarknetChainId.TESTNET,
  getBlock,
  getClassAt,
  getEstimateFee,
  getStorageAt,
  getTransaction,
  getTransactionReceipt,
  callContract,
  invokeFunction,
  deployContract,
  declareContract,
  getCode,
  waitForTransaction,
};
