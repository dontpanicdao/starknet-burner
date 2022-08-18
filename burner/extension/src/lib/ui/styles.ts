export const containerStyleClicked =
  "position:absolute;top:0;left:0;display:flex;justify-content:center;flex-direction:column;align-items:center;width:100vw;height:100vh;";
export const HiddenStyle = "display:none;";
export const burnerButtonStyle =
  "display:flex;justify-content:center;align-items:center;width:100%;height:100%;font-family:monospace;z-index:90;border:none;outline:none;padding:1rem 2rem;border-radius:1rem;letter-spacing:0.1rem;background-color:#5086bd;color:#fff;font-size:1rem;cursor:pointer;box-shadow:1rem 0.6rem 2rem 0.2rem rgba(0,0,0,0.5);";
export const modalStyle =
  "display:flex;width:100vw;height:100vh;position:absolute;top:0;left:0;background-color:rgba(0,0,0,0.4);filter:blur(0.6rem);justify-content:center;align-items:center";
export const iframeStyle = (size: number) => {
  return `display:flex;position:absolute;background-color:white;width:${size}vw;height:${size}vh;z-index:100;border-radius:1rem;border:none;box-shadow:1rem 0.6rem 2rem 0.2rem rgba(0,0,0,0.5);`;
};
export const iFrameButtonStyle = (iFrameTop: number, iFrameLeft: number) => {
  return `display:flex;justify-content:center;align-items:center;width:2rem;height:2rem;border-radius:1rem;background-color:#FA7575;z-index:101;position:absolute;top:${iFrameTop}px;left:${iFrameLeft}px;`;
};
