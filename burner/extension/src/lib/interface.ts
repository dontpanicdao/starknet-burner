import { ProviderInterface } from "starknet3x/provider/interface";
import { AccountInterface } from "starknet3x/account/interface";
import { StarknetChainId } from "starknet3x/constants";

export type EventType = "accountsChanged" | "networkChanged";
export type EventHandler = (data: any) => void;

/**
 * The messages used to send requests from the application to the wallet.
 *
 * **Warning**
 * This types includes both the request parameters that are actually made of
 * - { type, params } that are used as a input parameters in a map
 * - result that is used as an output parameter without the map
 *
 * Basic usage example:
 *
 * ```ts
 * const result: string = await request({type: "keyring_Ping", params: "msg"});
 * console.log(result) // returns "msg"
 * ```
 */
export type RpcMessage =
  | {
      type: "keyring_Ping";
      params: string;
      result: string;
    }
  | {
      type: "keyring_SetDebug";
      result: boolean;
    }
  | {
      type: "keyring_ClearDebug";
      result: boolean;
    }
  | {
      type: "keyring_OpenModal";
      result: boolean;
    }
  | {
      type: "keyring_CloseModal";
      result: boolean;
    }
  | {
      type: "keyring_CheckStatus";
      result:
        | { connected: boolean; network?: string; addresses?: string[] }
        | undefined;
    }
  | {
      type: string;
      params: unknown;
      result: never;
    };

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
