// EIP-747:
// https://github.com/ethereum/EIPs/blob/master/EIPS/eip-747.md
export type WatchAssetParameters = {
  type: string; // The asset's interface, e.g. 'ERC20'
  options: {
    address: string; // The hexadecimal StarkNet address of the token contract
    symbol?: string; // A ticker symbol or shorthand, up to 5 alphanumerical characters
    decimals?: number; // The number of asset decimals
    image?: string; // A string url of the token logo
    name?: string; // The name of the token - not in spec
  };
};

export type ConfigMessage = {
  type: "wallet_watchAsset";
  data: WatchAssetParameters;
};
