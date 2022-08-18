import { HiddenStyle, modalStyle } from "../lib/ui/styles";

const injectModal = (container: HTMLDivElement): ((mode: string) => void) => {
  const modal = container.querySelector<HTMLDivElement>("#modal-wrapper");
  if (!modal) {
    throw new Error("undefined modal");
  }

  const styleModal = (mode: string) => {
    if (mode === "modal") {
      modal.style.cssText = modalStyle;
      return;
    }
    modal.style.cssText = HiddenStyle;
  };

  return styleModal;
};

export default injectModal;
