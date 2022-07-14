import { ec } from "starknet";
import { BigNumberish, toBN } from "starknet/utils/number";
import { calculateTransactionHashCommon } from "starknet/utils/hash";
import { TransactionHashPrefix, StarknetChainId } from "starknet/constants";

import * as dotenv from "dotenv";
dotenv.config();

if (!process.env.SESSION_PRIVATE_KEY) {
  throw new Error("SESSION_PRIVATE_KEY is not set");
}

if (!process.env.STRK_CONTRACT_ADDRESS) {
  throw new Error("STRK_CONTRACT_ADDRESS is not set");
}

const pk = toBN(process.env.SESSION_PRIVATE_KEY);
const keypair = ec.getKeyPair(pk);
const strkContract = toBN(process.env.STRK_CONTRACT_ADDRESS);

const BASEURL = "https://alpha4.starknet.io";

const Nonce = async (address: string): Promise<string> => {
  console.log(`Getting Nonce for ${address.toLocaleLowerCase()}`);
  let payload = {
    signature: [],
    contract_address: address.toLocaleLowerCase(),
    entry_point_selector:
      "0x1ac47721ee58ba2813c2a816bca188512839a00d3970f67c05eab986b14006d",
    calldata: [],
  };

  let response = await fetch(
    `${BASEURL}/feeder_gateway/call_contract?blockNumber=pending`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );
  if (response.status != 200) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  let data = await response.json();
  return data.result[0];
};

const sendToken = async (
  account: string,
  pluginHash: string,
  sessionKey: string,
  expirationTime: number,
  sessionToken1: string,
  sessionToken2: string,
  amount: number,
  to: string
): Promise<string> => {
  let nonce = await Nonce(account);
  let hash = calculateTransactionHashCommon(
    TransactionHashPrefix.INVOKE,
    toBN("0x0"),
    toBN(account),
    toBN("0x15d40a3d6ca2ac30f4031e42be28da9b056fef9bb7357ac5e85627ee876e5ad"),
    [
      toBN("0x2"),
      toBN(account), // to
      toBN("0x27ad8765fc3b8f3afef2481081767daadd0abafbd10a7face32534f2e4730e2"), // use_plugin
      toBN("0x0"), // data offset
      toBN("0x5"), // data length
      strkContract,
      toBN("0x83afd3f4caedc6eebf44246fe54e38c95e3179a5ec9ea81740eca5b482d12e"), // transfer
      toBN("0x5"),
      toBN("0x3"),
      toBN("0x8"),
      toBN(pluginHash),
      toBN(sessionKey),
      toBN(expirationTime),
      toBN(sessionToken1),
      toBN(sessionToken2),
      toBN(to.toLowerCase()),
      toBN(amount),
      toBN("0x0"),
      toBN(nonce),
    ],
    toBN("0x17c3dd5fcc48"),
    StarknetChainId.TESTNET
  );
  console.log(`create tx ${hash}`);
  const signature = ec.sign(keypair, hash);
  let payload = {
    type: "INVOKE_FUNCTION",
    contract_address: account.toLocaleLowerCase(),
    entry_point_selector:
      "0x15d40a3d6ca2ac30f4031e42be28da9b056fef9bb7357ac5e85627ee876e5ad",
    calldata: [
      toBN("0x2").toString(10),
      toBN(account).toString(10), // to
      toBN(
        "0x27ad8765fc3b8f3afef2481081767daadd0abafbd10a7face32534f2e4730e2"
      ).toString(10), // use_plugin
      toBN("0x0").toString(10), // data offset
      toBN("0x5").toString(10), // data length
      strkContract.toString(10),
      toBN(
        "0x83afd3f4caedc6eebf44246fe54e38c95e3179a5ec9ea81740eca5b482d12e"
      ).toString(10), // transfer
      toBN("0x5").toString(10),
      toBN("0x3").toString(10),
      toBN("0x8").toString(10),
      toBN(pluginHash).toString(10),
      toBN(sessionKey).toString(10),
      toBN(expirationTime).toString(10),
      toBN(sessionToken1).toString(10),
      toBN(sessionToken2).toString(10),
      toBN(to.toLowerCase()).toString(10),
      toBN(amount).toString(10),
      toBN("0x0").toString(10),
      toBN(nonce).toString(10),
    ],
    signature,
    max_fee: "0x17c3dd5fcc48",
  };

  let response = await fetch(`${BASEURL}/gateway/add_transaction`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (response.status != 200) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  let data = await response.json();
  return data.transaction_hash;
};

const checkTx = async (txHash: string): Promise<any> => {
  let response = await fetch(
    `${BASEURL}/feeder_gateway/get_transaction_status?transactionHash=${txHash.toLowerCase()}`,
    {
      method: "GET",
      headers: {
        "Accept-Type": "application/json",
      },
    }
  );
  if (response.status != 200) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  let data = await response.json();
  return data;
};

const run = async (
  account: string,
  pluginHash: string,
  sessionKey: string,
  expirationTime: number,
  sessionToken1: string,
  sessionToken2: string,
  amount: number,
  to: string
): Promise<string> => {
  let txHash = await sendToken(
    account,
    pluginHash,
    sessionKey,
    expirationTime,
    sessionToken1,
    sessionToken2,
    amount,
    to
  );
  console.log(`txHash ${txHash}`);
  let data = await checkTx(txHash);
  console.log(JSON.stringify(data));
  return "Done";
};

if (!process.env.ACCOUNT_ADDRESS) {
  throw new Error("ACCOUNT_ADDRESS is not defined");
}

if (!process.env.ARGENT_ACCOUNT_ADDRESS) {
  throw new Error("ARGENT_ACCOUNT_ADDRESS is not defined");
}

if (!process.env.PLUGIN_ADDRESS) {
  throw new Error("PLUGIN_ADDRESS is not defined");
}

if (!process.env.SESSION_PUBLIC_KEY) {
  throw new Error("Session key needs to be set");
}

if (!process.env.SESSION_EXPIRATION_TIME) {
  throw new Error("SESSION_EXPIRATION_TIME needs to be set");
}

const expirationTime = parseInt(process.env.SESSION_EXPIRATION_TIME, 10);

if (
  !process.env.SESSION_TOKEN_SIGNATURE0 ||
  !process.env.SESSION_TOKEN_SIGNATURE1
) {
  throw new Error(
    "SESSION_TOKEN_SIGNATURE0 and SESSION_TOKEN_SIGNATURE1 needs to be set"
  );
}

run(
  process.env.ACCOUNT_ADDRESS,
  process.env.PLUGIN_ADDRESS,
  process.env.SESSION_PUBLIC_KEY,
  expirationTime,
  process.env.SESSION_TOKEN_SIGNATURE0,
  process.env.SESSION_TOKEN_SIGNATURE1,
  1,
  process.env.ARGENT_ACCOUNT_ADDRESS
).then((data) => {
  console.log(data);
});
