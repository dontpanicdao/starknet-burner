import { version } from "../version";
import {
  RpcMessage,
  IStarknetWindowObject,
  EventType,
  EventHandler,
} from "../interface/get-starknet";
import { request, extensionEventHandler } from "./message";

import { account } from "./account";
import { AccountInterface } from "starknet/account/interface";
import { Provider } from "./provider";

export class StarknetWindowObject implements IStarknetWindowObject {
  public name: string = "burner";
  public icon: string =
    "https://burnerfactory.com/assets/images/burner-logo.png";
  public id: string = "burner";
  public version = version;
  public request<T extends RpcMessage>(
    _: Omit<T, "result">
  ): Promise<T["result"]> {
    return new Promise((resolve, _) => {
      return resolve(true);
    });
  }
  public isConnected = false;
  public isPreauthorized = () => Promise.resolve(false);
  public enable = () => Promise.resolve([]);
  public on = (_: EventType, __: EventHandler): void => {};

  public off = (_: EventType, __: EventHandler): void => {};
  public account: AccountInterface | undefined = undefined;
  public provider = new Provider();
}

export const starketWindow: IStarknetWindowObject = {
  name: "burner2",
  icon: "https://burnerfactory.com/assets/images/burner-logo.png",
  id: "burner",
  version: version,
  isConnected: false,
  request: <T extends RpcMessage>(
    _: Omit<T, "result">
  ): Promise<T["result"]> => {
    return new Promise((resolve, _) => {
      console.log("me");
      return resolve(true);
    });
  },
  isPreauthorized: () => Promise.resolve(false),
  enable: () => Promise.resolve([]),
  on: (_, __) => {},
  off: (_, __) => {},
  account,
  provider: new Provider(),
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

export const exposeRequest = (debug: boolean) => {
  if (window) {
    Object.defineProperty(window, "burner-request", {
      value: {
        request,
        debug,
      },
      writable: false,
    });
  }
};
