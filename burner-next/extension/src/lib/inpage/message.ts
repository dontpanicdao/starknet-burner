import { account, SESSION_LOADED_EVENT } from "./account";

const uuid = "589c80c1eb85413d";

export const request = (msg: any) => {
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
    return;
  }
  console.log("sending now...", { ...msg, uuid });
  return iframe.contentWindow?.postMessage({ ...msg, uuid }, "*");
};

export const waitForMessage = (
  type: string,
  timeout: number
): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    const pid = setTimeout(() => reject(new Error("timeout")), timeout);
    const handler = (event: MessageEvent) => {
      if (event?.data?.type === type) {
        clearTimeout(pid);
        window.removeEventListener("message", handler);
        return resolve("data" in event.data ? event.data.data : undefined);
      }
    };
    window.addEventListener("message", handler);
  });
};

export const extensionEventHandler = (messageEvent: MessageEvent) => {
  if (messageEvent?.data?.uuid === uuid) {
    if (!account) {
      return;
    }
    if (messageEvent?.data?.type === SESSION_LOADED_EVENT) {
      account._events.session_loaded.forEach((fn: (data: string) => void) => {
        console.log(`event ${messageEvent.data.type} received in extension`);
        if (
          !messageEvent.data.data &&
          typeof messageEvent.data.data !== "string"
        ) {
          return;
        }
        fn(messageEvent.data.data);
      });
    }
  }
};
