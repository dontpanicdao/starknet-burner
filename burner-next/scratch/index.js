const BurnerWallet = () => {
  const iFrameContainer = document.querySelector("#starknetburner");
  iFrameContainer.innerHTML = `
	  <iframe id="iframe" allow="clipboard-write"/>
`;
  iFrameContainer.style.cssText +=
    "height:300px;width:300px;border:none;overflow:hidden;";

  const iFrame = document.querySelector("#iframe");
  iFrame.style.cssText += "height:100%;width:100%";
  iFrame.addEventListener("load", function () {
    console.log("wallet loaded...");
  });
  iFrame.src = "http://localhost:3000";
};

export { BurnerWallet };
