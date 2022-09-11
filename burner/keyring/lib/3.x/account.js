import { Account, Signer, Provider, ec } from "starknet3";
import { notify } from "../shared/message";
import { getLocalStorage } from "lib/storage";
import { newLog } from "lib/shared/log";
import { StarknetChainId } from "starknet4/constants";
import { Signer as Signer4, Provider as Provider4, ec as ec4 } from "starknet4";
import { SessionAccount } from "@argent/x-sessions";
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

const estimateFee = async (account, data, key) => {
  {
    console.log("estimate part 1", data);
    const { calls, estimateFeeDetails } = data;
    let estimateFeeResponse;
    try {
      estimateFeeResponse = await account.estimateFee(
        calls,
        estimateFeeDetails
      );
    } catch (e) {
      console.log("error");
      return notify({
        type: "account3x_EstimateFeeResponse",
        key,
        exception: e.toString(),
      });
    }
    console.log("estimate man...", estimateFeeResponse);
    const { overall_fee, gas_consumed, gas_price, suggestedMaxFee } =
      estimateFeeResponse;
    return notify({
      type: "account3x_EstimateFeeResponse",
      data: {
        overall_fee: "0x0000",
        amount: "0x0000",
        unit: "0x0000",
        gas_price: "0x0000",

        // overall_fee: overall_fee.toString("hex"),
        // gas_consumed: gas_consumed.toString("hex"),
        // gas_price: gas_price.toString("hex"),
      },
      key,
    });
  }
};

const execute = async (account, data, key) => {
  console.log("execute - part 1 before", data);
  const { transactions } = data;
  console.log("execute - part 1 after", transactions);
  let executeResponse;
  try {
    executeResponse = await account.execute(transactions);
  } catch (e) {
    console.log("execute part 2 - failure", e.toString());
    return notify({
      type: "account3x_ExecuteResponse",
      key,
      exception: e.toString(),
    });
  }
  console.log("execute part 2 -", executeResponse);
  return notify({
    type: "account3x_ExecuteResponse",
    data: executeResponse,
    key,
  });
};

const sessionHandler = async (t, data, key) => {
  console.log("here we are");
  const sessionKey = getLocalStorage("bwsessionkey");
  const token = getLocalStorage("bwsessiontoken");
  const parsedToken = JSON.parse(token);
  const address = parsedToken?.account;
  delete (parsedToken, "account");
  const keypair = ec4.getKeyPair(sessionKey);
  const signer = new Signer4(keypair);
  console.log("account", address);
  console.log("account", parsedToken);
  const provider = new Provider4({
    sequencer: { network: StarknetChainId.TESTNET },
  });
  const sessionAccount = new SessionAccount(
    provider,
    address,
    signer,
    parsedToken
  );
  if (t === "account3x_EstimateFee") {
    console.log("account3x_EstimateFee - start", sessionAccount);
    await estimateFee(sessionAccount, data, key);
    console.log("account3x_EstimateFee - end", sessionAccount);
    return;
  }
  if (t === "account3x_Execute") {
    console.log("account3x_Execute - start", sessionAccount);
    await execute(sessionAccount, data, key);
    console.log("account3x_Execute - end", sessionAccount);
    return;
  }

  // switch (type) {
  //   case "account3x_EstimateFee":
  //     return await estimateFee(sessionAccount, data, key, parsedToken);
  //   case "account3x_Execute":
  //     return await execute(sessionAccount, data, key, parsedToken);
  //   default:
  //     log.warn("not found", type);
  //     break;
  // }
};

export const accountEventHandler = async (type, data, key) => {
  log.debug(type, key, data);
  if (type === "account3x_EstimateFee" || type === "account3x_Execute") {
    // this is rerouted to a function that relies on starknet-js v4 because it
    // is needed yet, most people developing with v3, including starknet-react
    // we want to remain with the v3 implementation for a a few more days...
    return await sessionHandler(type, data, key);
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
