const containerStyleClicked =
  "position:absolute;top:0;left:0;display:flex;justify-content:center;flex-direction:column;align-items:center;width:100vw;height:100vh;";
const HiddenStyle = "display:none;";
const iframeStyle = (isDesktop) =>
  `display:flex;position:absolute;background-color:white;width:${
    isDesktop ? "60" : "90"
  }vw;height:${
    isDesktop ? "50" : "90"
  }vh;z-index:100;border-radius:1rem;border:none;box-shadow:1rem 0.6rem 2rem 0.2rem rgba(0,0,0,0.5);`;
const burnerButtonStyle =
  "display:flex;justify-content:center;align-items:center;width:100%;height:100%;font-family:monospace;z-index:90;border:none;outline:none;padding:1rem 2rem;border-radius:1rem;letter-spacing:0.1rem;background-color:#5086bd;color:#fff;font-size:1rem;cursor:pointer;box-shadow:1rem 0.6rem 2rem 0.2rem rgba(0,0,0,0.5);";
const modalStyle =
  "display:flex;width:100vw;height:100vh;position:absolute;top:0;left:0;background-color:rgba(0,0,0,0.4);filter:blur(0.6rem);justify-content:center;align-items:center";
const iFrameButtonStyle = (iFramePosition) => {
  const topPosition = iFramePosition.top + iFramePosition.height * 0.025;
  const leftPosition = iFramePosition.left + iFramePosition.width * 0.025;
  return `display:flex;justify-content:center;align-items:center;width:2rem;height:2rem;border-radius:1rem;background-color:#FA7575;z-index:101;position:absolute;top:${topPosition}px;left:${leftPosition}px;`;
};

export {
  containerStyleClicked,
  HiddenStyle,
  iframeStyle,
  burnerButtonStyle,
  modalStyle,
  iFrameButtonStyle,
};
