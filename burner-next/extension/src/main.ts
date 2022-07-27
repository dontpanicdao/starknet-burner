import { iFrame } from "./iframe";
import { Button } from "./button";

document.querySelector<HTMLDivElement>("#starknetburner")!.innerHTML = `
  <div class="burner-wallet">
	  <iframe id="iframe"/>
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
