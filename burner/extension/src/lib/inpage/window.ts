import { version } from "../version";
import {
  sendMessage,
  extensionEventHandler,
  on,
  off,
  request,
  uuid,
} from "../messages";
import { IStarknetWindowObject } from "./interface";
import { account } from "./account";
import { provider } from "./provider";

export const starketWindow: IStarknetWindowObject = {
  name: "burner",
  icon: "https://starknet-burner.vercel.app/fire.64.png",
  id: uuid,
  version: version,
  isConnected: false,
  request,
  isPreauthorized: () => Promise.resolve(true),
  enable: () => Promise.resolve([]),
  on,
  off,
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
