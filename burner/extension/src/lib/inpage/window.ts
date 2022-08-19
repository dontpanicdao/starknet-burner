import { version } from "../version";
import { sendMessage, extensionEventHandler } from "../messages";
import { IStarknetWindowObject } from "./interface";
import { account } from "./account";
import { WatchAssetParameters } from "../messages";
import { uuid } from "../messages";
import { provider } from "./provider";
export type EventType = "accountsChanged" | "networkChanged";
export type EventHandler = (data: any) => void;

export const starketWindow: IStarknetWindowObject = {
  name: "burner",
  icon: "https://burnerfactory.com/assets/images/burner-logo.png",
  id: uuid,
  version: version,
  isConnected: false,
  request: (type) => {
    if (type === "wallet_watchAsset") {
      const out: WatchAssetParameters = {
        type: "ERC20",
        options: {
          address: "0x0000000000000000000000000000000000000000",
        },
      };
      return new Promise(() => out);
    }
    return new Promise(() => undefined);
  },
  isPreauthorized: () => Promise.resolve(false),
  enable: () => Promise.resolve([]),
  on: (_, __) => {},
  off: (_, __) => {},
  account,
};

export const registerWindow = () => {
  if (window) {
    window.addEventListener("message", extensionEventHandler);
    Object.defineProperty(window, "starknet-burner", {
      value: starketWindow,
      writable: false,
    });
  }
};

export const exposeRequest = () => {
  if (window) {
    Object.defineProperty(window, "burner-request", {
      value: {
        sendMessage,
        provider,
      },
      writable: false,
    });
  }
};
