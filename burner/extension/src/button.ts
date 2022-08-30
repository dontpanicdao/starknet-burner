import { starknetWindow } from "./lib/inpage/window";

export const injectButton = (): any => {
  const button = document.querySelector<HTMLButtonElement>("#button-burner");
  if (!button) {
    throw new Error("Error on button display");
  }
  const handleButtonClick = async () => {
    await starknetWindow.request("keyring_OpenModal");
  };
  button.addEventListener("click", handleButtonClick);
};

injectButton();
