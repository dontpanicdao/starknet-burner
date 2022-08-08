import { extensionEventHandler } from "./message";
import { version } from "../version";
import { IStarketWindowObject, RpcMessage, WalletEvents } from "./model";
import { Account, account } from "./account";
import { Provider } from "./provider";

export class StarknetWindowObject implements IStarketWindowObject {
  public id: string = "burner";
  public version = version;
  public request<T extends RpcMessage>(
    _: Omit<T, "result">
  ): Promise<T["result"]> {
    return new Promise((resolve, _) => {
      return resolve(true);
    });
  }
  public isPreauthorized = () => Promise.resolve(false);
  public enable = () => Promise.resolve([]);
  public on = (
    _: WalletEvents["type"],
    __: WalletEvents["handler"]
  ): void => {};

  public off = (
    _: WalletEvents["type"],
    __: WalletEvents["handler"]
  ): void => {};
  public account: Account | undefined = undefined;
  public provider = new Provider();
}

export const starketWindow: StarknetWindowObject = {
  id: "burner",
  version: version,
  request: <T extends RpcMessage>(
    _: Omit<T, "result">
  ): Promise<T["result"]> => {
    return new Promise((resolve, _) => {
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
