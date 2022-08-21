import { KeyringMessage } from "../messages";

import { ProviderInterface } from "starknet/provider/interface";
import { AccountInterface } from "starknet/account/interface";
import { StarknetChainId } from "starknet/constants";

export type EventType = "accountsChanged" | "networkChanged";
export type EventHandler = (data: any) => void;

export interface IStarknetWindowObject {
  id: string;
  name: string;
  version: string;
  icon: string;
  isConnected: boolean;
  selectedAddress?: string;
  chainId?: StarknetChainId;

  provider?: ProviderInterface;
  account?: AccountInterface;

  request: <K extends KeyringMessage["type"], T extends KeyringMessage>(
    type: K
  ) => Promise<T extends { data: infer S } ? S : undefined>;
  enable: (options?: { showModal?: boolean }) => Promise<string[]>;
  isPreauthorized: () => Promise<boolean>;
  on: (event: EventType, handleEvent: EventHandler) => void;
  off: (event: EventType, handleEvent: EventHandler) => void;
}
