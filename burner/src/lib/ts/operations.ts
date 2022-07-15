import { ec } from 'starknet';
import { toBN } from 'starknet/utils/number';
import { calculateTransactionHashCommon } from 'starknet/utils/hash';
import { TransactionHashPrefix } from 'starknet/constants';
import { BASEURL, CHAINID } from './constants';

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
			toBN('0x1'),
			toBN(contract),
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
			toBN('0x1').toString(10),
			toBN(contract).toString(10),
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