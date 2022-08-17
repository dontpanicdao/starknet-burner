import { HiddenStyle } from "../lib/ui/styles.js";

const generateIframe = (
  container: HTMLDivElement
): HTMLIFrameElement | undefined => {
  const iFrame = container.querySelector<HTMLIFrameElement>("#iframe");
  if (!iFrame) {
    return;
  }
  iFrame.style.cssText = HiddenStyle;
  iFrame.src = import.meta.env.DEV
    ? "http://localhost:3000"
    : "https://starknet-burner.vercel.app/";
  return iFrame;
};

export default generateIframe;
