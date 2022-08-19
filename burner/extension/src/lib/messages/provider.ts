import { BlockIdentifier } from "starknet/provider/utils";
import { CallContractResponse, GetBlockResponse } from "starknet/types";

import type { Abi, Call } from "starknet";
import { sendMessage, waitForMessage } from "./index";

export interface CallContractRequest {
  transactions: Call | Call[];
  blockIdentifier?: BlockIdentifier;
  abis?: Abi[];
}

export type ProviderMessage =
  | {
      type: "CALL_CONTRACT";
      data: CallContractRequest;
    }
  | {
      type: "CALL_CONTRACT_RES";
      data: CallContractResponse;
    }
  | {
      type: "GET_BLOCK";
      data: BlockIdentifier;
    }
  | {
      type: "GET_BLOCK_RES";
      data: GetBlockResponse;
    };

export const callContract = async (
  call: Call,
  blockIdentifier: BlockIdentifier = "pending"
): Promise<CallContractResponse> => {
  sendMessage({
    type: "CALL_CONTRACT",
    data: {
      transactions: call,
      blockIdentifier,
    },
  });
  return await waitForMessage("CALL_CONTRACT_RES");
};

export const getBlock = async (
  blockIdentifier: BlockIdentifier = "pending"
): Promise<GetBlockResponse> => {
  sendMessage({
    type: "GET_BLOCK",
    data: {
      blockIdentifier,
    },
  });
  return await waitForMessage("GET_BLOCK_RES");
};
