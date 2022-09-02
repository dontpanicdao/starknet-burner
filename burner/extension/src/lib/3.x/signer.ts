import { SignerInterface } from "starknet3x/signer/interface";
import { newLog } from "../shared/log";

const log = newLog();

export const signer: SignerInterface = {
  getPubKey: async () => {
    return "0x";
  },
  signTransaction: async (transactions, transactionsDetail, abis) => {
    log.debug("transactions", transactions);
    log.debug("transactionsDetail", transactionsDetail);
    log.debug("abis", abis);
    return Promise.resolve(["0x0"]);
  },
  signMessage: async (typedData, accountAddress) => {
    log.debug("typedData", typedData);
    log.debug("accountAddress", accountAddress);
    return Promise.resolve(["0x0"]);
  },
};
