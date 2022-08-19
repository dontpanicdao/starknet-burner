import { uuid } from "./index";

export type GlobalMessage =
  | {
      type: "PING";
      data: string;
    }
  | {
      type: "PONG";
      data: string;
    }
  | {
      type: "OPEN_MODAL";
      data?: string;
    }
  | {
      type: "CLOSE_MODAL";
      data?: string;
    };

export const extensionEventHandler = (event: MessageEvent) => {
  if (event?.data?.uuid !== uuid) {
    return;
  }
  const { type, data } = event.data;
  switch (type) {
    case "PONG":
      console.log("in:extension", type, data);
      break;
    case "OPEN_MODAL":
      console.log("in:extension", type, data);
      break;
    case "CLOSE_MODAL":
      console.log("in:extension", type, data);
      break;
    case "CALL_CONTRACT_RES":
      break;
    default:
      console.log("in:extension", "unexpected event type", type);
      break;
  }
};
