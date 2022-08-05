import { containerStyle } from "./styles";

const generateContainer = (element) => {
  element.innerHTML = `
    <button id="button-burner">connect</button>
    <div id="modal-wrapper">
	    <iframe id="iframe" allow="clipboard-write"/>
    </div>
`;
  element.style.cssText = containerStyle;

  return element;
};

export default generateContainer;
