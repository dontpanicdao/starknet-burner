import { Contract } from "starknet";
import erc20 from "../abi/erc20.json";

export const connect = async (account) => {
  let contract = new Contract(
    "0x0d8775f648430679a709e98d2b0cb6250d2887ef",
    erc20,
    account
  );
  return contract;
};
