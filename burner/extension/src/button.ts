import { starketWindow } from "./lib/inpage/window";
import { displayIFrame } from "./components/iframe";
import { displayModal } from "./components/modal";

export const injectButton = (): any => {
  const button = document.querySelector<HTMLButtonElement>("#button-burner");
  if (!button) {
    throw new Error("Error on button display");
  }
  const handleButtonClick = async () => {
    displayIFrame();
    displayModal();
    await starketWindow.request("keyring_OpenModal");
  };
  button.addEventListener("click", handleButtonClick);
};

injectButton();
