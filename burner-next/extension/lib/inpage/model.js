import { account } from "./account.js";
import { extensionEventHandler } from "./message.js";

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
};

export const registerWindow = () => {
  if (window) {
    window.addEventListener("message", extensionEventHandler);
    window["starknet-burner"] = starketWindow;
  }
};
