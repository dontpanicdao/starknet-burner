import {
  containerStyleClicked,
  HiddenStyle,
  modalStyle,
  iframeStyle,
  iFrameButtonStyle,
  burnerButtonStyle,
} from "./styles.js";
import { isMatchMoreThanPx } from "./responsive.js";
import { walletSVG, closeSVG } from "./svg.js";
import generateButton from "./button.js";
import generateContainer from "./container.js";
import generateModal from "./modal.js";
import generateIframe from "./iframe.js";

const BurnerWallet = () => {
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
};

export { BurnerWallet };
