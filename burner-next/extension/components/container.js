const generateContainer = (element) => {
  element.innerHTML = `
    <div id="button-burner">connect</div>
    <div id="modal-wrapper"></div>
    <iframe id="iframe" allow="clipboard-write"/>
`;

  return element;
};

export default generateContainer;
