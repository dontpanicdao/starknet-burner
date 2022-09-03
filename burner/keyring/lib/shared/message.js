import { newLog } from "./log";
import { uuid } from "./config";

const log = newLog();

export const notify = (msg) => {
  if (!msg || typeof msg !== "object") {
    throw "unsupported message";
  }
  return window?.parent?.postMessage({ ...msg, uuid }, "*");
};
