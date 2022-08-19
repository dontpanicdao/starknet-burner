import { SignerInterface } from "starknet/signer/interface";

export const signer: SignerInterface = {
  getPubKey: async () => {
    return "0x";
  },
  signTransaction: async (transactions, transactionsDetail, abis) => {
    console.log("transactions", transactions);
    console.log("transactionsDetail", transactionsDetail);
    console.log("abis", abis);
    return Promise.resolve(["0x0"]);
  },
  signMessage: async (typedData, accountAddress) => {
    console.log("typedData", typedData);
    console.log("accountAddress", accountAddress);
    return Promise.resolve(["0x0"]);
  },
};
