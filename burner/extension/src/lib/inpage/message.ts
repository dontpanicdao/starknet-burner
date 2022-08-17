const uuid = "589c80c1eb85413d";

export type burnerMessage = {
  uuid: string | undefined;
  type: string;
  data: any;
};

export const requestFactory = (
  debug: boolean
): ((msg: burnerMessage) => void) => {
  const request = (msg: burnerMessage) => {
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
    if (debug) {
      console.log("sending now...", { ...msg, uuid });
    }
    return iframe.contentWindow?.postMessage({ ...msg, uuid }, "*");
  };
  return request;
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
    default:
      console.log("in:extension", "default event", type);
      break;
  }
};
