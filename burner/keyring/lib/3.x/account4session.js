import { Signer, Provider, ec } from "starknet4";
import { notify } from "../shared/message";
import { getLocalStorage } from "lib/storage";
import { newLog } from "lib/shared/log";
import { SessionAccount } from "@argent/x-sessions";

const log = newLog();


