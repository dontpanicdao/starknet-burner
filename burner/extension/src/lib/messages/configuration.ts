import { StarknetChainId } from "starknet/constants";
import { sendMessage, waitForMessage } from "./index";

export type WatchAssetParameterOptions = {
  address: string;
  symbol?: string;
  decimals?: number;
  image?: string;
  name?: string;
};

export type WatchAssetParameters = {
  type: string;
  options: WatchAssetParameterOptions;
};

export type ActionResponse = {
  actionHash: string;
};

export type SwitchStarknetChainParameters = {
  chainId: StarknetChainId;
};

export type AddStarknetChainParameters = {
  id: string;
  name: string;
  chainId: StarknetChainId;
  baseUrl: string;
  rpcUrl: string;
  explorerUrl: string;
  accountClassHash: string;
};

export type ConfigMessage =
  | {
      type: "wallet_watchAsset";
      data: WatchAssetParameters;
    }
  | {
      type: "wallet_watchAssetResponse";
      data: ActionResponse;
    }
  | {
      type: "wallet_switchStarknetChain";
      data: SwitchStarknetChainParameters;
    }
  | {
      type: "wallet_switchStarknetChainResponse";
      data: boolean;
    }
  | {
      type: "wallet_addStarknetChain";
      data: AddStarknetChainParameters;
    }
  | {
      type: "wallet_addStarknetChainResponse";
      data: ActionResponse;
    };

export const switchStarknetChain = async (
  chainId: StarknetChainId
): Promise<boolean> => {
  sendMessage({
    type: "wallet_switchStarknetChain",
    data: {
      chainId,
    },
  });
  return await waitForMessage("wallet_switchStarknetChainResponse");
};

export const watchAsset = async (
  type: string,
  options: WatchAssetParameterOptions
): Promise<ActionResponse> => {
  sendMessage({
    type: "wallet_watchAsset",
    data: {
      type,
      options,
    },
  });
  return await waitForMessage("wallet_watchAssetResponse");
};

export const addStarknetChain = async (
  id: string,
  name: string,
  chainId: StarknetChainId,
  baseUrl: string,
  rpcUrl: string,
  explorerUrl: string,
  accountClassHash: string
): Promise<ActionResponse> => {
  sendMessage({
    type: "wallet_addStarknetChain",
    data: {
      id,
      name,
      chainId,
      baseUrl,
      rpcUrl,
      explorerUrl,
      accountClassHash,
    },
  });
  return await waitForMessage("wallet_addStarknetChainResponse");
};

request:;

export const request = <
  K extends ConfigMessage["type"],
  T extends ConfigMessage
>(
  type: K
): Promise<T extends { data: infer S } ? S : undefined> => {
  if (type === "wallet_watchAsset") {
    const out: WatchAssetParameters = {
      type: "ERC20",
      options: {
        address: "0x0000000000000000000000000000000000000000",
      },
    };
    return new Promise(() => out);
  }
  return new Promise(() => undefined);
};
