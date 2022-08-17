import {
  containerStyleClicked,
  HiddenStyle,
  modalStyle,
  iframeStyle,
  iFrameButtonStyle,
  burnerButtonStyle,
} from "./lib/ui/styles";
import {
  registerWindow,
  StarknetWindowObject,
  exposeRequest,
} from "./lib/inpage/window";
import { walletSVG, closeSVG } from "./components/svg";
import generateButton from "./components/button";
import generateContainer from "./components/container";
import generateModal from "./components/modal";
import generateIframe from "./components/iframe";

const wallet = () => {
  const container = document.querySelector<HTMLDivElement>("#starknetburner");
  if (!container) {
    console.log('add <div id="#starknetburner" /> ');
    return;
  }

  generateContainer(container);
  const buttonBurner = generateButton(container);
  const modalWrapper = generateModal(container);
  const iFrame = generateIframe(container);
  let clicked = false;

  if (!buttonBurner || !modalWrapper || !iFrame) {
    return;
  }

  const openModal = () => {
    container.style.cssText = containerStyleClicked;
    modalWrapper.style.cssText = modalStyle;
    iFrame.style.cssText = iframeStyle();
    const iFramePosition = iFrame.getBoundingClientRect();
    buttonBurner.style.cssText = iFrameButtonStyle(iFramePosition);
    buttonBurner.textContent = "";
    buttonBurner.innerHTML += closeSVG;
    clicked = true;
    // reload();
    return;
  };

  const closeModal = () => {
    container.style.cssText = "";
    iFrame.style.cssText = HiddenStyle;
    modalWrapper.style.cssText = HiddenStyle;
    buttonBurner.style.cssText = burnerButtonStyle;
    const burner: StarknetWindowObject =
      window["starknet-burner" as keyof typeof window];
    if (burner?.account?.address && burner.account.address != "0x0") {
      const accountAddress = burner.account.address;
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
  registerWindow();
  exposeRequest(true);
};

export { wallet };
