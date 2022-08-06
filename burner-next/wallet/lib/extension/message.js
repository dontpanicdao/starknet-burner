const uuid = "589c80c1eb85413d";

export const notify = (msg) => {
  if (msg && typeof msg === "object" && msg?.type && msg?.data) {
    return window?.parent?.postMessage({ ...msg, uuid }, "*");
  }
  throw new Error("unsupported message");
};
