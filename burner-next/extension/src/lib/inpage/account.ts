import { request } from "./message.js";
import { Account } from "../account/default";
import { defaultProvider } from "starknet";

type EVENT = [(data: any) => void];
type EventHandlers = {
  session_loaded: EVENT;
};
export const SESSION_LOADED_EVENT = "SESSION_LOADED_EVENT";

type ACTION = (data: any) => void;
type ActionHandlers = {
  reset: ACTION;
  reload: ACTION;
};

const RESET_ACTION = "RESET_ACTION";
const RELOAD_ACTION = "RELOAD_ACTION";

export class BurnerAccount extends Account {
  constructor(public address: string) {
    super(defaultProvider, address, null);
  }

  public _events: EventHandlers = {
    session_loaded: [
      (data: any) => {
        this.address = data.account;
      },
    ],
  };

  public _actions: ActionHandlers = {
    reset: () => {
      console.log("send reset action");
      request({ type: RESET_ACTION, data: {} });
    },
    reload: () => {
      request({ type: RELOAD_ACTION, data: {} });
    },
  };
}

export const account = new BurnerAccount("0x0");

export const addEvent = (type: string, fn: (data: any) => void) => {
  if (type === SESSION_LOADED_EVENT) {
    account._events.session_loaded.push(fn);
  }
};
