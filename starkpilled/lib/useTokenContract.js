import { useContract } from "@starknet-react/core";
import { Abi } from "starknet";
import Erc20Abi from "../abi/erc20.json";

const useTokenContract = () => {
  let starkPillAddress =
    "0x05a87f6bec0b6121e55f291f8e06e6149accd706fb43c725a7f1fd3f3f62aadf";
  return useContract({
    abi: Erc20Abi,
    address: starkPillAddress,
  });
};

export default useTokenContract;
