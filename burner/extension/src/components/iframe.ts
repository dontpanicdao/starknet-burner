import { HiddenStyle } from "../lib/ui/styles.js";

const injectIFrame = (container: HTMLDivElement): HTMLIFrameElement => {
  const iFrame = container.querySelector<HTMLIFrameElement>("#iframe");
  if (!iFrame) {
    throw new Error("undefined iFrame");
  }
  iFrame.style.cssText = HiddenStyle;
  iFrame.src = import.meta.env.DEV
    ? "http://localhost:3000"
    : "https://starknet-burner.vercel.app/";

  return iFrame;
};

export default injectIFrame;
