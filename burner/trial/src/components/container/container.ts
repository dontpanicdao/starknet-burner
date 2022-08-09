import { styleButton, getButton } from "./button";
export const injectBurner = (element: HTMLDivElement): HTMLDivElement => {
  element.innerHTML = `
  <div id="button-burner">connect</div>
  <div id="modal-wrapper" />
  <iframe id="iframe" allow="clipboard-write"/>
  `;

  const button = getButton(element);
  if (!button) {
    return element;
  }
  styleButton(button);
  return element;
};
