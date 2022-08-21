import { defaultTimeoutMilliseconds, sendMessage, uuid } from "./default";
import type { WindowMessageType } from "./default";
import { displayModal, hideModal } from "../../components/modal";
import { displayIFrame, hideIFrame } from "../../components/iframe";
import { StarknetChainId } from "starknet/constants";
import {
  connectWindow,
  disconnectWindow,
  setDebug,
  log,
} from "../inpage/window";
import { executeNetworkHandler, executeAccountsHandler } from "./events";
export type StatusResponse = {
  connected: boolean;
  network?: StarknetChainId;
  addresses?: string[];
};

// KeyringMessage are the management messages to interact with the key ring.
export type KeyringMessage =
  | {
      type: "keyring_Ping";
      data: string;
    }
  | {
      type: "keyring_Pong";
      data: string;
    }
  | {
      type: "keyring_OpenModal";
      data?: string;
    }
  | {
      type: "keyring_CloseModal";
      data?: string;
    }
  | {
      type: "keyring_CloseModalRequested";
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
      data: boolean;
    }
  | {
      type: "keyring_SetDebug";
    }
  | {
      type: "keyring_ClearDebug";
    }
  | {
      type: "keyring_ResetSessionKey";
    }
  | {
      type: "keyring_Disconnect";
    }
  | {
      type: "keyring_CheckStatus";
    }
  | {
      type: "keyring_CheckStatusResponse";
      data: StatusResponse | undefined;
    };

export const waitForMessage = async <
  K extends KeyringMessage["type"],
  T extends { type: K } & KeyringMessage
>(
  type: K,
  predicate: (x: T) => boolean = () => true
): Promise<T extends { data: infer S } ? S : undefined> => {
  return new Promise((resolve, reject) => {
    const pid = setTimeout(
      () => reject(new Error("Timeout")),
      defaultTimeoutMilliseconds
    );
    const handler = (event: MessageEvent<WindowMessageType>) => {
      if (
        event.data.type === type &&
        event.data.uuid === uuid &&
        predicate(event.data as any)
      ) {
        clearTimeout(pid);
        window.removeEventListener("message", handler);
        return resolve(
          ("data" in event.data ? event.data.data : undefined) as any
        );
      }
    };
    window.addEventListener("message", handler);
  });
};

export const request = async <
  K extends KeyringMessage["type"],
  T extends KeyringMessage
>(
  type: K
): Promise<T extends { data: infer S } ? S : undefined> => {
  switch (type) {
    case "keyring_Ping": {
      sendMessage({ type, data: "ping" });
      const msg = await waitForMessage("keyring_Pong");
      return new Promise(() => msg);
    }
    case "keyring_SetDebug": {
      setDebug(true);
      sendMessage({ type });
      const msg = await waitForMessage("keyring_Debug");
      return new Promise(() => msg);
    }
    case "keyring_ClearDebug": {
      setDebug(false);
      sendMessage({ type });
      const msg = await waitForMessage("keyring_Debug");
      return new Promise(() => msg);
    }
    case "keyring_Disconnect": {
      disconnectWindow();
      return new Promise(() => true);
    }
    case "keyring_OpenModal": {
      displayModal();
      displayIFrame();
      sendMessage({ type });
      await waitForMessage("keyring_OpenModal");
      return new Promise(() => true);
    }
    case "keyring_CloseModal": {
      hideIFrame();
      hideModal();
      sendMessage({ type, data: "request" });
      await waitForMessage("keyring_CloseModal");
      await request("keyring_CheckStatus");
      return new Promise(() => true);
    }
    case "keyring_CheckStatus": {
      sendMessage({ type });
      const status = await waitForMessage("keyring_CheckStatusResponse");
      if (!status || !status.connected) {
        disconnectWindow();
        return new Promise(() => undefined);
      }
      const { connected, network, addresses } = status;
      if (
        !connected ||
        !addresses?.length ||
        addresses?.length === 0 ||
        !network
      ) {
        disconnectWindow();
        return new Promise(() => undefined);
      }
      connectWindow(network, addresses[0]);
      return new Promise(() => status);
    }
    case "keyring_ResetSessionKey": {
      sendMessage({ type });
      const status = await waitForMessage("keyring_CheckStatusResponse");
      if (!status?.connected) {
        disconnectWindow();
        return new Promise(() => status);
      }
      return new Promise(() => status);
    }
    default:
      return new Promise(() => false);
  }
};

export const enable = async (options?: {
  showModal?: boolean;
}): Promise<string[]> => {
  if (options?.showModal) {
    request("keyring_OpenModal");
    return new Promise(() => []);
  }
  sendMessage({ type: "keyring_CheckStatus" });
  const status = await waitForMessage("keyring_CheckStatusResponse");
  if (!status || !status.connected) {
    disconnectWindow();
    request("keyring_OpenModal");
    return new Promise(() => []);
  }
  const { connected, network, addresses } = status;
  if (!connected || !addresses?.length || addresses?.length === 0 || !network) {
    disconnectWindow();
    request("keyring_OpenModal");
    return new Promise(() => []);
  }
  connectWindow(network, addresses[0]);
  return new Promise(() => [addresses[0]]);
};

export const extensionEventHandler = async (event: MessageEvent) => {
  if (event?.data?.uuid !== uuid) {
    return;
  }
  const { type, data } = event.data;
  log("in:extension", type, data);
  switch (type) {
    case "keyring_Pong":
      break;
    case "keyring_OpenModal":
      break;
    case "keyring_CloseModal":
      hideModal();
      hideIFrame();
      break;
    case "keyring_NetworkChanged":
      executeNetworkHandler(data);
      break;
    case "keyring_AccountsChanged":
      executeAccountsHandler(data);
      break;
    case "keyring_CloseModalRequested":
      await request("keyring_CloseModal");
      break;
    case "keyring_Debug":
      break;
    case "keyring_CheckStatusResponse":
      break;
    default:
      log("in:extension", "unknown", type);
      break;
  }
};
