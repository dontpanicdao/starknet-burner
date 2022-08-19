import { ConfigMessage } from "../messages";

import { ProviderInterface } from "starknet/provider/interface";
import { AccountInterface } from "starknet/account/interface";

export type EventType = "accountsChanged" | "networkChanged";
export type EventHandler = (data: any) => void;

export interface IStarknetWindowObject {
  id: string;
  name: string;
  version: string;
  icon: string;
  isConnected: boolean;
  selectedAddress?: string;

  provider?: ProviderInterface;
  account?: AccountInterface;

  request: <K extends ConfigMessage["type"], T extends ConfigMessage>(
    type: K
  ) => Promise<T extends { data: infer S } ? S : undefined>;
  enable: (options?: { showModal?: boolean }) => Promise<string[]>;
  isPreauthorized: () => Promise<boolean>;
  on: (event: EventType, handleEvent: EventHandler) => void;
  off: (event: EventType, handleEvent: EventHandler) => void;
}
