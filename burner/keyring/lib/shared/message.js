import { newLog } from "./log";
import { uuid } from "./config";

const log = newLog();

export const notify = (msg) => {
  log.debug("notify", `key ${msg?.key}`, msg?.data);
  if (!msg || typeof msg !== "object") {
    throw "unsupported message";
  }
  return window?.parent?.postMessage({ ...msg, uuid }, "*");
};
