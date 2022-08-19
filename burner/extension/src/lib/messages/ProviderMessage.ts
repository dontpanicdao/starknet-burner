// import { Call } from "starknet/types/lib";
import { BlockIdentifier } from "starknet/provider/utils";
import { CallContractResponse } from "starknet/types/provider";

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
  return waitForMessage("CALL_CONTRACT_RES");
};
