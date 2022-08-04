import {
  containerStyle,
  HiddenStyle,
  iframeStyle,
  buttonStyle,
  modalStyle,
} from "./styles.js";

const BurnerWalletButton = () => {
  return `<button style="border: none;
  outline: none;
  padding: 1rem 2rem;
  border-radius: 1rem;
  letter-spacing: 0.1rem;
  background-color: #5086bd;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 1rem 0.6rem 2rem 0.2rem rgba(0,0,0,0.5);" >
  <span style="display: flex;
    align-items: center;" onmouseover="style.color='orange'"
        onmouseout="style.color=''">
    Connect burner
  <svg style="margin-left:0.5rem;" onmouseover="style.transform='scale(1.1)'"  onmouseout="style.transform='scale(1)'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16px" height="16px" viewBox="0 0 16 16" version="1.1">
<g id="surface1">
<path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 16 6.78125 C 16 6.34375 15.648438 5.992188 15.210938 5.992188 L 10.691406 5.992188 C 10.253906 5.992188 9.902344 6.34375 9.902344 6.78125 L 9.902344 9.148438 C 9.902344 9.582031 10.253906 9.9375 10.691406 9.9375 L 15.210938 9.9375 C 15.648438 9.9375 16 9.582031 16 9.148438 Z M 12.164062 8.894531 C 11.65625 8.894531 11.242188 8.484375 11.242188 7.972656 C 11.242188 7.464844 11.65625 7.054688 12.164062 7.054688 C 12.671875 7.054688 13.082031 7.464844 13.082031 7.972656 C 13.082031 8.484375 12.671875 8.894531 12.164062 8.894531 Z M 12.164062 8.894531 "/>
<path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 8.863281 4.914062 L 14.707031 4.914062 L 14.707031 2.546875 C 14.707031 1.953125 14.25 1.472656 13.65625 1.472656 L 1.101562 1.472656 C 0.507812 1.472656 0 1.953125 0 2.546875 L 0 13.453125 C 0 14.046875 0.507812 14.527344 1.101562 14.527344 L 13.65625 14.527344 C 14.25 14.527344 14.707031 14.046875 14.707031 13.453125 L 14.707031 11.011719 L 8.871094 11.011719 Z M 8.863281 4.914062 "/>
</g>
</svg>
</button>`;
};

const BurnerWallet = () => {
  const container = document.querySelector("#starknetburner");

  container.innerHTML = `
    <button id="button-burner">connect</button>
    <div id="modal-wrapper">
	    <iframe id="iframe" allow="clipboard-write"/>
    </div>
`;

  container.style.cssText = containerStyle;
  const iFrame = container.querySelector("#iframe");
  iFrame.style.cssText = HiddenStyle;

  iFrame.addEventListener("load", () => {
    console.log("wallet loaded...");
  });

  iFrame.src = "https://stark.blaqkube.io";

  const buttonBurner = container.querySelector("#button-burner");
  const modalWrapper = container.querySelector("#modal-wrapper");
  let clicked = false;

  buttonBurner.addEventListener("click", () => {
    if (!clicked) {
      modalWrapper.style.cssText = modalStyle;
      buttonBurner.style.cssText = buttonStyle;

      iFrame.style.cssText = iframeStyle;
      clicked = true;
      return;
    }
    iFrame.style.cssText = HiddenStyle;
    modalWrapper.style.cssText = HiddenStyle;
    clicked = false;
  });
};
BurnerWallet();

export { BurnerWalletButton, BurnerWallet };
