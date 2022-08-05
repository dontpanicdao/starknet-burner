import { HiddenStyle, modalStyle, iframeStyle } from "./styles.js";
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
    console.log("click from button");
    if (!clicked) {
      modalWrapper.style.cssText = modalStyle;
      iFrame.style.cssText = iframeStyle;
      clicked = true;
      return;
    }
    iFrame.style.cssText = HiddenStyle;
    modalWrapper.style.cssText = HiddenStyle;
    clicked = false;
  });
};
BurnerWallet();

export { BurnerWallet };
