import { HiddenStyle } from "../lib/ui/styles.js";

const generateIframe = (
  container: HTMLDivElement
): HTMLIFrameElement | undefined => {
  const iFrame = container.querySelector<HTMLIFrameElement>("#iframe");
  if (!iFrame) {
    return;
  }
  iFrame.style.cssText = HiddenStyle;
  iFrame.addEventListener("load", () => {
    console.log("wallet loaded...");
  });
  iFrame.src = "http://localhost:3000";
  return iFrame;
};

export default generateIframe;
