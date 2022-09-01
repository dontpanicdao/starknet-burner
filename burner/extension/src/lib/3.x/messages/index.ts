import { callContract } from "./provider";
import {
  enable,
  extensionEventHandler,
  request,
  KeyringMessage,
} from "./keyring";
import { on, off } from "./events";
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
