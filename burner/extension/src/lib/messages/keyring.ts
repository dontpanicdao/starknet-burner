import { uuid } from "./index";

export type GlobalMessage =
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
      type: "keyring_NetworkChanged";
      data?: string;
    }
  | {
      type: "keyring_AccountsChanged";
      data?: string[];
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
