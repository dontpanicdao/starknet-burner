import { walletSVG } from "./svg.js";
import { burnerButtonStyle } from "../lib/styles.js";

const generateButton = (container) => {
  const button = container.querySelector("#button-burner");
  button.style.cssText = burnerButtonStyle;
  button.textContent = "Connect";
  button.innerHTML += walletSVG;
  button.setAttribute("onmouseover", "style.transform='scale(1.05)'");
  button.setAttribute("onmouseout", "style.transform='scale(1)'");

  return button;
};

export default generateButton;
