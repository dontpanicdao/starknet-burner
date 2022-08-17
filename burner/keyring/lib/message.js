const uuid = "589c80c1eb85413d";

export const notify = (msg) => {
  if (!msg || typeof msg !== "object") {
    throw "unsupported message";
  }
  return window?.parent?.postMessage({ ...msg, uuid }, "*");
};

export const eventHandler = (event) => {
  if (event?.data?.uuid !== uuid) {
    return;
  }
  const { type, data } = event.data;
  switch (type) {
    case "ping":
      console.log("in:keyring", type, data);
      notify({ type: "pong", data });
      break;
    default:
      console.log("in:keyring", "unknown event", data);
      break;
  }
};
