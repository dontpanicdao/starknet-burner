import { Provider } from "starknet/provider";

export const provider = new Provider({
  sequencer: { network: "goerli-alpha" },
});
