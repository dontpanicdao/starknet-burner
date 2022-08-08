const uuid = "589c80c1eb85413d";
export const SESSION_LOADED_EVENT = "SESSION_LOADED_EVENT";
export const RESET_ACTION = "RESET_ACTION";
export const RELOAD_ACTION = "RELOAD_ACTION";

export const notify = (msg) => {
  if (msg && typeof msg === "object" && msg?.type && msg?.data) {
    return window?.parent?.postMessage({ ...msg, uuid }, "*");
  }
  console.log("notify", msg);
  throw new Error("unsupported message");
};

export const eventHandler =
  ({ resetAction, reloadAction }) =>
  (event) => {
    if (event?.data?.uuid === uuid) {
      switch (event.data.type) {
        case RESET_ACTION:
          return resetAction ? resetAction() : true;
        case RELOAD_ACTION:
          return reloadAction ? reloadAction() : true;
        default:
          throw new Error("unsupported event type", event?.data);
      }
    }
    if (event?.data?.extensionId) {
      return;
    }
    console.log("unknown event", event?.data);
  };
