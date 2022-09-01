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

export const starknetWindow: IStarknetWindowObject = {
  name: "burner",
  icon: "https://starknet-burner.vercel.app/starknetburner-nobg.64.png",
  id: "burner",
  version: version,
  isConnected: false,
  selectedAddress: "",
  chainId: undefined,
  request,
  isPreauthorized: () => Promise.resolve(starknetWindow.isConnected),
  enable,
  on,
  off,
  account,
  provider,
};

export const connectWindow = (network: StarknetChainId, address: string) => {
  starknetWindow.isConnected = true;
  starknetWindow.selectedAddress = address;
  starknetWindow.chainId = network;
  starknetWindow.provider = provider;
  starknetWindow.account = account;
  starknetWindow.account.address = address;
};

export const disconnectWindow = () => {
  starknetWindow.isConnected = false;
  starknetWindow.selectedAddress = "";
  starknetWindow.chainId = undefined;
  starknetWindow.provider = undefined;
  starknetWindow.account = undefined;
};

export const registerWindow = () => {
  if (window) {
    window.addEventListener("message", extensionEventHandler);
    Object.defineProperty(window, "starknet-burner", {
      value: starknetWindow,
      writable: false,
    });
  }
};
