import { uuid } from "./shared/config";
import { newLog } from "./shared/log";

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

export const executeNetworkHandler = (network: string) => {
  events.networkChange.forEach((handler) => handler(network));
};

export const executeAccountsHandler = (addresses: string[]) => {
  events.accountsChange.forEach((handler) => handler(addresses));
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

const log = newLog();

export const eventHandler = async (event: MessageEvent) => {
  if (event?.data?.uuid !== uuid || event?.data?.key) {
    return;
  }
  const { type, data } = event.data;
  log.debug(type, data);
  switch (type) {
    case "keyring_NetworkChanged":
      executeNetworkHandler(data);
      break;
    case "keyring_AccountsChanged":
      executeAccountsHandler(data);
      break;
    default:
      break;
  }
};
