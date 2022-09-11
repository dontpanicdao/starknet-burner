import { Signer, ec } from "starknet3";
import { notify } from "../shared/message";
import { getLocalStorage } from "lib/storage";
import { newLog } from "lib/shared/log";

const log = newLog();

const getPubKey = async (signer, data, key) => {
  const publicKey = await signer.getPubKey();
  notify({
    type: "signer3x_GetPubKeyResponse",
    data: publicKey,
    key,
  });
};

const signMessage = async (signer, data, key) => {
  const signMessageResponse = await signer.signMessage(data);
  notify({
    type: "signer3x_SignMessageResponse",
    data: signMessageResponse,
    key,
  });
};

const signTransaction = async (signer, data, key) => {
  const { transactions, transactionsDetail, abis } = data;
  const signTransactionResponse = await signer.signTransaction(
    transactions,
    transactionsDetail,
    abis
  );
  notify({
    type: "signer3x_SignTransactionResponse",
    data: signTransactionResponse,
    key,
  });
};

export const signerEventHandler = async (type, data, key) => {
  const sessionKey = getLocalStorage("bwsessionkey");
  const keypair = ec.getKeyPair(sessionKey);
  const signer = new Signer(keypair);
  switch (type) {
    case "signer3x_GetPubKey":
      return await getPubKey(signer, data, key);
    case "signer3x_SignMessage":
      return await signMessage(signer, data, key);
    case "signer3x_SignTransaction":
      return await signTransaction(signer, data, key);
    default:
      log.warn("not found", type);
      break;
  }
};
