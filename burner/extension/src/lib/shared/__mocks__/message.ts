import { shortTimeoutMilliseconds } from "../../shared/config";
import { StarknetChainId } from "starknet3x/constants";
import { StatusResponse } from "../../keyring";

export type MockStatusResponse = {
  connected: boolean;
  network?: StarknetChainId;
  addresses?: string[];
};

export type MessageType =
  | {
      type: string;
      data: boolean;
    }
  | {
      type: string;
      data: string;
    }
  | {
      type: string;
      data: MockStatusResponse;
    }
  | {
      type: string;
    };

export type MessageTypeWithUuid = MessageType & { uuid: string };

export const getKey = (): string => {
  return "777";
};

const keyring_Pong: MessageTypeWithUuid = {
  type: "keyring_Pong",
  data: "ough",
  uuid: "777",
};

const keyring_DebugMessage: MessageTypeWithUuid = {
  type: "keyring_Debug",
  data: true,
  uuid: "777",
};

const keyring_CheckStatusResponse: MessageTypeWithUuid = {
  type: "keyring_CheckStatusResponse",
  data: {
    connected: true,
    network: StarknetChainId.TESTNET,
    addresses: ["0x7", "0x1"],
  },
  uuid: "777",
};

export const sendMessage = (msg: MessageType, key: string): void => {
  if (msg.type === "keyring_SetDebug") {
    keyring_DebugMessage.data = true;
    return;
  }
  if (msg.type === "keyring_ClearDebug") {
    keyring_DebugMessage.data = false;
    return;
  }
  if (msg.type === "keyring_Ping") {
    keyring_Pong.data = "data" in msg ? (msg.data as string) : "ping";
    return;
  }
  if (msg.type === "keyring_ResetSessionKey") {
    const output: MockStatusResponse = { connected: false };
    keyring_CheckStatusResponse.data = output;
    return;
  }
};

export const waitForMessage = async <
  K extends MessageType["type"],
  T extends { type: K } & MessageType
>(
  t: K,
  key: string,
  timeout: number = shortTimeoutMilliseconds,
  predicate: (x: T) => boolean = () => true
): Promise<T extends { data: infer S } ? S : undefined> => {
  switch (t) {
    case "keyring_Pong": {
      const v = keyring_Pong;
      if (key === v.uuid) {
        return new Promise((resolve) =>
          resolve(("data" in v ? v.data : undefined) as any)
        );
      }
    }
    case "keyring_Debug": {
      const v = keyring_DebugMessage;
      if (key === v.uuid) {
        return new Promise((resolve) =>
          resolve(("data" in v ? v.data : undefined) as any)
        );
      }
    }
    case "keyring_CheckStatusResponse": {
      const v = keyring_CheckStatusResponse;
      if (key === v.uuid) {
        return new Promise((resolve) =>
          resolve(("data" in v ? v.data : undefined) as any)
        );
      }
      return new Promise((resolve) => {
        resolve(undefined);
      });
    }
    case "keyring_CloseModalRequested":
      if (key === "close") {
        return new Promise((resolve) => {
          resolve(undefined);
        });
      }
    default: {
      return new Promise((resolve) => {
        resolve(undefined);
      });
    }
  }
};
