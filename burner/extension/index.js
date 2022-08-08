import {
  containerStyleClicked,
  HiddenStyle,
  modalStyle,
  iframeStyle,
  iFrameButtonStyle,
  burnerButtonStyle,
} from "./lib/ui/styles.js";
import { isMatchMoreThanPx } from "./lib/ui/responsive.js";
import { walletSVG, closeSVG } from "./components/svg.js";
import generateButton from "./components/button.js";
import generateContainer from "./components/container.js";
import generateModal from "./components/modal.js";
import generateIframe from "./components/iframe.js";
import {
  addEvent,
  reload,
  SESSION_LOADED_EVENT,
} from "./lib/inpage/account.js";
import { registerWindow } from "./lib/inpage/model.js";
const wallet = () => {
  const isDesktop = isMatchMoreThanPx(768);

  const container = document.querySelector("#starknetburner");
  generateContainer(container);
  const buttonBurner = generateButton(container);
  const modalWrapper = generateModal(container);
  const iFrame = generateIframe(container);
  let clicked = false;

  const openModal = () => {
    container.style.cssText = containerStyleClicked;
    modalWrapper.style.cssText = modalStyle;
    iFrame.style.cssText = iframeStyle(isDesktop);
    const iFramePosition = iFrame.getBoundingClientRect();
    buttonBurner.style.cssText = iFrameButtonStyle(iFramePosition);
    buttonBurner.textContent = "";
    buttonBurner.innerHTML += closeSVG;
    clicked = true;
    reload();
    return;
  };

  const closeModal = () => {
    container.style.cssText = "";
    iFrame.style.cssText = HiddenStyle;
    modalWrapper.style.cssText = HiddenStyle;
    buttonBurner.style.cssText = burnerButtonStyle;
    if (
      window?.length > 0 &&
      window["starknet-burner"]?.account?.selectedAddress
    ) {
      const accountAddress = window["starknet-burner"].account.selectedAddress;
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

  buttonBurner.addEventListener("click", switchModal);
  addEvent(SESSION_LOADED_EVENT, closeModal);
  registerWindow();
};

export { wallet };
