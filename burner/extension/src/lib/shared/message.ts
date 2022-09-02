import { uuid, defaultTimeoutMilliseconds } from "./config";

export type MessageType = {
  type: string;
  data?: string | number | object;
};

let keyIdentifier = 1;

export const getKey = (): string => {
  keyIdentifier++;
  return keyIdentifier.toString();
};

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
  predicate: (x: T) => boolean = () => true
): Promise<T extends { data: infer S } ? S : undefined> => {
  return new Promise((resolve, reject) => {
    const pid = setTimeout(
      () => reject(new Error("Timeout")),
      defaultTimeoutMilliseconds
    );
    const handler = (
      event: MessageEvent<MessageType & { key: string; uuid: string }>
    ) => {
      if (
        event.data.type === type &&
        event.data.uuid === uuid &&
        event.data.key === key &&
        predicate(event.data as any)
      ) {
        clearTimeout(pid);
        window.removeEventListener("message", handler);
        return resolve(
          ("data" in event.data ? event.data.data : undefined) as any
        );
      }
    };
    window.addEventListener("message", handler);
  });
};
