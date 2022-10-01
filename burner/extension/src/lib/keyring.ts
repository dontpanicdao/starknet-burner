import {
  sendMessage,
  waitForMessage,
  MessageType,
  getKey,
} from "./shared/message";

import { setDebug, module, level } from "./shared/log";
import { displayModal, hideModal } from "../components/modal";
import { displayIFrame, hideIFrame } from "../components/iframe";
import { StarknetChainId } from "starknet3x/constants";
import { connect, disconnect } from "./window";
import { infiniteTimeoutMilliseconds } from "./shared/config";
import { TokenId as tokenId, UsePin as usePin } from "..";

export type StatusResponse = {
  connected: boolean;
  network?: StarknetChainId;
  addresses?: string[];
};

export type OpenModal = {
  tokenId?: string;
  usePin?: boolean;
};

// KeyringAction defines the actions data and types used to to interact with
// Key Ring.
export type KeyringAction =
  | {
      type: "keyring_Ping";
      data: string;
    }
  | {
      type: "keyring_OpenModal";
      data?: OpenModal;
    }
  | {
      type: "keyring_CloseModal";
      data?: string;
    }
  | {
      type: "keyring_SetDebug";
      data?: Record<module, level>;
    }
  | {
      type: "keyring_ClearDebug";
    }
  | {
      type: "keyring_ResetSessionKey";
    }
  | {
      type: "keyring_CheckStatus";
    };

// KeyringResponse are keyring Events and Response sent back by Key Ring.
export type KeyringResponse =
  | {
      type: "keyring_Pong";
      data: string;
    }
  | {
      type: "keyring_OpenModalResponse";
      data?: string;
    }
  | {
      type: "keyring_CloseModalRequested";
      data?: string;
    }
  | {
      type: "keyring_CloseModalResponse";
      data?: string;
    }
  | {
      type: "keyring_NetworkChanged";
      data?: string;
    }
  | {
      type: "keyring_AccountsChanged";
      data?: string[];
    }
  | {
      type: "keyring_Debug";
      data: Record<module, level>;
    }
  | {
      type: "keyring_CheckStatusResponse";
      data: StatusResponse | undefined;
    };

export const keyringPing = async (
  data?: string
): Promise<string | undefined> => {
  const key = getKey();
  sendMessage(
    { type: "keyring_Ping", data: data || "ping" } as MessageType,
    key
  );
  const msg = await waitForMessage("keyring_Pong", key);
  return msg;
};

export const keyringSetDebug = async (): Promise<boolean> => {
  const key = getKey();
  setDebug(true);
  sendMessage({ type: "keyring_SetDebug" } as MessageType, key);
  const isDebug = await waitForMessage("keyring_Debug", key);
  return isDebug;
};

export const keyringClearDebug = async (): Promise<boolean> => {
  const key = getKey();
  setDebug(false);
  sendMessage({ type: "keyring_ClearDebug" } as MessageType, key);
  const isDebug = await waitForMessage("keyring_Debug", key);
  return !isDebug;
};

export const keyringOpenModal = async (): Promise<void> => {
  const key = getKey();
  displayModal();
  displayIFrame();
  sendMessage({ type: "keyring_OpenModal", data: { tokenId, usePin } }, key);
  return await waitForMessage("keyring_OpenModalResponse", key);
};

export const keyringCloseModal = async (): Promise<void> => {
  const key = getKey();
  hideModal();
  hideIFrame();
  sendMessage({ type: "keyring_CloseModal" } as MessageType, key);
  return await waitForMessage("keyring_CloseModalResponse", key);
};

export const keyringCheckStatus = async (): Promise<StatusResponse> => {
  const key = getKey();
  sendMessage({ type: "keyring_CheckStatus" } as MessageType, key);
  const status: StatusResponse = await waitForMessage(
    "keyring_CheckStatusResponse",
    key
  );
  if (!status.connected) {
    disconnect();
    return status;
  }
  connect(status.network, status.addresses[0]);
  return status;
};

export const keyringResetSessionKey = async (): Promise<StatusResponse> => {
  const key = getKey();
  sendMessage({ type: "keyring_ResetSessionKey" } as MessageType, key);
  const status: StatusResponse = await waitForMessage(
    "keyring_CheckStatusResponse",
    key
  );
  if (!status.connected) {
    disconnect();
    return status;
  }
  connect(status.network, status.addresses[0]);
  return status;
};

export const keyringWaitForCloseModal = async (): Promise<void> => {
  await waitForMessage(
    "keyring_CloseModalRequested",
    "close",
    infiniteTimeoutMilliseconds
  );
  return;
};
