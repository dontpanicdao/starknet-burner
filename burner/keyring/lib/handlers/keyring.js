import { notify, callBacks } from "../message";

export const keyringEventHandler = async (type, data) => {
  switch (type) {
    case "keyring_Ping":
      notify({ type: "keyring_Pong", data });
      break;
    case "keyring_OpenModal":
      callBacks.setDisplay(true);
      notify({ type: "keyring_OpenModal", data: "ack" });
      break;
    case "keyring_CloseModal":
      callBacks.setDisplay(false);
      notify({ type: "keyring_CloseModal", data: "ack" });
      break;
    default:
      break;
  }
};
