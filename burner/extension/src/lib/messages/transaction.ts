import type { Abi, Call, InvocationsDetails } from "starknet";

export interface EstimateFeeResponse {
  amount: string;
  unit: string;
  suggestedMaxFee: string;
}

export interface ExecuteTransactionRequest {
  transactions: Call | Call[];
  abis?: Abi[];
  transactionsDetail?: InvocationsDetails;
}

export type TransactionMessage = {
  type: "EXECUTE_TRANSACTION";
  data: ExecuteTransactionRequest;
};
