import { callContract } from "./provider";
import { enable, extensionEventHandler, request, on, off } from "./keyring";
import { KeyringMessage } from "./keyring";
import { uuid } from "./default";
import type { MessageType } from "./default";
import {
  estimateFee,
  execute,
  getNonce,
  hashMessage,
  signMessage,
  verifyMessage,
  verifyMessageHash,
} from "./account";

export type { KeyringMessage, MessageType };
export {
  callContract,
  enable,
  estimateFee,
  execute,
  extensionEventHandler,
  getNonce,
  hashMessage,
  off,
  on,
  request,
  signMessage,
  uuid,
  verifyMessage,
  verifyMessageHash,
};
