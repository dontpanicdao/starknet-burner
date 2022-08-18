import { walletSVG } from "./svg";
import { burnerButtonStyle } from "../lib/ui/styles";

const injectButton = (container: HTMLDivElement): HTMLButtonElement => {
  const button = container.querySelector<HTMLButtonElement>("#button-burner");
  if (!button) {
    throw new Error("undefined Button");
  }
  button.style.cssText = burnerButtonStyle;
  button.textContent = "Connect";
  button.innerHTML += walletSVG;
  button.setAttribute("onmouseover", "style.transform='scale(1.05)'");
  button.setAttribute("onmouseout", "style.transform='scale(1)'");

  return button;
};

export default injectButton;
