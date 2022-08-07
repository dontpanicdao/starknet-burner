import { walletSVG } from "./svg";
import { burnerButtonStyle } from "../lib/ui/styles";

const generateButton = (
  container: HTMLDivElement
): HTMLButtonElement | null => {
  const button = container.querySelector<HTMLButtonElement>("#button-burner");
  if (!button) {
    return null;
  }
  button.style.cssText = burnerButtonStyle;
  button.textContent = "Connect";
  button.innerHTML += walletSVG;
  button.setAttribute("onmouseover", "style.transform='scale(1.05)'");
  button.setAttribute("onmouseout", "style.transform='scale(1)'");
  return button;
};

export default generateButton;
