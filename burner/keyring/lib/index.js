import { accountEventHandler } from "./3.x/account";
import { keyringEventHandler } from "./keyring";
import { providerEventHandler } from "./3.x/provider";
import { newLog } from "./shared/log";

const log = newLog();

export const callbacks = {
  setDisplayed: () => {
    log.debug("setDisplayed is not already set");
  },
  resetSessionKey: () => {
    log.debug("resetSessionKey is not already set");
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
  log.debug(type, key, data);
  switch (type.split("_")[0]) {
    case "account3x":
      return await accountEventHandler(type, data, key);
    case "keyring":
      return await keyringEventHandler(type, data, key);
    case "provider3x":
      return await providerEventHandler(type, data, key);
    default:
      break;
  }
};

export const injectSets = ({ setDisplayed, resetSessionKey }) => {
  callbacks.setDisplayed = setDisplayed;
  callbacks.resetSessionKey = resetSessionKey;
};
