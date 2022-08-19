export const accountEventHandler = async (type, data) => {
  switch (type) {
    case "account_EstimateFee":
      {
        const { calls, estimateFeeDetails } = data;
      }
      break;
    case "account_Execute":
      {
        const { transactions, abis, transactionsDetail } = data;
      }
      break;
    case "account_SignMessage":
      {
        const typedData = data;
      }
      break;
    case "account_HashMessage":
      {
        const typedData = data;
      }
      break;
    case "account_VerifyMessage":
      {
        const { typedData, signature } = data;
      }
      break;
    case "account_VerifyMessageHash":
      {
        const { hash, signature } = data;
      }
      break;
    case "account_GetNonce":
      break;
    default:
      break;
  }
};
