import {
  uuid,
  infiniteTimeoutMilliseconds,
  shortTimeoutMilliseconds,
} from "./config";
import { newLog } from "./log";

export type MessageType = {
  type: string;
  data?: string | number | boolean | object;
};

let keyIdentifier = 1;

export const getKey = (): string => {
  keyIdentifier++;
  return keyIdentifier.toString();
};

const log = newLog();

export const sendMessage = (msg: MessageType, key: string): void => {
  const keyring = document
    .querySelector("#starknetburner")
    ?.querySelector<HTMLIFrameElement>("#iframe");
  return keyring?.contentWindow?.postMessage({ ...msg, uuid, key }, "*");
};

export const waitForMessage = async <
  K extends MessageType["type"],
  T extends { type: K } & MessageType
>(
  type: K,
  key: string,
  timeout: number = shortTimeoutMilliseconds,
  predicate: (x: T) => boolean = () => true
): Promise<T extends { data: infer S } ? S : undefined> => {
  if (timeout === 0) {
    timeout = infiniteTimeoutMilliseconds;
  }
  return new Promise((resolve, reject) => {
    const pid = setTimeout(() => reject(new Error("Timeout")), timeout);
    const handler = (
      event: MessageEvent<
        MessageType & { key: string; uuid: string; exception?: string }
      >
    ) => {
      if (
        event.data.type === type &&
        event.data.uuid === uuid &&
        event.data.key === key &&
        predicate(event.data as any)
      ) {
        clearTimeout(pid);
        window.removeEventListener("message", handler);
        if (event.data?.exception) {
          log.error(event.data.type, "exception", event.data.exception);
          return reject(new Error(event.data.exception));
        }
        return resolve(
          ("data" in event.data ? event.data.data : undefined) as any
        );
      }
    };
    window.addEventListener("message", handler);
  });
};
