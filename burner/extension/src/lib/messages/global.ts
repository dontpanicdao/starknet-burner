import { uuid } from "./index";

export type GlobalMessage =
  | {
      type: "keyring_Ping";
      data: string;
    }
  | {
      type: "keyring_Pong";
      data: string;
    }
  | {
      type: "keyring_OpenModal";
      data?: string;
    }
  | {
      type: "keyring_CloseModal";
      data?: string;
    };

export const extensionEventHandler = (event: MessageEvent) => {
  if (event?.data?.uuid !== uuid) {
    return;
  }
  const { type, data } = event.data;
  console.log("in:extension", type, data);
  switch (type) {
    case "keyring_Pong":
      break;
    case "keyring_OpenModal":
      break;
    case "CLOSE_MODAL":
      break;
    case "CALL_CONTRACT_RES":
      break;
    default:
      console.log("in:extension", "umknown event", type);
      break;
  }
};
