import { register } from "@starknet/burner";
import { attachConnect, attachDisconnect } from "./wallet";

register();
attachConnect("connect");
attachDisconnect("disconnect");
