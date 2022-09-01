import { version } from "./version";
import { extensionEventHandler, request, enable } from "./keyring";
import { on, off } from "./events";
import { IStarknetWindowObject } from "./interface";
import { account } from "./3.x/account";
import { provider } from "./3.x/provider";
import { StarknetChainId } from "starknet3x/constants";

export const starknetWindow: IStarknetWindowObject = {
  name: "burner",
  icon: "https://starknet-burner.vercel.app/starknetburner-nobg.64.png",
  id: "burner",
  version,
  isConnected: false,
  selectedAddress: "",
  chainId: undefined,
  compatible: "3.x",
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

export const registerWindow = (version: string = "3.x") => {
  if (version !== "3.x") {
    throw "@burner/wallet only supports starknet-js 3.x";
  }
  if (window) {
    window.addEventListener("message", extensionEventHandler);
    Object.defineProperty(window, "starknet-burner", {
      value: starknetWindow,
      writable: false,
    });
  }
};
