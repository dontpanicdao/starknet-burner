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
      type: "provider_CallContract";
      data: CallContractRequest;
    }
  | {
      type: "provider_CallContractResponse";
      data: CallContractResponse;
    }
  | {
      type: "provider_GetBlock";
      data: BlockIdentifier;
    }
  | {
      type: "provider_GetBlockResponse";
      data: GetBlockResponse;
    };

export const callContract = async (
  call: Call,
  blockIdentifier: BlockIdentifier = "pending"
): Promise<CallContractResponse> => {
  sendMessage({
    type: "provider_CallContract",
    data: {
      transactions: call,
      blockIdentifier,
    },
  });
  return await waitForMessage("provider_CallContractResponse");
};

export const getBlock = async (
  blockIdentifier: BlockIdentifier = "pending"
): Promise<GetBlockResponse> => {
  sendMessage({
    type: "provider_GetBlock",
    data: {
      blockIdentifier,
    },
  });
  return await waitForMessage("provider_GetBlockResponse");
};
