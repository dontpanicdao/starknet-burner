import { walletSVG, closeSVG } from "./svg";
import { burnerButtonStyle, iFrameButtonStyle } from "../lib/ui/styles";
import { sendMessage } from "../lib/messages";

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
    sendMessage({
      type: clicked ? "CLOSE_MODAL" : "OPEN_MODAL",
    });
    const { top, left, width, height } = iFramePosition;
    const iFrameTop = top + height * 0.025;
    const iFrameLeft = left + width * 0.025;
    button.style.cssText = clicked
      ? burnerButtonStyle
      : iFrameButtonStyle(iFrameTop, iFrameLeft);
    button.textContent = clicked ? "Connect" : "";
    button.innerHTML += clicked ? walletSVG : closeSVG;
    clicked = clicked ? false : true;
  };
  button.addEventListener("click", handleButtonClick);
};
