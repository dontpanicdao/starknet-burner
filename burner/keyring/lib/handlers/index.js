import { accountEventHandler } from "./account";
import { keyringEventHandler } from "./keyring";
import { providerEventHandler } from "./provider";
import { log } from "./keyring";

const uuid = "589c80c1eb85413d";

export const notify = (msg) => {
  if (!msg || typeof msg !== "object") {
    throw "unsupported message";
  }
  return window?.parent?.postMessage({ ...msg, uuid }, "*");
};

export const callbacks = {
  setDisplayed: () => {
    log("setDisplayed is not already set");
  },
  resetSessionKey: () => {
    log("resetSessionKey is not already set");
  },
};

export const eventHandler = async (event) => {
  if (event?.data?.uuid !== uuid) {
    return;
  }
  const { type, key, data } = event.data;
  if (typeof type !== "string") {
    return;
  }
  log("in:keyring", type, key, data);
  switch (type.split("_")[0]) {
    case "account":
      return await accountEventHandler(type, data, key);
    case "keyring":
      return await keyringEventHandler(type, data, key);
    case "provider":
      return await providerEventHandler(type, data, key);
    default:
      break;
  }
};

export const injectSets = ({ setDisplayed, resetSessionKey }) => {
  callbacks.setDisplayed = setDisplayed;
  callbacks.resetSessionKey = resetSessionKey;
};
