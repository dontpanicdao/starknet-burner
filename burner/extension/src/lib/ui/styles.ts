export const containerStyleClicked =
  "position:absolute;top:0;left:0;display:flex;justify-content:center;flex-direction:column;align-items:center;width:100vw;height:100vh;";
export const hiddenStyle = "display:none;";

export const modalStyle =
  "display:flex;width:100vw;height:100vh;position:absolute;top:0;left:0;background-color:rgba(0,0,0,0.4);filter:blur(0.6rem);justify-content:center;align-items:center";

export const iframeStyle = (size: number) => {
  return `display:flex;position:absolute;background-color:white;width:${size}vw;height:${size}vh;left:${
    (100 - size) / 2
  }%;top:${
    (100 - size) / 2
  }%;z-index:100;border-radius:1rem;border:none;box-shadow:1rem 0.6rem 2rem 0.2rem rgba(0,0,0,0.5);`;
};
