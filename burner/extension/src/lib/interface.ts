import { ProviderInterface } from "starknet3x/provider/interface";
import { AccountInterface } from "starknet3x/account/interface";
import { StarknetChainId } from "starknet3x/constants";

export type EventType = "accountsChanged" | "networkChanged";
export type EventHandler = (data: any) => void;

import type { RpcMessage } from "./keyring";

export interface IStarknetWindowObject {
  id: string;
  name: string;
  version: string;
  icon: string;
  isConnected: boolean;
  selectedAddress?: string;
  chainId?: StarknetChainId;
  compatible: string;

  provider?: ProviderInterface;
  account?: AccountInterface;

  request: <T extends RpcMessage>(
    call: Omit<T, "result">
  ) => Promise<T["result"]>;
  enable: (options?: { showModal?: boolean }) => Promise<string[]>;
  isPreauthorized: () => Promise<boolean>;
  on: (event: EventType, handleEvent: EventHandler) => void;
  off: (event: EventType, handleEvent: EventHandler) => void;
}
