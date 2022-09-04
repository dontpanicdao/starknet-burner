import { getLocalStorage, removeLocalStorage } from "lib/storage";
import { StarknetChainId } from "starknet/constants";
import { notify } from "./shared/message";
import { callbacks } from ".";

import { newLog, setDebug } from "./shared/log";
const log = newLog("KEYRING");

export const keyringEventHandler = async (type, data, key) => {
  switch (type) {
    case "keyring_Ping":
      notify({ type: "keyring_Pong", data, key });
      break;
    case "keyring_OpenModal":
      callbacks.setDisplayed(true);
      notify({ type: "keyring_OpenModalResponse", key });
      break;
    case "keyring_CloseModal":
      callbacks.setDisplayed(false);
      notify({ type: "keyring_CloseModalResponse", key });
      break;
    case "keyring_SetDebug":
      log.log("debug", "enabling");
      setDebug(true);
      notify({ type: "keyring_Debug", data: true, key });
      break;
    case "keyring_ClearDebug":
      log.debug("debug", "disabling");
      setDebug(false);
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
