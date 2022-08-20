import { isWindowSizeLargerThan } from "../lib/ui/responsive.js";
import { hiddenStyle, iframeStyle } from "../lib/ui/styles.js";

export const displayIFrame = () => {
  const iFrame = document.querySelector<HTMLIFrameElement>("#iframe");
  if (!iFrame) {
    throw new Error("Error on iframe display");
  }
  const size = isWindowSizeLargerThan(768) ? 60 : 90;
  iFrame.style.cssText = iframeStyle(size);
};

export const hideIFrame = () => {
  const iFrame = document.querySelector<HTMLIFrameElement>("#iframe");
  if (!iFrame) {
    throw new Error("Error on iframe display");
  }
  iFrame.style.cssText = hiddenStyle;
};
