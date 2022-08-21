import { version } from "../version";
import { extensionEventHandler, request, enable, uuid } from "../messages";
import { on, off } from "../messages/events";
import { IStarknetWindowObject } from "./interface";
import { account } from "./account";
import { provider } from "./provider";
import { StarknetChainId } from "starknet/constants";

let debug = false;

export const setDebug = (mode: boolean) => {
  debug = mode;
};

export const log = (...args: any[]) => {
  if (debug) {
    console.log(...args);
  }
};

export const starketWindow: IStarknetWindowObject = {
  name: "burner",
  icon: "https://starknet-burner.vercel.app/fire.64.png",
  id: uuid,
  version: version,
  isConnected: false,
  selectedAddress: "",
  chainId: undefined,
  request,
  isPreauthorized: () => Promise.resolve(starketWindow.isConnected),
  enable,
  on,
  off,
  account,
  provider,
};

export const connectWindow = (network: StarknetChainId, address: string) => {
  starketWindow.isConnected = true;
  starketWindow.selectedAddress = address;
  starketWindow.chainId = network;
  starketWindow.provider = provider;
  starketWindow.account = account;
};

export const disconnectWindow = () => {
  starketWindow.isConnected = false;
  starketWindow.selectedAddress = "";
  starketWindow.chainId = undefined;
  starketWindow.provider = undefined;
  starketWindow.account = undefined;
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
