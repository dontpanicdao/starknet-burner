import { register } from "@starknet/burner";
import { attachConnect, attachDisconnect } from "./wallet";

document.querySelector("#app").innerHTML = `
<div id="starknetburner"></div>
<button id="connect">connect</button>
<button id="disconnect">disconnect</button>
<div id="output"></div>`;

register({ tokenId: "0x234", usePin: true });
attachConnect("connect");
attachDisconnect("disconnect");
