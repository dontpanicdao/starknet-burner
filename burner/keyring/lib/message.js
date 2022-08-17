import { provider } from "./starknet";
import { toBN } from "starknet/utils/number";

const uuid = "589c80c1eb85413d";

export const notify = (msg) => {
  if (!msg || typeof msg !== "object") {
    throw "unsupported message";
  }
  return window?.parent?.postMessage({ ...msg, uuid }, "*");
};

export const eventHandler = async (event) => {
  if (event?.data?.uuid !== uuid) {
    return;
  }
  const { type, data } = event.data;
  console.log("in:keyring", type, data);
  switch (type) {
    case "ping":
      notify({ type: "pong", data });
      break;
    case "display":
      callBacks.setDisplay(data === "on" ? true : false);
      notify({ type: "display", data: "ack" });
      break;
    case "call":
      const { call, blockIdentifier } = data;
      const { contractAddress, entrypoint, calldata } = call;
      const newCall = {
        contractAddress,
        entrypoint,
        calldata: [...calldata.map((v) => toBN(v).toString(10))],
      };
      const output = await provider.callContract(newCall, blockIdentifier);
      notify({ type: "call", data: output });
      break;
    default:
      break;
  }
};
const callBacks = {
  setDisplay: () => {},
};
export const injectSetDisplay = (fn) => {
  callBacks.setDisplay = fn;
};
