import { containerStyleClicked } from "../lib/ui/styles";

export const injectExtension = () => {
  const element = document.querySelector<HTMLDivElement>("#starknetburner");
  if (!element) {
    throw new Error("Could not query starknetburner");
  }
  element.innerHTML = `
    <div id="button-burner">connect</div>
    <div id="modal-wrapper"></div>
    <iframe id="iframe" allow="clipboard-write"/>
`;
  const button = element.querySelector<HTMLButtonElement>("#button-burner");
  if (!button) {
    throw new Error("Error on button display");
  }

  let clicked = false;
  const handleContainerStyle = () => {
    element.style.cssText = clicked ? "" : containerStyleClicked;
    clicked = clicked ? false : true;
  };
  button.addEventListener("click", handleContainerStyle);
};
