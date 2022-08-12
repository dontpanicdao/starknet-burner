import {
    containerStyleClicked,
    HiddenStyle,
    modalStyle,
    iframeStyle,
    iFrameButtonStyle,
    burnerButtonStyle,
  } from "../lib/ui/styles.js";
  import { registerWindow, StarknetWindowObject } from "./lib/inpage/window";
  import { isWindowSizeLargerThan } from "./lib/ui/responsive";
  import { walletSVG, closeSVG } from "../components/svg.js";
  import generateButton from "../components/button.js";
  import generateContainer from "../components/container.js";
  import generateModal from "../components/modal.js";
  import generateIframe from "../components/iframe.js";
  import {
    addEvent,
    reload,
    SESSION_LOADED_EVENT,
  } from "../lib/inpage/account.js";
  
  
  const wallet = () => {
    const container = document.querySelector<HTMLDivElement>("#starknetburner");
    if (!container) {
        console.log('add <div id="#starknetburner" /> ')
        return;
    }

    generateContainer(container);
    const buttonBurner = generateButton(container);
    const modalWrapper = generateModal(container);
    const iFrame = generateIframe(container);
    let clicked = false;
  
    const openModal = () => {
      container.style.cssText = containerStyleClicked;
      modalWrapper.style.cssText = modalStyle;
      iFrame.style.cssText = iframeStyle(isWindowSizeLargerThan(768));
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
      const burner: StarknetWindowObject = 
        window["starknet-burner" as keyof typeof window];
      if (
        burner?.account?.address
      ) {
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
    addEvent(SESSION_LOADED_EVENT, closeModal);
    registerWindow();
  };
  
  export { wallet };
  