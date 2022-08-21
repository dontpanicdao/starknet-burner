import { hideIFrame } from "./components/iframe";
import { hideModal } from "./components/modal";
import { registerWindow } from "./lib/inpage/window";

export const keyManager = () => {
  registerWindow();
  const element = document.querySelector<HTMLDivElement>("#starknetburner");
  if (!element) {
    throw new Error("Could not query starknetburner");
  }
  element.innerHTML = `
    <div id="modal-wrapper"></div>
    <iframe id="iframe" 
	  src="${
      import.meta.env.DEV
        ? "http://localhost:3000"
        : "https://starknet-burner.vercel.app/"
    }"
       allow="clipboard-write"/>
`;
  hideIFrame();
  hideModal();
};
