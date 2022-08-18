import { HiddenStyle, iframeStyle } from "../lib/ui/styles.js";

export const injectIFrame = (): void => {
  const button = document.querySelector<HTMLButtonElement>("#button-burner");
  const iFrame = document.querySelector<HTMLIFrameElement>("#iframe");

  if (!button || !iFrame) {
    throw new Error("Error on iframe display");
  }
  iFrame.style.cssText = HiddenStyle;
  iFrame.src = import.meta.env.DEV
    ? "http://localhost:3000"
    : "https://starknet-burner.vercel.app/";
  let clicked = false;
  const styleIframe = () => {
    iFrame.style.cssText = clicked ? HiddenStyle : iframeStyle();
    clicked = clicked ? false : true;
  };
  button.addEventListener("click", styleIframe);
};
