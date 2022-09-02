import { Account, Signer, Provider, ec, transaction } from "starknet";
import { notify } from "../shared/message";
import { toBN } from "starknet/utils/number";
import { getLocalStorage } from "lib/storage";
import { newLog } from "lib/shared/log";

// TODO: make the plugin configurable; it should include:
// - the plugin hash
// - addition parameters that might come between the exire and the token
//   and should be loaded from a URL.
const pluginHash =
  "0x377e145923e881f59d62269a46057d8dac67e27d68a12679b198d4224a0966b";

const log = newLog();

const patchTransaction = (calls) => {
  if (!calls) {
    throw new Error("no calls provided");
  }
  let contract = calls.contractAddress;
  if (calls instanceof Array) {
    contract = calls[0].contractAddress;
  }
  const storedSessionToken = getLocalStorage("bwsessiontoken");
  if (!storedSessionToken) {
    throw new Error("no session token found");
  }
  const sessionToken = JSON.parse(storedSessionToken);
  if (!sessionToken) {
    throw new Error("error parsing session token");
  }
  const { account, expires, sessionPublicKey, token } = sessionToken;
  if (
    !(token instanceof Array) ||
    token.length !== 2 ||
    !account ||
    !expires ||
    !sessionPublicKey
  ) {
    throw new Error("error parsing session token");
  }
  const pluginCall = {
    contractAddress: contract,
    entrypoint: "use_plugin",
    calldata: [
      toBN(pluginHash).toString(10),
      toBN(sessionPublicKey).toString(10),
      toBN(expires).toString(10),
      toBN(token[0]).toString(10),
      toBN(token[1]).toString(10),
    ],
  };
  if (calls instanceof Array) {
    return [pluginCall, ...calls];
  }
  return [pluginCall, calls];
};

const estimateFee = async (account, data, key) => {
  {
    const { calls, estimateFeeDetails } = data;
    let estimateFeeResponse;
    try {
      estimateFeeResponse = await account.estimateFee(
        patchTransaction(calls),
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
  const { transactions, abis, transactionsDetail } = data;
  let executeResponse;
  try {
    executeResponse = await account.execute(
      patchTransaction(transactions),
      abis,
      transactionsDetail
    );
  } catch (e) {
    return notify({
      type: "account3x_ExecuteResponse",
      key,
      exception: e.toString(),
    });
  }
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
  const sessionKey = getLocalStorage("bwsessionkey");
  const token = getLocalStorage("bwsessiontoken");
  const address = JSON.parse(token)?.account;
  const keypair = ec.getKeyPair(sessionKey);
  const signer = new Signer(keypair);
  const provider = new Provider({ sequencer: { network: "alpha-goerli" } });
  const account = new Account(provider, address, signer);
  switch (type) {
    case "account3x_EstimateFee":
      return await estimateFee(account, data, key);
    case "account3x_Execute":
      return await execute(account, data, key);
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
