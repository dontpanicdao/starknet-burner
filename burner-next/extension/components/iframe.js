import { HiddenStyle } from "../lib/ui/styles.js";

const generateIframe = (container) => {
  const iFrame = container.querySelector("#iframe");
  iFrame.style.cssText = HiddenStyle;
  iFrame.addEventListener("load", () => {
    console.log("wallet loaded...");
  });
  iFrame.src = "https://starknet-burner.vercel.app";
  return iFrame;
};

export default generateIframe;
