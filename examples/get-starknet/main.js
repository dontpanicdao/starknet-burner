import { register } from "@starknet/burner";
import { attachConnect, attachDisconnect } from "./wallet";

document.querySelector("#app").innerHTML = `
<div id="starknetburner"></div>
<button id="connect">connect</button>
<button id="disconnect">disconnect</button>
<div id="output"></div>`;

register();
attachConnect("connect");
attachDisconnect("disconnect");
