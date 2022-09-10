import { Account, Signer, Provider, ec, transaction } from "starknet";
import { notify } from "../shared/message";
import { getLocalStorage } from "lib/storage";
import { newLog } from "lib/shared/log";
import { SessionAccount } from "@argent/x-sessions";

const log = newLog();

const estimateFee = async (account, data, key) => {
  {
    const { calls, estimateFeeDetails } = data;
    let estimateFeeResponse;
    try {
      estimateFeeResponse = await account.estimateFee(
        calls,
        estimateFeeDetails
      );
    } catch (e) {
      return notify({
        type: "account3x_EstimateFeeResponse",
        key,
        exception: e.toString(),
      });
    }
    const { overall_fee, gas_consumed, gas_price, suggestedMaxFee } =
      estimateFeeResponse;
    return notify({
      type: "account3x_EstimateFeeResponse",
      data: {
        overall_fee: overall_fee.toString("hex"),
        gas_consumed: gas_consumed.toString("hex"),
        gas_price: gas_price.toString("hex"),
        suggestedMaxFee: suggestedMaxFee.toString("hex"),
      },
      key,
    });
  }
};

const execute = async (account, data, key) => {
  console.log("yes");
  const { transactions, abis, transactionsDetail } = data;
  console.log("yes 1", transactions, abis, transactionsDetail);
  let executeResponse;
  try {
    executeResponse = await account.execute(
      transactions,
      abis,
      transactionsDetail
    );
  } catch (e) {
    console.log("yes 2", e.toString());
    return notify({
      type: "account3x_ExecuteResponse",
      key,
      exception: e.toString(),
    });
  }
  console.log("yes notify", executeResponse);
  return notify({
    type: "account3x_ExecuteResponse",
    data: executeResponse,
    key,
  });
};

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
  const sessionKey = getLocalStorage("bwsessionkey");
  const token = getLocalStorage("bwsessiontoken");
  const parsedToken = JSON.parse(token);
  const address = parsedToken?.account;
  delete (parsedToken, "account");
  const keypair = ec.getKeyPair(sessionKey);
  const signer = new Signer(keypair);
  const provider = new Provider({ sequencer: { network: "alpha-goerli" } });
  const account = new Account(provider, address, signer);
  const sessionAccount = new SessionAccount(
    provider,
    address,
    signer,
    parsedToken
  );
  switch (type) {
    case "account3x_EstimateFee":
      return await estimateFee(sessionAccount, data, key);
    case "account3x_Execute":
      return await execute(sessionAccount, data, key, parsedToken);
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
