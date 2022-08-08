import { isWindowSizeLargerThan } from "./responsive";
export const burnerStyleClicked =
  "position:absolute;top:0;left:0;display:flex;justify-content:center;flex-direction:column;align-items:center;width:100vw;height:100vh;";

export const hiddenStyle = "display:none;";

export const modalExpandedStyle =
  "display:flex;width:100vw;height:100vh;z-index:80;position:absolute;top:0;left:0;background-color:rgba(0,0,0,0.4);justify-content:center;align-items:center";

export const getIFrameExpandedStyle = () => {
  const isDesktop = isWindowSizeLargerThan(768);
  return isDesktop
    ? "display:flex;position:absolute;background-color:white;width:60vw;height:50vh;z-index:100;border-radius:1rem;border:none;box-shadow:1rem 0.6rem 2rem 0.2rem rgba(0,0,0,0.5);"
    : "display:flex;position:absolute;background-color:white;width:90vw;height:90vh;z-index:100;border-radius:1rem;border:none;box-shadow:1rem 0.6rem 2rem 0.2rem rgba(0,0,0,0.5);";
};

export const burnerButtonStyle =
  "display:flex;justify-content:center;align-items:center;font-family:monospace;z-index:90;border:none;outline:none;padding:1rem 2rem;border-radius:1rem;letter-spacing:0.1rem;background-color:#5086bd;color:#fff;font-size:1rem;cursor:pointer;box-shadow:1rem 0.6rem 2rem 0.2rem rgba(0,0,0,0.5);";

export const iFrameButtonStyle = (iFramePosition: DOMRect) => {
  const topPosition = iFramePosition.top + iFramePosition.height * 0.025;
  const leftPosition = iFramePosition.left + iFramePosition.width * 0.025;
  return `display:flex;justify-content:center;align-items:center;width:2rem;height:2rem;border-radius:1rem;background-color:#FA7575;z-index:101;position:absolute;top:${topPosition}px;left:${leftPosition}px;`;
};
