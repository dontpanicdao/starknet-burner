import { getStarknet } from "get-starknet";
import { Contract } from "starknet";
import erc20 from "../abi/erc20.json";

const sendSTRK = async (to, amount) => {
  const starknet = getStarknet();
  if (!starknet.isConnected) {
    await starknet.enable();
  }
  const currentAccount = starknet.account;
  if (!currentAccount) {
    return;
  }
  const starkpillAddress =
    "0x7a1a9784591aad3cc294ed3d89fa45add74e96e8c20e46a21153a6aa979a9cb";
  const erc20 = new Contract(erc20, starkpillAddress, currentAccount);
  console.log("erc20  from appGreg:", erc20);
  try {
    let tx = await erc20.transfer(to, [amount, 0]);
    console.log(tx);
  } catch (e) {}
};

export default sendSTRK;
