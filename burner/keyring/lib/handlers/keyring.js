import { getLocalStorage, removeLocalStorage } from "lib/handleLocalStorage";
import { StarknetChainId } from "starknet/constants";
import { notify, callbacks } from ".";

let debug = false;

export const log = (...args) => {
  if (debug) {
    console.log(...args.filter((val) => val !== undefined));
  }
};

export const keyringEventHandler = async (type, data, key) => {
  switch (type) {
    case "keyring_Ping":
      notify({ type: "keyring_Pong", data, key });
      break;
    case "keyring_OpenModal":
      callbacks.setDisplayed(true);
      notify({ type: "keyring_OpenModal", data: "ack", key });
      break;
    case "keyring_CloseModal":
      callbacks.setDisplayed(false);
      notify({ type: "keyring_CloseModal", data: "ack", key });
      break;
    case "keyring_SetDebug":
      console.log("in:keyring", "debug", "enabling");
      debug = true;
      notify({ type: "keyring_Debug", data: true, key });
      break;
    case "keyring_ClearDebug":
      debug = false;
      notify({ type: "keyring_Debug", data: false, key });
      break;
    case "keyring_CheckStatus":
      const storageSessionToken = getLocalStorage("bwsessiontoken");
      if (storageSessionToken) {
        const sessionToken = JSON.parse(storageSessionToken);
        if (sessionToken?.account) {
          notify({
            type: "keyring_CheckStatusResponse",
            data: {
              connected: true,
              addresses: [sessionToken?.account],
              network: StarknetChainId.TESTNET,
            },
            key,
          });
          return;
        }
      }
      notify({
        type: "keyring_CheckStatusResponse",
        data: { connected: false },
        key,
      });
      break;
    case "keyring_ResetSessionKey":
      removeLocalStorage("bwsessionkey");
      removeLocalStorage("bwsessiontoken");
      callbacks.resetSessionKey();
      notify({
        type: "keyring_CheckStatusResponse",
        data: { connected: false },
        key,
      });
      break;
    default:
      break;
  }
};
