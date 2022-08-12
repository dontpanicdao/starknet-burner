import { account } from "./account";
//import { extensionEventHandler } from "./message";
import { version } from "../version";

const starketWindow = {
  id: "burner",
  request: async () => {},
  enable: async () => {},
  isPreauthorized: async () => {},
  on: () => {},
  off: () => {},
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
    // window.addEventListener("message", extensionEventHandler);
    Object.defineProperty(window, "starknet-burner", {
      value: starketWindow,
      writable: false,
    });
  }
};
