import { Provider } from "starknet/provider";
import { toBN } from "starknet/utils/number";
import { notify } from "../shared/message";
import { newLog } from "../shared/log";

export const provider = new Provider({
  sequencer: { network: "goerli-alpha" },
});

const log = newLog();

const getContractAddresses = async (data, key) => {
  const output = await provider.getContractAddresses();
  return notify({
    type: "provider3x_GetContractAddressesResponse",
    data: output,
    key,
  });
};

const callContract = async (data, key) => {
  const { transactions, blockIdentifier } = data;
  const { contractAddress, entrypoint, calldata } = transactions;
  const newCall = {
    contractAddress,
    entrypoint,
    calldata: [...calldata.map((v) => toBN(v).toString(10))],
  };
  log.debug("provider3x_CallContract - start", newCall);
  const output = await provider.callContract(newCall, {
    blockIdentifier,
  });
  log.debug("provider3x_CallContract - end", output);
  return notify({
    type: "provider3x_CallContractResponse",
    data: output,
    key,
  });
};

const getBlock = async (data, key) => {
  if (!data) {
    return notify({
      type: "provider3x_GetBlockResponse",
      key,
      exception: "undefined block",
    });
  }
  const { blockIdentifier } = data;
  if (!blockIdentifier) {
    return notify({
      type: "provider3x_GetBlockResponse",
      key,
      exception: "undefined block",
    });
  }
  const output = await provider.getBlock(blockIdentifier);
  return notify({ type: "provider3x_GetBlockResponse", data: output, key });
};

const getClassAt = async (data, key) => {
  const { contractAddress, blockIdentifier } = data;
  const output = await provider.getClassAt(contractAddress, blockIdentifier);
  notify({ type: "provider3x_GetClassAtResponse", data: output, key });
};

const getStorageAt = async (data, key) => {
  const { contractAddress, key, blockIdentifier } = data;
  const output = await provider.getStorageAt(
    contractAddress,
    key,
    blockIdentifier
  );
  notify({ type: "provider3x_GetStorageAtResponse", data: output, key });
};

const getTransaction = async (data, key) => {
  const { transactionHash } = data;
  const output = await provider.getTransaction(transactionHash);
  notify({
    type: "provider3x_GetTransactionResponse",
    data: output,
    key,
  });
};

const getTransactionStatus = async (data, key) => {
  const { transactionHash } = data;
  const output = await provider.getTransactionStatus(transactionHash);
  notify({
    type: "provider3x_GetTransactionResponse",
    data: output,
    key,
  });
};

const getTransactionReceipt = async (data, key) => {
  const { transactionHash } = data;
  const output = await provider.getTransactionReceipt(transactionHash);
  notify({
    type: "provider3x_GetTransactionReceiptResponse",
    data: output,
    key,
  });
};

const invokeFunction = async (data, key) => {
  const { invocation, details } = data;
  const output = await provider.invokeFunction(invocation, details);
  notify({
    type: "provider3x_InvokeFunctionResponse",
    data: output,
    key,
  });
};

const deployContract = async (data, key) => {
  const { payload } = data;
  const output = await provider.deployContract(payload);
  notify({
    type: "provider3x_DeployContractResponse",
    data: output,
    key,
  });
};

const getCode = async (data, key) => {
  const { contractAddress, blockIdentifier } = data;
  const output = await provider.getCode(contractAddress, blockIdentifier);
  notify({ type: "provider3x_GetCodeResponse", data: output, key });
};

const waitForTx = async (data, key) => {
  const { txHash, retryInterval } = data;
  const output = await provider.waitForTransaction(txHash, retryInterval);
  notify({ type: "provider3x_WaitForTxResponse", data: output, key });
};

export const providerEventHandler = async (type, data, key) => {
  switch (type) {
    case "provider3x_GetContractAddresses":
      return await getContractAddresses(data, key);
    case "provider3x_CallContract":
      return await callContract(data, key);
    case "provider3x_GetBlock":
      return getBlock(data, key);
    case "provider3x_GetClassAt":
      return getClassAt(data, key);
    case "provider3x_GetStorageAt":
      return getStorageAt(data, key);
    case "provider3x_GetTransaction":
      return getTransaction(data, key);
    case "provider3x_GetTransactionStatus":
      return getTransactionStatus(data, key);
    case "provider3x_GetTransactionReceipt":
      return getTransactionReceipt(data, key);
    case "provider3x_InvokeFunction":
      return invokeFunction(data, key);
    case "provider3x_DeployContract":
      return deployContract(data, key);
    case "provider3x_GetCode":
      return getCode(data, key);
    case "provider3x_WaitForTx":
      return waitForTx(data, key);
    default:
      log.warn("not found", type);
      break;
  }
};
