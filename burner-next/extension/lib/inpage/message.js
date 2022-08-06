import { account } from "./account.js";

const uuid = "589c80c1eb85413d";

const sendMessage = (msg) => {
  if (msg && typeof msg === "object") {
    return window.postMessage({ ...msg, uuid }, window.location.origin);
  }
};

export const request = (msg) => {
  if (!msg || typeof msg !== "object" || !msg.type) {
    throw new Error("Invalid message");
  }
  const burner = document.querySelector("#starknetburner");
  if (!burner) {
    throw new Error("wallet not found");
  }
  const iframe = burner.querySelector("#iframe");
  if (!iframe) {
    throw new Error("iframe not found");
  }
  console.log("sending now...", { ...msg, uuid });
  return iframe.contentWindow.postMessage({ ...msg, uuid }, "*");
};

export const waitForMessage = (type, timeout) => {
  return new Promise((resolve, reject) => {
    const pid = setTimeout(() => reject(new Error("timeout")), timeout);
    const handler = (event) => {
      if (event?.data?.type === type) {
        clearTimeout(pid);
        window.removeEventListener("message", handler);
        return resolve("data" in event.data ? event.data.data : undefined);
      }
    };
    window.addEventListener("message", handler);
  });
};

export const extensionEventHandler = (messageEvent) => {
  if (messageEvent?.data?.uuid === uuid) {
    account._events[messageEvent.data.type].forEach((fn) => {
      fn(messageEvent.data.data);
    });
  }
};
