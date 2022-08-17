import { Call } from "starknet/types/lib";
import { BlockIdentifier } from "starknet/provider/utils";
import { CallContractResponse } from "starknet/types/provider";

const uuid = "589c80c1eb85413d";

export enum messageType {
  ping = "ping",
  display = "display",
  call = "call",
}

export type burnerMessage = {
  uuid: string | undefined;
  type: messageType;
  data: any;
};

export const request = (msg: burnerMessage) => {
  if (!msg || typeof msg !== "object" || !msg.type) {
    throw new Error("Invalid message");
  }
  const burner = document.querySelector("#starknetburner");
  if (!burner) {
    throw new Error("wallet not found");
  }
  const iframe = burner.querySelector<HTMLIFrameElement>("#iframe");
  if (!iframe) {
    throw new Error("iframe not found");
  }
  return iframe.contentWindow?.postMessage({ ...msg, uuid }, "*");
};

export const extensionEventHandler = (event: MessageEvent) => {
  if (event?.data?.uuid !== uuid) {
    return;
  }
  const { type, data } = event.data;
  switch (type) {
    case "pong":
      console.log("in:extension", type, data);
      break;
    case "display":
      console.log("in:extension", type, data);
      break;
    default:
      console.log("in:extension", "default event", type);
      break;
  }
};

export const waitForCallContractMessage = async (
  timeout: number
): Promise<CallContractResponse> => {
  return new Promise((resolve, reject) => {
    const pid = setTimeout(() => reject(new Error("Timeout")), timeout);
    const handler = (event: MessageEvent) => {
      if (event?.data?.uuid !== uuid) {
        return;
      }
      const { type, data } = event.data;
      if (type !== "call") {
        return;
      }
      clearTimeout(pid);
      window.removeEventListener("message", handler);
      return resolve(data as CallContractResponse);
    };
    window.addEventListener("message", handler);
  });
};

export const callContract = async (
  call: Call,
  blockIdentifier: BlockIdentifier = "pending"
): Promise<CallContractResponse> => {
  request({
    type: messageType.call,
    data: { call, blockIdentifier },
    uuid,
  });
  const a = await waitForCallContractMessage(2000);
  console.log(a);
  return a;
};

// const a = window['burner-request']
// a.callContract({
// 	contractAddress: "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
// 	entrypoint: "balanceOf",
// 	calldata: ["0x0207aCC15dc241e7d167E67e30E769719A727d3E0fa47f9E187707289885Dfde"],
// })
