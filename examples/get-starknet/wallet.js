import { getStarknet, disconnect } from "get-starknet";

let wallet;

export const attachConnect = (id) => {
  const button = document.querySelector(`#${id}`);
  if (!button) {
    throw new Error(`button id=${id} not found`);
  }
  button.addEventListener(
    "click",
    async (event) => {
      event.preventDefault();
      console.log(`connecting to wallets`);
      wallet = await getStarknet();
      console.log(wallet);
      await wallet.enable({ showModal: true });
    },
    false
  );
};

export const attachDisconnect = (id) => {
  const button = document.querySelector(`#${id}`);
  if (!button) {
    throw new Error(`button id=${id} not found`);
  }
  button.addEventListener(
    "click",
    async (event) => {
      event.preventDefault();
      console.log(`disconnecting from wallet`);
      try {
        const result = await disconnect({
          clearLastWallet: true,
          clearDefaultWallet: true,
        });
      } catch (e) {
        console.log(`wallet not connected`);
      }
      return;
    },
    false
  );
};
