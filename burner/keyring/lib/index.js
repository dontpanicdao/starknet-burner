import { accountEventHandler } from "./3.x/account";
import { keyringEventHandler } from "./keyring";
import { providerEventHandler } from "./3.x/provider";
import { newLog } from "./shared/log";
import { uuid } from "./shared/config";

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
  if (
    !event ||
    !event.data ||
    !event.data.uuid ||
    !event.data.key ||
    !event.data.uuid ||
    event.data.uuid !== uuid
  ) {
    return;
  }
  const { type: t, key } = event.data;
  const data = event.data?.data ?? "";
  if (typeof t !== "string") {
    return;
  }
  if (t.startsWith("keyring")) {
    return await keyringEventHandler(t, data, key);
  }
  if (t.startsWith("account3x")) {
    return await accountEventHandler(t, data, key);
  }
  if (t.startsWith("provider3x")) {
    return await providerEventHandler(t, data, key);
  }
};

export const injectSets = ({ setDisplayed, resetSessionKey }) => {
  callbacks.setDisplayed = setDisplayed;
  callbacks.resetSessionKey = resetSessionKey;
};
