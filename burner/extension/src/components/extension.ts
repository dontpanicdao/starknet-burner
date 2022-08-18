import injectButton from "./button";
import injectModal from "./modal";
import injectIFrame from "./iframe";
import {
  containerStyleClicked,
  HiddenStyle,
  iframeStyle,
  iFrameButtonStyle,
  burnerButtonStyle,
} from "../lib/ui/styles";
import { burnerMessage, messageType, request } from "../lib/inpage/message";
import { closeSVG } from "./svg";

// TODO: push the logic and style to each component, including: iframe and button
const injectExtension = () => {
  const element = document.querySelector<HTMLDivElement>("#starknetburner");
  if (!element) {
    throw new Error("Could not query starknetburner");
  }

  element.innerHTML = `
    <div id="button-burner">connect</div>
    <div id="modal-wrapper"></div>
    <iframe id="iframe" allow="clipboard-write"/>
`;
  const button = injectButton(element);
  const styleModal = injectModal(element);
  const iframe = injectIFrame(element);

  let clicked = false;

  const styleContainer = (mode: string) => {
    if (mode === "modal") {
      styleModal("modal");
      element.style.cssText = containerStyleClicked;
      iframe.style.cssText = iframeStyle();
      const iFramePosition = iframe.getBoundingClientRect();
      button.style.cssText = iFrameButtonStyle(iFramePosition);
      button.textContent = "";
      button.innerHTML += closeSVG;
      return;
    }
    element.style.cssText = "";
    styleModal("");
    iframe.style.cssText = HiddenStyle;
    button.style.cssText = burnerButtonStyle;
  };

  const openModal = () => {
    styleContainer("modal");
    clicked = true;
    request({ type: messageType.display, data: "on" } as burnerMessage);
  };

  const closeModal = () => {
    styleContainer("");
    clicked = false;
    request({ type: messageType.display, data: "off" } as burnerMessage);
  };

  const switchModal = () => {
    if (!clicked) {
      openModal();
      return;
    }
    closeModal();
  };

  button.addEventListener("click", switchModal);
};

export default injectExtension;
