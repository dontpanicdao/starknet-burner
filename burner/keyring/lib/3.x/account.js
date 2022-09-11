import { Account, Signer, Provider, ec } from "starknet3";
import { notify } from "../shared/message";
import { getLocalStorage } from "lib/storage";
import { newLog } from "lib/shared/log";
import { account4sessionEventHandler } from "./account4session";

const log = newLog();

const signMessage = async (account, data, key) => {
  const typedData = data;
  const signMessageResponse = await account.signMessage(typedData);
  notify({
    type: "account3x_SignMessageResponse",
    data: signMessageResponse,
    key,
  });
};

const hashMessage = async (account, data, key) => {
  const typedData = data;
  const hashMessageResponse = await account.hashMessage(typedData);
  notify({
    type: "account3x_HashMessageResponse",
    data: hashMessageResponse,
    key,
  });
};

const verifyMessage = async (account, data, key) => {
  const { typedData, signature } = data;
  const verifyMessageResponse = await account.verifyMessage(
    typedData,
    signature
  );
  notify({
    type: "account3x_VerifyMessageResponse",
    data: verifyMessageResponse,
    key,
  });
};

const verifyMessageHash = async (account, data, key) => {
  const { hash, signature } = data;
  const verifyMessageHashResponse = await account.verifyMessageHash(
    hash,
    signature
  );
  notify({
    type: "account3x_VerifyMessageHashResponse",
    data: verifyMessageHashResponse,
    key,
  });
};

const getNonce = async (account, data, key) => {
  let getNonceResponse;
  try {
    getNonceResponse = await account.getNonce();
  } catch (e) {
    return notify({
      type: "account3x_GetNonceResponse",
      key,
      exception: e.toString(),
    });
  }
  notify({
    type: "account3x_GetNonceResponse",
    data: getNonceResponse,
    key,
  });
};

export const accountEventHandler = async (type, data, key) => {
  log.debug(type, key, data);
  if (type === "account3x_EstimateFee" || type === "account3x_Execute") {
    // this is rerouted to a function that relies on starknet-js v4 because it
    // is needed yet, most people developing with v3, including starknet-react
    // we want to remain with the v3 implementation for a a few more days...
    return await account4sessionEventHandler(type, data, key);
  }
  const sessionKey = getLocalStorage("bwsessionkey");
  const token = getLocalStorage("bwsessiontoken");
  const parsedToken = JSON.parse(token);
  const address = parsedToken?.account;
  delete (parsedToken, "account");
  const keypair = ec.getKeyPair(sessionKey);
  const signer = new Signer(keypair);
  const provider = new Provider({ sequencer: { network: "alpha-goerli" } });
  const account = new Account(provider, address, signer);
  switch (type) {
    case "account3x_SignMessage":
      return await signMessage(account, data, key);
    case "account3x_HashMessage":
      return await hashMessage(account, data, key);
    case "account3x_VerifyMessage":
      return await verifyMessage(account, data, key);
    case "account3x_VerifyMessageHash":
      return await verifyMessageHash(account, data, key);
    case "account3x_GetNonce":
      return await getNonce(account, data, key);
    default:
      log.warn("not found", type);
      break;
  }
};
