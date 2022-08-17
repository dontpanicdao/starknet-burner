import { HiddenStyle } from "../lib/ui/styles.js";

const generateIframe = (
  container: HTMLDivElement
): HTMLIFrameElement | undefined => {
  const iFrame = container.querySelector<HTMLIFrameElement>("#iframe");
  if (!iFrame) {
    return;
  }
  iFrame.style.cssText = HiddenStyle;
  iFrame.src = "http://localhost:3000";
  return iFrame;
};

export default generateIframe;
