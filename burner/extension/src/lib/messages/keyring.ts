import { defaultTimeoutMilliseconds, sendMessage, uuid } from "./default";
import type { WindowMessageType } from "./default";

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
      sendMessage({ type });
      const msg = await waitForMessage("keyring_Debug");
      return new Promise(() => msg);
    }
    case "keyring_ClearDebug": {
      sendMessage({ type });
      const msg = await waitForMessage("keyring_Debug");
      return new Promise(() => msg);
    }
    case "keyring_ResetSessionKey": {
      sendMessage({ type });
      await waitForMessage("keyring_AccountsChanged");
      return new Promise(() => true);
    }
    case "keyring_Disconnect": {
      sendMessage({ type });
      await waitForMessage("keyring_AccountsChanged");
      return new Promise(() => true);
    }
    case "keyring_OpenModal": {
      sendMessage({ type });
      return new Promise(() => true);
    }
    case "keyring_CloseModal": {
      sendMessage({ type });
      return new Promise(() => true);
    }
  }
  return new Promise(() => undefined);
};

export type AccountsChangeEventHandler = (accounts: string[]) => void;

export type NetworkChangeEventHandler = (network?: string) => void;

export type WalletEventHandlers =
  | AccountsChangeEventHandler
  | NetworkChangeEventHandler;

export type WalletEvents =
  | {
      type: "accountsChanged";
      handler: AccountsChangeEventHandler;
    }
  | {
      type: "networkChanged";
      handler: NetworkChangeEventHandler;
    };

type eventManager = {
  networkChange: NetworkChangeEventHandler[];
  accountsChange: AccountsChangeEventHandler[];
};

const events: eventManager = {
  networkChange: [],
  accountsChange: [],
};

export const on = (event: string, handler: WalletEventHandlers) => {
  if (event === "networkChanged") {
    const networkHandler = handler as NetworkChangeEventHandler;
    if (events.networkChange.indexOf(networkHandler) === -1) {
      events.networkChange.push(networkHandler);
    }
  }
  if (event === "accountsChanged") {
    const accountsHandler = handler as AccountsChangeEventHandler;
    if (events.accountsChange.indexOf(accountsHandler) === -1) {
      events.accountsChange.push(accountsHandler);
    }
  }
};

export const off = (event: string, handler: WalletEventHandlers) => {
  if (event === "networkChanged") {
    const networkHandler = handler as NetworkChangeEventHandler;
    const key = events.networkChange.indexOf(networkHandler);
    if (key !== -1) {
      delete events.networkChange[key];
    }
  }
  if (event === "accountsChanged") {
    const accountsHandler = handler as AccountsChangeEventHandler;
    const key = events.accountsChange.indexOf(accountsHandler);
    if (key !== -1) {
      delete events.accountsChange[key];
    }
  }
};

export const extensionEventHandler = (event: MessageEvent) => {
  if (event?.data?.uuid !== uuid) {
    return;
  }
  const { type, data } = event.data;
  console.log("in:extension", type, data);
  switch (type) {
    case "keyring_Pong":
      break;
    case "keyring_OpenModal":
      break;
    case "keyring_CloseModal":
      break;
    case "keyring_NetworkChanged":
      events.networkChange.forEach((handler) => handler(data));
      break;
    case "keyring_AccountsChanged":
      events.accountsChange.forEach((handler) => handler(data));
      break;
    default:
      console.log("in:extension", "unknown event", type);
      break;
  }
};
