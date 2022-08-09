import { StarknetChainId } from "starknet/constants";
import {
  BlockTag,
  Call,
  DeclareContractPayload,
  DeployContractPayload,
  Invocation,
  InvocationsDetails,
} from "starknet/types/lib";

import {
  CallContractResponse,
  ContractClass,
  DeclareContractResponse,
  DeployContractResponse,
  EstimateFeeResponse,
  GetBlockResponse,
  GetCodeResponse,
  GetTransactionReceiptResponse,
  GetTransactionResponse,
  InvokeFunctionResponse,
  InvokeTransactionReceiptResponse,
} from "starknet/types/provider";
import { BigNumberish, toBN } from "starknet/utils/number";
import { ProviderInterface } from "starknet/provider/interface";
import { BlockIdentifier } from "starknet/provider/utils";

export class Provider implements ProviderInterface {
  constructor() {}

  public get chainId(): StarknetChainId {
    return StarknetChainId.TESTNET;
  }

  public async getBlock(
    _: BlockIdentifier = "pending"
  ): Promise<GetBlockResponse> {
    const response: GetBlockResponse = {
      accepted_time: 123,
      block_hash: "0x0",
      block_number: 0,
      gas_price: "0x0",
      new_root: "0x0",
      parent_hash: "0x0",
      sequencer: "0x0",
      status: "PENDING",
      transactions: [],
    };
    return response;
  }

  public async getClassAt(
    _: string,
    __: BlockIdentifier = "pending"
  ): Promise<ContractClass> {
    const response: ContractClass = {
      program: "0x0",
      entry_points_by_type: {},
    };
    return response;
  }

  public async getEstimateFee(
    _: Invocation,
    __: BlockIdentifier = "pending",
    ___: InvocationsDetails = {}
  ): Promise<EstimateFeeResponse> {
    const response: EstimateFeeResponse = {
      overall_fee: toBN(0),
      gas_consumed: toBN(0),
      gas_price: toBN(0),
    };
    return response;
  }

  public async getStorageAt(
    _: string,
    key: BigNumberish,
    __: BlockTag | BigNumberish = "pending"
  ): Promise<BigNumberish> {
    const response: BigNumberish = key;
    return response;
  }

  public async getTransaction(
    _: BigNumberish
  ): Promise<GetTransactionResponse> {
    const response: GetTransactionResponse = {
      calldata: [],
    };
    return response;
  }

  public async getTransactionReceipt(
    _: BigNumberish
  ): Promise<GetTransactionReceiptResponse> {
    const response: InvokeTransactionReceiptResponse = {
      messages_sent: [],
      status: "PENDING",
      transaction_hash: "0x0",
      events: [],
    };
    return response;
  }

  public async callContract(
    _: Call,
    __: BlockIdentifier = "pending"
  ): Promise<CallContractResponse> {
    const response: CallContractResponse = {
      result: [],
    };
    return response;
  }

  public async invokeFunction(
    _: Invocation,
    __: InvocationsDetails
  ): Promise<InvokeFunctionResponse> {
    const response: InvokeFunctionResponse = {
      transaction_hash: "0x0",
    };
    return response;
  }

  public async deployContract(
    _: DeployContractPayload
  ): Promise<DeployContractResponse> {
    const response: DeployContractResponse = {
      transaction_hash: "0x0",
      contract_address: "0x0",
    };
    return response;
  }

  public async declareContract(
    _: DeclareContractPayload
  ): Promise<DeclareContractResponse> {
    const response: DeclareContractResponse = {
      transaction_hash: "0x0",
      class_hash: "0x0",
    };
    return response;
  }

  public async getCode(
    _: string,
    __?: BlockIdentifier
  ): Promise<GetCodeResponse> {
    const response: GetCodeResponse = { bytecode: ["000"] };
    return response;
  }

  public async waitForTransaction(_: BigNumberish, __?: number): Promise<void> {
    return;
  }
}
