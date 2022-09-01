import {
  defaultTimeoutMilliseconds,
  MessageType,
  sendMessage,
  getKey,
  uuid,
} from "./default";
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
  key: string,
  predicate: (x: T) => boolean = () => true
): Promise<T extends { data: infer S } ? S : undefined> => {
  return new Promise((resolve, reject) => {
    const pid = setTimeout(
      () => reject(new Error("Timeout")),
      defaultTimeoutMilliseconds
    );
    const handler = (
      event: MessageEvent<WindowMessageType & { key: string }>
    ) => {
      if (
        event.data.type === type &&
        event.data.uuid === uuid &&
        event.data.key === key &&
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

export type RpcMessage =
  | {
      type: "keyring_Ping";
      params: string;
      result: string;
    }
  | {
      type: "keyring_SetDebug";
      result: boolean;
    }
  | {
      type: "keyring_ClearDebug";
      result: boolean;
    }
  | {
      type: "keyring_OpenModal";
      result: boolean;
    }
  | {
      type: "keyring_CloseModal";
      result: boolean;
    }
  | {
      type: "keyring_CheckStatus";
      result:
        | { connected: boolean; network: string; addresses: string[] }
        | undefined;
    }
  | {
      type: string;
      params: unknown;
      result: never;
    };

export const request = async <T extends RpcMessage>(
  call: Omit<T, "result">
): Promise<T["result"]> => {
  const type = call["type"];
  switch (type) {
    case "keyring_Ping": {
      const key = getKey();
      sendMessage({ type, data: "ping" } as MessageType, key);
      const msg = await waitForMessage("keyring_Ping", key);
      return msg;
    }
    case "keyring_SetDebug": {
      const key = getKey();
      setDebug(true);
      sendMessage({ type } as MessageType, key);
      const msg = await waitForMessage("keyring_Debug", key);
      return msg;
    }
    case "keyring_ClearDebug": {
      const key = getKey();
      setDebug(false);
      sendMessage({ type } as MessageType, key);
      const msg = await waitForMessage("keyring_Debug", key);
      return msg;
    }
    case "keyring_Disconnect": {
      disconnectWindow();
      return Promise.resolve(true);
    }
    case "keyring_OpenModal": {
      displayModal();
      displayIFrame();
      const key = getKey();
      sendMessage({ type } as MessageType, key);
      await waitForMessage("keyring_OpenModal", key);
      return Promise.resolve(true);
    }
    case "keyring_CloseModal": {
      hideIFrame();
      hideModal();
      const key = getKey();
      sendMessage({ type, data: "request" } as MessageType, key);
      await waitForMessage("keyring_CloseModal", key);
      await request({ type: "keyring_CheckStatus" });
      return Promise.resolve(true);
    }
    case "keyring_CheckStatus": {
      const key = getKey();
      sendMessage({ type } as MessageType, key);
      const status = await waitForMessage("keyring_CheckStatusResponse", key);
      if (!status || !status.connected) {
        disconnectWindow();
        return Promise.resolve(undefined);
      }
      const { connected, network, addresses } = status;
      if (
        !connected ||
        !addresses?.length ||
        addresses?.length === 0 ||
        !network
      ) {
        disconnectWindow();
        return Promise.resolve(undefined);
      }
      connectWindow(network, addresses[0]);
      return { connected, network, addresses };
    }
    case "keyring_ResetSessionKey": {
      const key = getKey();
      sendMessage({ type } as MessageType, key);
      const status = await waitForMessage("keyring_CheckStatusResponse", key);
      if (!status?.connected) {
        disconnectWindow();
        return Promise.resolve(undefined);
      }
      const { connected, network, addresses } = status;
      if (
        !connected ||
        !addresses?.length ||
        addresses?.length === 0 ||
        !network
      ) {
        return Promise.resolve(undefined);
      }
      return { connected, network, addresses };
    }
    default:
      return Promise.resolve(false);
  }
};

export const enable = async (options?: {
  showModal?: boolean;
}): Promise<string[]> => {
  if (options?.showModal) {
    request({ type: "keyring_OpenModal" });
    return Promise.resolve([]);
  }
  const key = getKey();
  sendMessage({ type: "keyring_CheckStatus" }, key);
  const status = await waitForMessage("keyring_CheckStatusResponse", key);
  if (!status || !status.connected) {
    disconnectWindow();
    request({ type: "keyring_OpenModal" });
    // TODO: We should wait for the person to close the window
    // And return the promise only when the account is set
    return Promise.resolve([]);
  }
  const { connected, network, addresses } = status;
  if (!connected || !addresses?.length || addresses?.length === 0 || !network) {
    disconnectWindow();
    request({ type: "keyring_OpenModal" });
    return Promise.resolve([]);
  }
  connectWindow(network, addresses[0]);
  return Promise.resolve([]);
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
      await request({ type: "keyring_CloseModal" });
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
