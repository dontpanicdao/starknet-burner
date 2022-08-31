import { Provider } from "starknet/provider";
import { toBN } from "starknet/utils/number";
import { notify } from ".";
import { log } from "./keyring";

export const provider = new Provider({
  sequencer: { network: "goerli-alpha" },
});

export const providerEventHandler = async (type, data, key) => {
  switch (type) {
    case "provider_GetContractAddresses": {
      const output = await provider.getContractAddresses();
      return notify({
        type: "provider_GetContractAddressesResponse",
        data: output,
        key,
      });
    }
    case "provider_CallContract": {
      const { transactions, blockIdentifier } = data;
      const { contractAddress, entrypoint, calldata } = transactions;
      const newCall = {
        contractAddress,
        entrypoint,
        calldata: [...calldata.map((v) => toBN(v).toString(10))],
      };
      log("provider_CallContract", newCall, blockIdentifier);
      const output = await provider.callContract(newCall, {
        blockIdentifier,
      });
      return notify({
        type: "provider_CallContractResponse",
        data: output,
        key,
      });
    }
    case "provider_CallContract": {
      const { transactions, blockIdentifier } = data;
      const { contractAddress, entrypoint, calldata } = transactions;
      const newCall = {
        contractAddress,
        entrypoint,
        calldata: [...calldata.map((v) => toBN(v).toString(10))],
      };
      log("provider_CallContract", newCall, blockIdentifier);
      const output = await provider.callContract(newCall, {
        blockIdentifier,
      });
      return notify({
        type: "provider_CallContractResponse",
        data: output,
        key,
      });
    }
    case "provider_GetBlock": {
      if (!data) {
        data = { blockIdentifier: undefined };
      }
      const { blockIdentifier } = data;
      if (!blockIdentifier) {
        const output = await provider.getBlock();
        return notify({ type: "provider_GetBlockResponse", data: output, key });
      }
      const output = await provider.getBlock(blockIdentifier);
      return notify({ type: "provider_GetBlockResponse", data: output, key });
    }
    case "provider_GetClassAt":
      {
        const { contractAddress, blockIdentifier } = data;
        const output = await provider.getClassAt(
          contractAddress,
          blockIdentifier
        );
        notify({ type: "provider_GetClassAtResponse", data: output, key });
      }
      break;
    case "provider_GetStorageAt":
      {
        const { contractAddress, key, blockIdentifier } = data;
        const output = await provider.getStorageAt(
          contractAddress,
          key,
          blockIdentifier
        );
        notify({ type: "provider_GetStorageAtResponse", data: output, key });
      }
      break;
    case "provider_GetTransaction":
      {
        const { transactionHash } = data;
        const output = await provider.getTransaction(transactionHash);
        notify({ type: "provider_GetTransactionResponse", data: output, key });
      }
      break;
    case "provider_GetTransactionStatus":
      {
        const { transactionHash } = data;
        const output = await provider.getTransactionStatus(transactionHash);
        notify({ type: "provider_GetTransactionResponse", data: output, key });
      }
      break;
    case "provider_GetTransactionReceipt":
      {
        const { transactionHash } = data;
        const output = await provider.getTransactionReceipt(transactionHash);
        notify({
          type: "provider_GetTransactionReceiptResponse",
          data: output,
          key,
        });
      }
      break;
    case "provider_InvokeFunction":
      {
        const { invocation, details } = data;
        const output = await provider.invokeFunction(invocation, details);
        notify({ type: "provider_InvokeFunctionResponse", data: output });
      }
      break;
    case "provider_DeployContract":
      {
        const { payload } = data;
        const output = await provider.deployContract(payload);
        notify({ type: "provider_DeployContractResponse", data: output });
      }
      break;

    case "provider_GetCode":
      {
        const { contractAddress, blockIdentifier } = data;
        const output = await provider.getCode(contractAddress, blockIdentifier);
        notify({ type: "provider_GetCodeResponse", data: output });
      }
      break;
    case "provider_WaitForTx":
      {
        const { txHash, retryInterval } = data;
        const output = await provider.waitForTransaction(txHash, retryInterval);
        notify({ type: "provider_WaitForTxResponse", data: output });
      }
      break;
    default:
      break;
  }
};
