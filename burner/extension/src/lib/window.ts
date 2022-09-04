import { version } from "./version";
import { on, off } from "./events";
import { IStarknetWindowObject } from "./interface";
import { account as account0 } from "./disabled/account";
import { account as account3x } from "./3.x/account";
import { provider as provider3x } from "./3.x/provider";
import { StarknetChainId } from "starknet3x/constants";
import { eventHandler } from "./events";
import { RpcMessage } from "./interface";
import {
  keyringPing,
  keyringSetDebug,
  keyringClearDebug,
  keyringCheckStatus,
  keyringResetSessionKey,
  keyringOpenModal,
  keyringCloseModal,
  keyringWaitForCloseModal,
} from "./keyring";

export const request = async <T extends RpcMessage>(
  call: Omit<T, "result">
): Promise<T["result"]> => {
  const type = call["type"];
  switch (type) {
    case "keyring_Ping":
      return await keyringPing();
    case "keyring_SetDebug":
      return await keyringSetDebug();
    case "keyring_ClearDebug":
      return await keyringClearDebug();
    case "keyring_Disconnect": {
      disconnect();
      return Promise.resolve(true);
    }
    case "keyring_CheckStatus":
      return keyringCheckStatus();
    case "keyring_ResetSessionKey":
      return await keyringResetSessionKey();
    default:
      return Promise.resolve(false);
  }
};

export const enable = async (options?: {
  showModal?: boolean;
  partial?: boolean;
}): Promise<string[]> => {
  if (options?.partial) {
    partialConnect(StarknetChainId.TESTNET);
    return ["0x0"];
  }
  if (!options || !options.showModal) {
    const status = await keyringCheckStatus();
    if (status.connected) {
      connect(status.network, status.addresses[0]);
      return status.addresses;
    }
  }
  await keyringOpenModal();
  await keyringWaitForCloseModal();
  await keyringCloseModal();
  const status = await keyringCheckStatus();
  if (status?.connected) {
    connect(status.network, status.addresses[0]);
    return status.addresses;
  }
  disconnect();
  return [];
};

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
  account: account3x,
  provider: provider3x,
};

export const connect = (network: StarknetChainId, address: string) => {
  starknetWindow.isConnected = true;
  starknetWindow.selectedAddress = address;
  starknetWindow.chainId = network;
  starknetWindow.provider = provider3x;
  account3x.address = address;
  starknetWindow.account = account3x;
};

export const partialConnect = (network: StarknetChainId) => {
  starknetWindow.isConnected = true;
  starknetWindow.selectedAddress = "0x0";
  starknetWindow.chainId = network;
  starknetWindow.provider = provider3x;
  account0.address = "0x0";
  starknetWindow.account = account0;
};

export const disconnect = () => {
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
    window.addEventListener("message", eventHandler);
    Object.defineProperty(window, "starknet-burner", {
      value: starknetWindow,
      writable: false,
    });
  }
};
