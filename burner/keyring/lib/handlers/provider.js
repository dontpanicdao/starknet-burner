import { Provider } from "starknet/provider";
import { toBN } from "starknet/utils/number";
import { notify } from ".";
import { log } from "./keyring";

export const provider = new Provider({
  sequencer: { network: "goerli-alpha" },
});

export const providerEventHandler = async (type, data, key) => {
  switch (type) {
    case "provider3x_GetContractAddresses": {
      const output = await provider.getContractAddresses();
      return notify({
        type: "provider3x_GetContractAddressesResponse",
        data: output,
        key,
      });
    }
    case "provider3x_CallContract": {
      const { transactions, blockIdentifier } = data;
      const { contractAddress, entrypoint, calldata } = transactions;
      const newCall = {
        contractAddress,
        entrypoint,
        calldata: [...calldata.map((v) => toBN(v).toString(10))],
      };
      log("provider3x_CallContract", newCall, blockIdentifier);
      const output = await provider.callContract(newCall, {
        blockIdentifier,
      });
      return notify({
        type: "provider3x_CallContractResponse",
        data: output,
        key,
      });
    }
    case "provider3x_CallContract": {
      const { transactions, blockIdentifier } = data;
      const { contractAddress, entrypoint, calldata } = transactions;
      const newCall = {
        contractAddress,
        entrypoint,
        calldata: [...calldata.map((v) => toBN(v).toString(10))],
      };
      log("provider3x_CallContract", newCall, blockIdentifier);
      const output = await provider.callContract(newCall, {
        blockIdentifier,
      });
      return notify({
        type: "provider3x_CallContractResponse",
        data: output,
        key,
      });
    }
    case "provider3x_GetBlock": {
      if (!data) {
        data = { blockIdentifier: undefined };
      }
      const { blockIdentifier } = data;
      if (!blockIdentifier) {
        const output = await provider.getBlock();
        return notify({
          type: "provider3x_GetBlockResponse",
          data: output,
          key,
        });
      }
      const output = await provider.getBlock(blockIdentifier);
      return notify({ type: "provider3x_GetBlockResponse", data: output, key });
    }
    case "provider3x_GetClassAt":
      {
        const { contractAddress, blockIdentifier } = data;
        const output = await provider.getClassAt(
          contractAddress,
          blockIdentifier
        );
        notify({ type: "provider3x_GetClassAtResponse", data: output, key });
      }
      break;
    case "provider3x_GetStorageAt":
      {
        const { contractAddress, key, blockIdentifier } = data;
        const output = await provider.getStorageAt(
          contractAddress,
          key,
          blockIdentifier
        );
        notify({ type: "provider3x_GetStorageAtResponse", data: output, key });
      }
      break;
    case "provider3x_GetTransaction":
      {
        const { transactionHash } = data;
        const output = await provider.getTransaction(transactionHash);
        notify({
          type: "provider3x_GetTransactionResponse",
          data: output,
          key,
        });
      }
      break;
    case "provider3x_GetTransactionStatus":
      {
        const { transactionHash } = data;
        const output = await provider.getTransactionStatus(transactionHash);
        notify({
          type: "provider3x_GetTransactionResponse",
          data: output,
          key,
        });
      }
      break;
    case "provider3x_GetTransactionReceipt":
      {
        const { transactionHash } = data;
        const output = await provider.getTransactionReceipt(transactionHash);
        notify({
          type: "provider3x_GetTransactionReceiptResponse",
          data: output,
          key,
        });
      }
      break;
    case "provider3x_InvokeFunction":
      {
        const { invocation, details } = data;
        const output = await provider.invokeFunction(invocation, details);
        notify({
          type: "provider3x_InvokeFunctionResponse",
          data: output,
          key,
        });
      }
      break;
    case "provider3x_DeployContract":
      {
        const { payload } = data;
        const output = await provider.deployContract(payload);
        notify({
          type: "provider3x_DeployContractResponse",
          data: output,
          key,
        });
      }
      break;

    case "provider3x_GetCode":
      {
        const { contractAddress, blockIdentifier } = data;
        const output = await provider.getCode(contractAddress, blockIdentifier);
        notify({ type: "provider3x_GetCodeResponse", data: output, key });
      }
      break;
    case "provider3x_WaitForTx":
      {
        const { txHash, retryInterval } = data;
        const output = await provider.waitForTransaction(txHash, retryInterval);
        notify({ type: "provider3x_WaitForTxResponse", data: output, key });
      }
      break;
    default:
      break;
  }
};
