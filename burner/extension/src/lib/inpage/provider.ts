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
  baseUrl: "https://alpha4.starknet.io",
  feederGatewayUrl: "https://alpha4.starknet.io/feeder_gateway",
  gatewayUrl: "https://alpha4.starknet.io/gateway",
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
