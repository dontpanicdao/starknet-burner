import { Provider } from "starknet/provider";
import { toBN } from "starknet/utils/number";
import { notify } from ".";
import { log } from "./keyring";

export const provider = new Provider({
  sequencer: { network: "goerli-alpha" },
});

export const providerEventHandler = async (type, data) => {
  switch (type) {
    case "provider_CallContract":
      {
        const { transactions, blockIdentifier } = data;
        const { contractAddress, entrypoint, calldata } = transactions;
        const newCall = {
          contractAddress,
          entrypoint,
          calldata: [...calldata.map((v) => toBN(v).toString(10))],
        };
        log(newCall);
        const output = await provider.callContract(newCall, blockIdentifier);
        notify({ type: "provider_CallContractResponse", data: output });
      }
      break;
    case "provider_GetBlock":
      {
        const { blockIdentifier } = data;
        const output = await provider.getBlock(blockIdentifier);
        notify({ type: "provider_GetBlockResponse", data: output });
      }
      break;
    default:
      break;
  }
};
