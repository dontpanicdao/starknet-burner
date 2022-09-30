import { hideIFrame } from "./components/iframe";
import { hideModal } from "./components/modal";
import { registerWindow } from "./lib/window";
export let UsePin = false;

export const register = ({ version = "3.x", usePin = false }) => {
  UsePin = usePin;
  registerWindow(version);
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

export type { IStarknetWindowObject } from "./lib/interface";
export { starknetWindow } from "./lib/window";
