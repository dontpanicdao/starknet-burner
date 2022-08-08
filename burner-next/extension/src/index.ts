import {
  containerStyleClicked,
  HiddenStyle,
  modalStyle,
  iframeStyle,
  iFrameButtonStyle,
  burnerButtonStyle,
} from "./lib/ui/styles";
import { isMatchMoreThanPx } from "./lib/ui/responsive";
import { walletSVG, closeSVG } from "./components/svg";
import generateButton from "./components/button";
import generateContainer from "./components/container";
import generateModal from "./components/modal";
import generateIframe from "./components/iframe";
import { addEvent, SESSION_LOADED_EVENT } from "./lib/inpage/account";
import { registerWindow } from "./lib/inpage/window";
import { StarknetWindowObject, starketWindow } from "./lib/inpage/window";

const wallet = () => {
  const container: HTMLDivElement | null =
    document.querySelector<HTMLDivElement>("#starknetburner");
  if (!container) {
    return;
  }

  generateContainer(container);
  const buttonBurner = generateButton(container);
  const modalWrapper = generateModal(container);
  const iFrame = generateIframe(container);
  let clicked = false;

  const openModal = () => {
    if (!starketWindow.account?._actions?.reload) {
      return;
    }
    if (!iFrame || !modalWrapper || !buttonBurner) {
      return;
    }
    container.style.cssText = containerStyleClicked;
    modalWrapper.style.cssText = modalStyle;
    const isDesktop = isMatchMoreThanPx(768);
    iFrame.style.cssText = iframeStyle(isDesktop);
    const iFramePosition = iFrame.getBoundingClientRect();
    buttonBurner.style.cssText = iFrameButtonStyle(iFramePosition);
    buttonBurner.textContent = "";
    buttonBurner.innerHTML += closeSVG;
    clicked = true;
    starketWindow.account?._actions.reload("reload now");
    return;
  };

  const closeModal = () => {
    if (!iFrame || !modalWrapper || !buttonBurner) {
      return;
    }
    container.style.cssText = "";
    iFrame.style.cssText = HiddenStyle;
    modalWrapper.style.cssText = HiddenStyle;
    buttonBurner.style.cssText = burnerButtonStyle;
    if (!window || !("starknet-burner" in window)) {
      return;
    }
    const burner: StarknetWindowObject =
      window["starknet-burner" as keyof typeof window];
    const accountAddress = burner?.account?.address;
    if (accountAddress) {
      buttonBurner.textContent =
        accountAddress.slice(0, 5) + "..." + accountAddress.slice(-4);
    } else {
      buttonBurner.textContent = "Connect";
      buttonBurner.innerHTML += walletSVG;
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

  if (buttonBurner) {
    buttonBurner.addEventListener("click", switchModal);
  }
  addEvent(SESSION_LOADED_EVENT, closeModal);
  registerWindow();
};

export { wallet };
