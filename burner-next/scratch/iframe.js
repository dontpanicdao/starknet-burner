import { HiddenStyle } from "./styles.js";

const generateIframe = (container) => {
  const iFrame = container.querySelector("#iframe");
  iFrame.style.cssText = HiddenStyle;
  iFrame.addEventListener("load", () => {
    console.log("wallet loaded...");
  });
  iFrame.src = "https://stark.blaqkube.io";
  return iFrame;
};

export default generateIframe;
