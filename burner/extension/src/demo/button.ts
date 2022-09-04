import { starknetWindow } from "..";

export const injectButton = (): any => {
  const button = document.querySelector<HTMLButtonElement>("#button-burner");
  if (!button) {
    throw new Error("Error on button display");
  }
  const handleButtonClick = async () => {
    await starknetWindow.enable();
  };
  button.addEventListener("click", handleButtonClick);
};

injectButton();
