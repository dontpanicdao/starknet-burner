import { StarknetChainId } from "starknet3x/constants";
import { sendMessage, waitForMessage, getKey } from "./shared/message";

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
  const key = getKey();
  sendMessage(
    {
      type: "wallet_switchStarknetChain",
      data: {
        chainId,
      },
    },
    key
  );
  return await waitForMessage("wallet_switchStarknetChainResponse", key);
};

export const watchAsset = async (
  type: string,
  options: WatchAssetParameterOptions
): Promise<ActionResponse> => {
  const key = getKey();
  sendMessage(
    {
      type: "wallet_watchAsset",
      data: {
        type,
        options,
      },
    },
    key
  );
  return await waitForMessage("wallet_watchAssetResponse", key);
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
  const key = getKey();
  sendMessage(
    {
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
    },
    key
  );
  return await waitForMessage("wallet_addStarknetChainResponse", key);
};
