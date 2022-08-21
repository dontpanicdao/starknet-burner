import { hiddenStyle, modalStyle } from "../lib/ui/styles";

export const displayModal = () => {
  const modal = document.querySelector<HTMLDivElement>("#modal-wrapper");
  if (!modal) {
    throw new Error("Error on modal display");
  }
  modal.style.cssText = modalStyle;
};

export const hideModal = () => {
  const modal = document.querySelector<HTMLDivElement>("#modal-wrapper");
  if (!modal) {
    throw new Error("Error on modal display");
  }
  modal.style.cssText = hiddenStyle;
};
