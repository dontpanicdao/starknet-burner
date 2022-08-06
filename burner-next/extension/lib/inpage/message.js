const uuid = "589c80c1eb85413d";

export const sendMessage = (msg) => {
  if (msg && typeof msg === "object") {
    return window.postMessage({ ...msg, uuid }, window.location.origin);
  }
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
    const output = messageEvent.data;
    delete output.uuid;
    console.log("wallet", output);
  }
};
