import { walletSVG, closeSVG } from "./svg";
import { burnerButtonStyle, iFrameButtonStyle } from "../lib/ui/styles";
import { burnerMessage, messageType, request } from "../lib/inpage/message";

export const injectButton = (): any => {
  const button = document.querySelector<HTMLButtonElement>("#button-burner");
  const iFrame = document.querySelector<HTMLIFrameElement>("#iframe");
  if (!button || !iFrame) {
    throw new Error("Error on button display");
  }
  button.style.cssText = burnerButtonStyle;
  button.textContent = "Connect";
  button.innerHTML += walletSVG;
  button.setAttribute("onmouseover", "style.transform='scale(1.05)'");
  button.setAttribute("onmouseout", "style.transform='scale(1)'");
  let clicked = false;
  const handleButtonClick = () => {
    const iFramePosition = iFrame.getBoundingClientRect();
    request({
      type: messageType.display,
      data: clicked ? "off" : "on",
    } as burnerMessage);
    button.style.cssText = clicked
      ? burnerButtonStyle
      : iFrameButtonStyle(iFramePosition);
    button.textContent = clicked ? "Connect" : "";
    button.innerHTML += clicked ? walletSVG : closeSVG;
    clicked = clicked ? false : true;
  };
  button.addEventListener("click", handleButtonClick);
};
