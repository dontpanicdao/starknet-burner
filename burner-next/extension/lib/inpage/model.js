import { account } from "./account.js";
import { extensionEventHandler } from "./message.js";
import { version } from "../version.js";

const starketWindow = {
  id: "burner",
  request: async (call) => {},
  enable: async (options) => {},
  isPreauthorized: async () => {},
  on: (event, handleEvent) => {},
  off: (event, handleEvent) => {},
  account,
  provider: null,
  selectedAddress: null,
  chainId: null,
  version: null,
  burnerExtension: {
    version,
  },
};

export const registerWindow = () => {
  if (window) {
    window.addEventListener("message", extensionEventHandler);
    window["starknet-burner"] = starketWindow;
  }
};
