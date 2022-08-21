import { Account, Signer, Provider, ec } from "starknet";
import { notify } from ".";
import { toBN } from "starknet/utils/number";
import { getLocalStorage } from "lib/handleLocalStorage";

// TODO: make the plugin configurable; it should include:
// - the plugin hash
// - addition parameters that might come between the exire and the token
//   and should be loaded from a URL.
const pluginHash =
  "0x377e145923e881f59d62269a46057d8dac67e27d68a12679b198d4224a0966b";

const patchTransaction = (calls) => {
  if (!calls) {
    throw new Error("no calls provided");
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
    contractAddress: toBN(account).toString(10),
    entrypoint: toBN(
      "0x27ad8765fc3b8f3afef2481081767daadd0abafbd10a7face32534f2e4730e2"
    ).toString(10), // use_plugin
    callData: [
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

export const accountEventHandler = async (type, data) => {
  const sessionKey = getLocalStorage("bwsessionkey");
  const token = getLocalStorage("bwsessiontoken");
  const address = JSON.parse(token)?.account;
  const keypair = ec.getKeyPair(sessionKey);
  const signer = new Signer(keypair);
  const provider = new Provider({ sequencer: { network: "alpha-goerli" } });
  const account = new Account(provider, address, signer);
  switch (type) {
    case "account_EstimateFee":
      {
        const { calls, estimateFeeDetails } = data;
        const estimateFeeResponse = await account.estimateFee(
          patchTransaction(calls),
          estimateFeeDetails
        );
        notify({
          type: "account_EstimateFeeResponse",
          data: estimateFeeResponse,
        });
      }
      break;
    case "account_Execute":
      {
        const { transactions, abis, transactionsDetail } = data;
        const executeResponse = await account.execute(
          patchTransaction(transactions),
          abis,
          transactionsDetail
        );
        notify({ type: "account_ExecuteResponse", data: executeResponse });
      }
      break;
    case "account_SignMessage":
      {
        const typedData = data;
        const signMessageResponse = await account.signMessage(typedData);
        notify({
          type: "account_SignMessageResponse",
          data: signMessageResponse,
        });
      }
      break;
    case "account_HashMessage":
      {
        const typedData = data;
        const hashMessageResponse = await account.hashMessage(typedData);
        notify({
          type: "account_HashMessageResponse",
          data: hashMessageResponse,
        });
      }
      break;
    case "account_VerifyMessage":
      {
        const { typedData, signature } = data;
        const verifyMessageResponse = await account.verifyMessage(
          typedData,
          signature
        );
        notify({
          type: "account_VerifyMessageResponse",
          data: verifyMessageResponse,
        });
      }
      break;
    case "account_VerifyMessageHash":
      {
        const { hash, signature } = data;
        const verifyMessageHashResponse = await account.verifyMessageHash(
          hash,
          signature
        );
        notify({
          type: "account_VerifyMessageHashResponse",
          data: verifyMessageHashResponse,
        });
      }
      break;
    case "account_GetNonce":
      {
        const getNonceResponse = await account.getNonce();
        notify({
          type: "account_GetNonceResponse",
          data: getNonceResponse,
        });
      }
      break;
    default:
      break;
  }
};
