import { getLocalStorage, removeLocalStorage } from "lib/handleLocalStorage";
import { StarknetChainId } from "starknet/constants";
import { notify, callBacks } from ".";

let debug = false;

export const log = (...args) => {
  if (debug) {
    console.log(...args.filter((val) => val !== undefined));
  }
};

export const keyringEventHandler = async (type, data) => {
  switch (type) {
    case "keyring_Ping":
      notify({ type: "keyring_Pong", data });
      break;
    case "keyring_OpenModal":
      callBacks.setDisplay(true);
      notify({ type: "keyring_OpenModal", data: "ack" });
      break;
    case "keyring_CloseModal":
      callBacks.setDisplay(false);
      notify({ type: "keyring_CloseModal", data: "ack" });
      break;
    case "keyring_SetDebug":
      console.log("in:keyring", "debug", "enabling");
      debug = true;
      notify({ type: "keyring_Debug", data: true });
      break;
    case "keyring_ClearDebug":
      debug = false;
      notify({ type: "keyring_Debug", data: false });
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
          });
          return;
        }
      }
      notify({
        type: "keyring_CheckStatusResponse",
        data: { connected: false },
      });
      break;
    case "keyring_ResetSessionKey":
      removeLocalStorage("bwsessionkey");
      removeLocalStorage("bwsessiontoken");
      notify({
        type: "keyring_CheckStatusResponse",
        data: { connected: false },
      });
      break;
    default:
      break;
  }
};
