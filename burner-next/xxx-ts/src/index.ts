import {
  burnerStyleClicked,
  hiddenStyle,
  modalExpandedStyle,
  getIFrameExpandedStyle,
  iFrameButtonStyle,
  burnerButtonStyle,
} from "./lib/ui/styles";
import {
  injectBurner,
  getModalWrapper,
  getIFrame,
  getButton,
  openWalletSVG,
  closeWalletSVG,
} from "./components/container";
import { addEvent, SESSION_LOADED_EVENT } from "./lib/inpage/account";
import {
  registerWindow,
  StarknetWindowObject,
  starketWindow,
} from "./lib/inpage/window";

export const burner = () => {
  const container: HTMLDivElement | null =
    document.querySelector<HTMLDivElement>("#starknetburner");
  if (!container) {
    return;
  }

  injectBurner(container);
  const modalWrapper = getModalWrapper(container);
  const iFrame = getIFrame(container);
  const button = getButton(container);
  let clicked = false;

  const openModal = () => {
    if (!starketWindow.account?._actions?.reload) {
      return;
    }
    if (!iFrame || !modalWrapper || !button) {
      return;
    }
    container.style.cssText = burnerStyleClicked;
    modalWrapper.style.cssText = modalExpandedStyle;
    iFrame.style.cssText = getIFrameExpandedStyle();
    const iFramePosition = iFrame.getBoundingClientRect();
    button.style.cssText = iFrameButtonStyle(iFramePosition);
    button.textContent = "";
    button.innerHTML += closeWalletSVG;
    clicked = true;
    starketWindow.account?._actions.reload("reload now");
    return;
  };

  const closeModal = () => {
    if (!iFrame || !modalWrapper || !button) {
      return;
    }
    container.style.cssText = "";
    iFrame.style.cssText = hiddenStyle;
    modalWrapper.style.cssText = hiddenStyle;
    button.style.cssText = burnerButtonStyle;
    if (!window || !("starknet-burner" in window)) {
      return;
    }
    const burner: StarknetWindowObject =
      window["starknet-burner" as keyof typeof window];
    const accountAddress = burner?.account?.address;
    if (accountAddress) {
      button.textContent =
        accountAddress.slice(0, 5) + "..." + accountAddress.slice(-4);
    } else {
      button.textContent = "Connect";
      button.innerHTML += openWalletSVG;
    }
    clicked = false;
  };

  const switchModal = () => {
    if (!clicked) {
      openModal();
      return;
    }
    closeModal();
  };

  if (button) {
    button.addEventListener("click", switchModal);
  }
  addEvent(SESSION_LOADED_EVENT, closeModal);
  registerWindow();
};
