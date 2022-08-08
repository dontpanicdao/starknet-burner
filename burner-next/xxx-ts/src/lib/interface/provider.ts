import BN from "bn.js";

import {
  Abi,
  BlockTag,
  Call,
  CompressedProgram,
  DeclareContractPayload,
  DeployContractPayload,
  EntryPointsByType,
  Invocation,
  InvocationsDetails,
  RawCalldata,
  Signature,
  Status,
} from "./types";

export interface GetBlockResponse {
  accepted_time: number;
  block_hash: string;
  block_number: number;
  gas_price: string;
  new_root: string;
  old_root?: string;
  parent_hash: string;
  sequencer: string;
  status: Status;
  transactions: Array<string>;
  starknet_version?: string;
}

export interface GetCodeResponse {
  bytecode: string[];
  // abi: string; // is not consistent between rpc and sequencer (is it?), therefore not included in the provider interface
}

export type GetTransactionResponse = InvokeTransactionResponse &
  DeclareTransactionResponse;

export interface CommonTransactionResponse {
  transaction_hash?: string;
  version?: string;
  signature?: Signature;
  max_fee?: string;
  nonce?: string;
}

export interface InvokeTransactionResponse extends CommonTransactionResponse {
  contract_address?: string;
  entry_point_selector?: string;
  calldata: RawCalldata;
}

export interface ContractEntryPoint {
  offset: string;
  selector: string;
}

export interface ContractClass {
  program: CompressedProgram;
  entry_points_by_type: EntryPointsByType;
  abi?: Abi;
}

export interface DeclareTransactionResponse extends CommonTransactionResponse {
  contract_class?: any;
  sender_address?: string;
}

export type GetTransactionReceiptResponse =
  | InvokeTransactionReceiptResponse
  | DeclareTransactionReceiptResponse;

export interface CommonTransactionReceiptResponse {
  transaction_hash: string;
  status: Status;
  actual_fee?: string;
  status_data?: string;
}

export interface MessageToL1 {
  to_address: string;
  payload: Array<string>;
}

export interface Event {
  from_address: string;
  keys: Array<string>;
  data: Array<string>;
}

export interface MessageToL2 {
  from_address: string;
  payload: Array<string>;
}

export interface InvokeTransactionReceiptResponse
  extends CommonTransactionReceiptResponse {
  messages_sent: Array<MessageToL1>;
  events: Array<Event>;
  l1_origin_message?: MessageToL2;
}

export type DeclareTransactionReceiptResponse =
  CommonTransactionReceiptResponse;

export interface EstimateFeeResponse {
  overall_fee: BN;
  gas_consumed?: BN;
  gas_price?: BN;
}

export interface InvokeFunctionResponse {
  transaction_hash: string;
}

export interface DeployContractResponse {
  contract_address: string;
  transaction_hash: string;
}

export interface DeclareContractResponse {
  transaction_hash: string;
  class_hash: string;
}

export type CallContractResponse = {
  result: Array<string>;
};

import { StarknetChainId } from "./constants";

import type { BigNumberish } from "starknet/utils/number";
import { BlockIdentifier } from "starknet/provider/utils";

export abstract class ProviderInterface {
  public abstract chainId: StarknetChainId;

  /**
   * Calls a function on the StarkNet contract.
   *
   * @param call transaction to be called
   * @param blockIdentifier block identifier
   * @returns the result of the function on the smart contract.
   */
  public abstract callContract(
    call: Call,
    blockIdentifier?: BlockIdentifier
  ): Promise<CallContractResponse>;

  /**
   * Gets the block information
   *
   * @param blockIdentifier block identifier
   * @returns the block object
   */
  public abstract getBlock(
    blockIdentifier: BlockIdentifier
  ): Promise<GetBlockResponse>;

  public abstract getCode(
    contractAddress: string,
    blockIdentifier?: BlockIdentifier
  ): Promise<GetCodeResponse>;

  /**
   * Gets the contract class of the deployed contract.
   *
   * @param contractAddress - contract address
   * @param blockIdentifier - block identifier
   * @returns Contract class of compiled contract
   */
  public abstract getClassAt(
    contractAddress: string,
    blockIdentifier?: BlockIdentifier
  ): Promise<ContractClass>;

  /**
   * Gets the contract's storage variable at a specific key.
   *
   * @param contractAddress
   * @param key - from getStorageVarAddress('<STORAGE_VARIABLE_NAME>') (WIP)
   * @param blockHashOrTag - block hash or tag (pending, latest)
   * @returns the value of the storage variable
   */
  public abstract getStorageAt(
    contractAddress: string,
    key: BigNumberish,
    blockHashOrTag?: BlockTag | BigNumberish
  ): Promise<BigNumberish>;

  /**
   * Gets the transaction information from a tx id.
   *
   * @param txHash
   * @returns the transacton object { transaction_id, status, transaction, block_number?, block_number?, transaction_index?, transaction_failure_reason? }
   */
  public abstract getTransaction(
    transactionHash: BigNumberish
  ): Promise<GetTransactionResponse>;

  /**
   * Gets the transaction receipt from a tx hash.
   *
   * @param txHash
   * @returns the transaction receipt object
   */
  public abstract getTransactionReceipt(
    transactionHash: BigNumberish
  ): Promise<GetTransactionReceiptResponse>;

  /**
   * Deploys a given compiled contract (json) to starknet
   *
   * @param payload payload to be deployed containing:
   * - compiled contract code
   * - constructor calldata
   * - address salt
   * @returns a confirmation of sending a transaction on the starknet contract
   */
  public abstract deployContract(
    payload: DeployContractPayload
  ): Promise<DeployContractResponse>;

  /**
   * Declares a given compiled contract (json) to starknet
   *
   * @param payload payload to be deployed containing:
   * - compiled contract code
   * - optional version
   * @returns a confirmation of sending a transaction on the starknet contract
   */
  public abstract declareContract(
    payload: DeclareContractPayload
  ): Promise<DeclareContractResponse>;

  /**
   * Invokes a function on starknet
   * @deprecated This method wont be supported as soon as fees are mandatory
   *
   * @param invocation the invocation object containing:
   * - contractAddress - the address of the contract
   * - entrypoint - the entrypoint of the contract
   * - calldata - (defaults to []) the calldata
   * - signature - (defaults to []) the signature
   * @param details - optional details containing:
   * - nonce - optional nonce
   * - version - optional version
   * - maxFee - optional maxFee
   * @returns response from addTransaction
   */
  public abstract invokeFunction(
    invocation: Invocation,
    details?: InvocationsDetails
  ): Promise<InvokeFunctionResponse>;

  /**
   * Estimates the fee for a given transaction
   *
   * @param invocation the invocation object containing:
   * - contractAddress - the address of the contract
   * - entrypoint - the entrypoint of the contract
   * - calldata - (defaults to []) the calldata
   * - signature - (defaults to []) the signature
   * @param blockIdentifier - block identifier
   * @param details - optional details containing:
   * - nonce - optional nonce
   * - version - optional version
   * @returns the estimated fee
   */
  public abstract getEstimateFee(
    invocation: Invocation,
    blockIdentifier: BlockIdentifier,
    details?: InvocationsDetails
  ): Promise<EstimateFeeResponse>;

  /**
   * Wait for the transaction to be accepted
   * @param txHash - transaction hash
   * @param retryInterval - retry interval
   */
  public abstract waitForTransaction(
    txHash: BigNumberish,
    retryInterval?: number
  ): Promise<void>;
}
