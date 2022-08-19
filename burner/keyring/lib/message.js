import { accountEventHandler } from "./handlers/account";
import { keyringEventHandler } from "./handlers/keyring";
import { providerEventHandler } from "./handlers/provider";

const uuid = "589c80c1eb85413d";

export const notify = (msg) => {
  if (!msg || typeof msg !== "object") {
    throw "unsupported message";
  }
  return window?.parent?.postMessage({ ...msg, uuid }, "*");
};

export const callBacks = {
  setDisplay: () => {
    console.log("setDisplay is not already set");
  },
};

export const eventHandler = async (event) => {
  if (event?.data?.uuid !== uuid) {
    return;
  }
  const { type, data } = event.data;
  if (typeof type !== "string") {
    return;
  }
  console.log("in:keyring", type, data);
  switch (type.split("_")[0]) {
    case "account":
      return await accountEventHandler(type, data);
    case "keyring":
      return await keyringEventHandler(type, data);
    case "provider":
      return await providerEventHandler(type, data);
    default:
      break;
  }
};

export const injectSetDisplay = (fn) => {
  callBacks.setDisplay = fn;
};
