import { HiddenStyle, modalStyle } from "../lib/ui/styles";

export const injectModal = (): void => {
  const button = document.querySelector<HTMLButtonElement>("#button-burner");
  const modal = document.querySelector<HTMLDivElement>("#modal-wrapper");
  if (!button || !modal) {
    throw new Error("Error on modal display");
  }
  let clicked = false;
  const handleModalStyle = () => {
    modal.style.cssText = clicked ? HiddenStyle : modalStyle;
    clicked = clicked ? false : true;
  };
  button.addEventListener("click", handleModalStyle);
};
