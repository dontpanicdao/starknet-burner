import { iFrame } from "./iframe";
import { Button } from "./button";

document.querySelector<HTMLDivElement>("#starknetburner")!.innerHTML = `
  <div class="burner-wallet">
	  <iframe id="iframe" allow="clipboard-write" onload='javascript:(function(o){o.style.height=o.contentWindow.document.body.scrollHeight+"px";}(this));' style="height:300px;width:300px;border:none;overflow:hidden;"/>
  </div>
`;

window.addEventListener("message", (event) => {
  if (event && event.data) {
    try {
      const evtIn = JSON.parse(event.data);
      if (evtIn.name) {
        console.log(`outside from extension: ${evtIn.name}`);
      }
    } catch {
      // ignore
    }
  }
});

const iframe = document.querySelector<HTMLIFrameElement>("#iframe");
Button(document.querySelector<HTMLButtonElement>("#message")!);

iFrame(iframe!);



//TODO: ajouter dans scratch 
{/*
DANS SCRATCH 

- Separer main.ts en main.js et index.js
  Mains.js contiendra event listenner, iframe, 

*/}