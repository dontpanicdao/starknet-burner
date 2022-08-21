import { Account, Signer, Provider, ec } from "starknet";
import { notify } from ".";

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
          calls,
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
        // TODO: rewrite the transaction to rely on the plugin
        const executeResponse = await account.execute(
          transactions,
          abis,
          transactionsDetail
        );
        notify({ type: "account_ExecuteResponse", data: executeResponse });
      }
      break;
    case "account_SignMessage":
      {
        const typedData = data;
        const signMessageResponse = await account.SignMessage(typedData);
        notify({
          type: "account_SignMessageResponse",
          data: signMessageResponse,
        });
      }
      break;
    case "account_HashMessage":
      {
        const typedData = data;
        const hashMessageResponse = await account.HashMessage(typedData);
        notify({
          type: "account_HashMessageResponse",
          data: hashMessageResponse,
        });
      }
      break;
    case "account_VerifyMessage":
      {
        const { typedData, signature } = data;
        const verifyMessageResponse = await account.VerifyMessage(
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
        const verifyMessageHashResponse = await account.VerifyMessageHash(
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
        const getNonceResponse = await account.GetNonce();
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
