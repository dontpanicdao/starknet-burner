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
import { extensionEventHandler } from "./lib/inpage/message.js";

const wallet = () => {
  const container = document.querySelector("#starknetburner");
  generateContainer(container);
  const buttonBurner = generateButton(container);
  const modalWrapper = generateModal(container);
  const iFrame = generateIframe(container);
  let clicked = false;

  buttonBurner.addEventListener("click", () => {
    if (!clicked) {
      container.style.cssText = containerStyleClicked;
      modalWrapper.style.cssText = modalStyle;
      const isDesktop = isMatchMoreThanPx(768);
      iFrame.style.cssText = iframeStyle(isDesktop);
      const iFramePosition = iFrame.getBoundingClientRect();
      buttonBurner.style.cssText = iFrameButtonStyle(iFramePosition);
      buttonBurner.textContent = "";
      buttonBurner.innerHTML += closeSVG;
      clicked = true;
      return;
    }
    container.style.cssText = "";
    iFrame.style.cssText = HiddenStyle;
    modalWrapper.style.cssText = HiddenStyle;
    buttonBurner.style.cssText = burnerButtonStyle;
    buttonBurner.textContent = "Connect";
    buttonBurner.innerHTML += walletSVG;
    clicked = false;
  });

  window?.addEventListener("message", extensionEventHandler);
};

export { wallet };
