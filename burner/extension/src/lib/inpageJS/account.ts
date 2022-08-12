import { request } from "./message.js";
export const SESSION_LOADED_EVENT = "SESSION_LOADED_EVENT";
const RESET_ACTION = "RESET_ACTION";
const RELOAD_ACTION = "RELOAD_ACTION";

export const reload = () => {
  request({ type: RELOAD_ACTION, data: {} });
};

export const account: any = {
  _events: {
    SESSION_LOADED_EVENT: [
      (data: any) => {
        account.selectedAddress = data.account;
      },
    ],
  },
  _actions: {
    reset: () => {
      console.log("send reset action");
      request({ type: RESET_ACTION, data: {} });
    },
  },
};

export const removeEvent = (type: string, fn: (data: any) => void) => {
  let i = -1;
  for (const eventFn of account._events[type]) {
    i++;
    if (fn == eventFn) {
      account._events[type].splice(i, 1);
      return;
    }
  }
};

export const addEvent = (type: string, fn: (data: any) => void) => {
  for (const eventFn of account._events[type]) {
    if (fn == eventFn) {
      return;
    }
  }
  account._events[type].push(fn);
};
