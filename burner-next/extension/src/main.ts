import { iFrame } from "./iframe";

document.querySelector<HTMLDivElement>("#starknetburner")!.innerHTML = `
  <div class="burner-wallet">
	  <iframe id="iframe"/>
  </div>
`;

iFrame(document.querySelector<HTMLIFrameElement>("#iframe")!);
