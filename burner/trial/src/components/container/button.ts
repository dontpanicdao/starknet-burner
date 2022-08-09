import { openWalletSVG } from "./svg";
import { burnerButtonStyle } from "../../lib/ui/styles";

export const styleButton = (button: HTMLButtonElement) => {
  button.style.cssText = burnerButtonStyle;
  button.textContent = "Connect";
  button.innerHTML += openWalletSVG;
  button.setAttribute("onmouseover", "style.transform='scale(1.05)'");
  button.setAttribute("onmouseout", "style.transform='scale(1)'");
  return button;
};

export const getButton = (
  container: HTMLDivElement
): HTMLButtonElement | null => {
  const button = container.querySelector<HTMLButtonElement>("#button-burner");
  return button;
};
