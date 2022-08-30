import { StarknetChainId } from "starknet/constants";
import {
  callContract,
  getBlock,
  getContractAddresses,
  getStorageAt,
  getTransactionStatus,
  getTransaction,
  getTransactionReceipt,
  invokeFunction,
  deployContract,
  getCode,
  waitForTransaction,
} from "../messages/provider";
import { ProviderInterface } from "starknet/provider/interface";

export const provider: ProviderInterface = {
  baseUrl: "",
  feederGatewayUrl: "",
  gatewayUrl: "",
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
