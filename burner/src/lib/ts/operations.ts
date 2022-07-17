import { ec } from 'starknet';
import { toBN } from 'starknet/utils/number';
import { calculateTransactionHashCommon } from 'starknet/utils/hash';
import { TransactionHashPrefix } from 'starknet/constants';
import { BASEURL, CHAINID } from './constants';

const pluginHash =
	import.meta.env.VITE_PLUGIN_HASH ||
	'0x377e145923e881f59d62269a46057d8dac67e27d68a12679b198d4224a0966b';

const getNonce = async (account: string): Promise<string> => {
	console.log(`Getting Nonce for ${account.toLocaleLowerCase()}`);
	let payload = {
		signature: [],
		contract_address: account.toLocaleLowerCase(),
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

export const sendToken = async (
	pk: string,
	sessionkey: string,
	expires: number,
	sessionToken1: string,
	sessionToken2: string,
	account: string,
	contract: string,
	to: string,
	amount: number
): Promise<string> => {
	let nonce = await getNonce(account);
	let hash = calculateTransactionHashCommon(
		TransactionHashPrefix.INVOKE,
		toBN('0x0'),
		toBN(account),
		toBN('0x15d40a3d6ca2ac30f4031e42be28da9b056fef9bb7357ac5e85627ee876e5ad'),
		[
			toBN('0x2'),
			toBN(contract),
			toBN('0x27ad8765fc3b8f3afef2481081767daadd0abafbd10a7face32534f2e4730e2'), // use_plugin
			toBN('0x0'), // data offset
			toBN('0x5'), // data length
			toBN(contract),
			toBN('0x83afd3f4caedc6eebf44246fe54e38c95e3179a5ec9ea81740eca5b482d12e'), // transfer
			toBN('0x5'),
			toBN('0x3'),
			toBN('0x8'),
			toBN(pluginHash),
			toBN(sessionkey),
			toBN(expires),
			toBN(sessionToken1),
			toBN(sessionToken2),
			toBN(to.toLowerCase()),
			toBN(amount),
			toBN('0x0'),
			toBN(nonce)
		],
		toBN('0x17c3dd5fcc48'),
		CHAINID
	);
	console.log(`create tx ${hash}`);
	const keypair = ec.getKeyPair(pk);
	const signature = ec.sign(keypair, hash);
	let payload = {
		type: 'INVOKE_FUNCTION',
		contract_address: account.toLocaleLowerCase(),
		entry_point_selector: '0x15d40a3d6ca2ac30f4031e42be28da9b056fef9bb7357ac5e85627ee876e5ad',
		calldata: [
			toBN('0x2').toString(10),
			toBN(contract).toString(10),
			toBN('0x27ad8765fc3b8f3afef2481081767daadd0abafbd10a7face32534f2e4730e2').toString(10),
			toBN('0x0').toString(10),
			toBN('0x5').toString(10),
			toBN(contract).toString(10),
			toBN('0x83afd3f4caedc6eebf44246fe54e38c95e3179a5ec9ea81740eca5b482d12e').toString(10),
			toBN('0x5').toString(10),
			toBN('0x3').toString(10),
			toBN('0x8').toString(10),
			toBN(pluginHash).toString(10),
			toBN(sessionkey).toString(10),
			toBN(expires).toString(10),
			toBN(sessionToken1).toString(10),
			toBN(sessionToken2).toString(10),
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

export const checkTx = async (hash: string): Promise<any> => {
	let response = await fetch(
		`${BASEURL}/feeder_gateway/get_transaction_status?transactionHash=${hash.toLowerCase()}`,
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
