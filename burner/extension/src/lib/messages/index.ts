import { TransactionMessage } from "./TransactionMessage";
import { ProviderMessage, callContract } from "./ProviderMessage";
import { extensionEventHandler, GlobalMessage } from "./GlobalMessage";

export const uuid = "589c80c1eb85413d";
const defaultTimeoutMilliseconds = 5000;

export type MessageType = TransactionMessage | ProviderMessage | GlobalMessage;

export type WindowMessageType = MessageType & {
  uuid: string;
};

const keyring = document
  .querySelector("#starknetburner")
  ?.querySelector<HTMLIFrameElement>("#iframe");

export const sendMessage = (msg: MessageType): void => {
  return keyring?.contentWindow?.postMessage({ ...msg, uuid }, "*");
};

export const waitForMessage = async <
  K extends MessageType["type"],
  T extends { type: K } & MessageType
>(
  type: K,
  predicate: (x: T) => boolean = () => true
): Promise<T extends { data: infer S } ? S : undefined> => {
  return new Promise((resolve, reject) => {
    const pid = setTimeout(
      () => reject(new Error("Timeout")),
      defaultTimeoutMilliseconds
    );
    const handler = (event: MessageEvent<WindowMessageType>) => {
      if (
        event.data.type === type &&
        event.data.uuid === uuid &&
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

export { callContract, extensionEventHandler };
