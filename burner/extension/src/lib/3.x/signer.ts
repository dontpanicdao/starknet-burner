import { SignerInterface } from "starknet3x/signer/interface";
import { log } from "../shared/log";

export const signer: SignerInterface = {
  getPubKey: async () => {
    return "0x";
  },
  signTransaction: async (transactions, transactionsDetail, abis) => {
    log("transactions", transactions);
    log("transactionsDetail", transactionsDetail);
    log("abis", abis);
    return Promise.resolve(["0x0"]);
  },
  signMessage: async (typedData, accountAddress) => {
    log("typedData", typedData);
    log("accountAddress", accountAddress);
    return Promise.resolve(["0x0"]);
  },
};
