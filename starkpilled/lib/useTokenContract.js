import { useContract } from "@starknet-react/core";
import Erc20Abi from "../abi/erc20.json";

const useTokenContract = () => {
  let starkPillAddress =
    "0x7a1a9784591aad3cc294ed3d89fa45add74e96e8c20e46a21153a6aa979a9cb";
  return useContract({
    abi: Erc20Abi,
    address: starkPillAddress,
  });
};

export default useTokenContract;
