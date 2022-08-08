import { toBN } from "starknet/utils/number";

export const ZERO = toBN(0);

export enum StarknetChainId {
  MAINNET = "0x534e5f4d41494e", // encodeShortString('SN_MAIN'),
  TESTNET = "0x534e5f474f45524c49", // encodeShortString('SN_GOERLI'),
}
