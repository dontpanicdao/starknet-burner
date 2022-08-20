import { version } from "../version";
import {
  extensionEventHandler,
  on,
  off,
  request,
  enable,
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
  isPreauthorized: () => Promise.resolve(starketWindow.isConnected),
  enable,
  on,
  off,
  account,
  provider,
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
