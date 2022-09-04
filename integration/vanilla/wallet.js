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
      console.log(`connecting to starknet-burner`);
      wallet = window["starknet-burner"];
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
      wallet = window["starknet-burner"];
      if (wallet) {
        await wallet.request({ type: "keyring_Disconnect" });
      }
      return;
    },
    false
  );
};
