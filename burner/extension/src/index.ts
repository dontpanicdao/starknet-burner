import { hideIFrame } from "./components/iframe";
import { hideModal } from "./components/modal";
import { registerWindow } from "./lib/window";
export let UsePin;
export let TokenId;

export const register = ({
  tokenId = "0x0",
  usePin = false,
  version = "3.x",
}) => {
  UsePin = usePin;
  TokenId = tokenId;
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
