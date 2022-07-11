import { ec } from 'starknet';
import { BigNumberish, toBN } from 'starknet/utils/number';
import { calculateTransactionHashCommon } from 'starknet/utils/hash';
import { TransactionHashPrefix, StarknetChainId } from 'starknet/constants';

import * as dotenv from 'dotenv';
dotenv.config();

// Note: in order to run a transaction:
//  1. Get the current Nonce
//  2. Estimate the Max Fee
//  3. Create and Run the transaction
//  4. Monitor the transaction status

if (!process.env.SIGNER_PRIVATE_KEY) {
	throw new Error('PRIVATE_KEY is not set');
}

if (!process.env.STRK_CONTRACT_ADDRESS) {
	throw new Error('STRK_CONTRACT_ADDRESS is not set');
}

const pk = toBN(process.env.SIGNER_PRIVATE_KEY);
const keypair = ec.getKeyPair(pk);
const ethContract = toBN(process.env.STRK_CONTRACT_ADDRESS);

const BASEURL = 'http://localhost:8080';

const Nonce = async (address: string): Promise<string> => {
	console.log(`Getting Nonce for ${address.toLocaleLowerCase()}`);
	let payload = {
		signature: [],
		contract_address: address.toLocaleLowerCase(),
		entry_point_selector: '0x1ac47721ee58ba2813c2a816bca188512839a00d3970f67c05eab986b14006d',
		calldata: []
	};

	let response = await fetch(`${BASEURL}/feeder_gateway/call_contract?blockNumber=pending`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(payload)
	});
	if (response.status != 200) {
		throw new Error(`${response.status} ${response.statusText}`);
	}
	let data = await response.json();
	return data.result[0];
};

const sendToken = async (account: string, amount: number, to: string): Promise<string> => {
	let nonce = await Nonce(account);
	let hash = calculateTransactionHashCommon(
		TransactionHashPrefix.INVOKE,
		toBN('0x0'),
		toBN(account),
		toBN('0x15d40a3d6ca2ac30f4031e42be28da9b056fef9bb7357ac5e85627ee876e5ad'),
		[
			toBN('0x1'),
			ethContract,
			toBN('0x83AFD3F4CAEDC6EEBF44246FE54E38C95E3179A5EC9EA81740ECA5B482D12E'.toLowerCase()),
			toBN('0x0'),
			toBN('0x3'),
			toBN('0x3'),
			toBN(to.toLowerCase()),
			toBN(amount),
			toBN('0x0'),
			toBN(nonce)
		],
		toBN('0x17c3dd5fcc48'),
		StarknetChainId.TESTNET
	);
	console.log(`create tx ${hash}`);
	const signature = ec.sign(keypair, hash);
	let payload = {
		type: 'INVOKE_FUNCTION',
		contract_address: account.toLocaleLowerCase(),
		entry_point_selector: '0x15d40a3d6ca2ac30f4031e42be28da9b056fef9bb7357ac5e85627ee876e5ad',
		calldata: [
			toBN('0x1').toString(10),
			ethContract.toString(10),
			toBN(
				'0x83AFD3F4CAEDC6EEBF44246FE54E38C95E3179A5EC9EA81740ECA5B482D12E'.toLowerCase()
			).toString(10),
			toBN('0x0').toString(10),
			toBN('0x3').toString(10),
			toBN('0x3').toString(10),
			toBN(to.toLowerCase()).toString(10),
			toBN(amount).toString(10),
			toBN('0x0').toString(10),
			toBN(nonce).toString(10)
		],
		signature,
		max_fee: '0x17c3dd5fcc48'
	};

	let response = await fetch(`${BASEURL}/gateway/add_transaction`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(payload)
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
			method: 'GET',
			headers: {
				'Accept-Type': 'application/json'
			}
		}
	);
	if (response.status != 200) {
		throw new Error(`${response.status} ${response.statusText}`);
	}
	let data = await response.json();
	return data;
};

// sendToken(process.env.ACCOUNT_ADDRESS, 1, process.env.ARGENT_ACCOUNT_ADDRESS).then((data) => {
// 	console.log(JSON.stringify(data));
// });

const run = async (account: string, amount: number, to: string): Promise<string> => {
	let txHash = await sendToken(account, amount, to);
	console.log(`txHash ${txHash}`);
	let data = await checkTx(txHash);
	console.log(JSON.stringify(data));
	return 'Done';
};

if (!process.env.ACCOUNT_ADDRESS) {
	throw new Error('ACCOUNT_ADDRESS is not defined');
}

if (!process.env.ARGENT_ACCOUNT_ADDRESS) {
	throw new Error('ARGENT_ACCOUNT_ADDRESS is not defined');
}

run(process.env.ACCOUNT_ADDRESS, 2, process.env.ARGENT_ACCOUNT_ADDRESS).then((data) => {
	console.log(data);
});
