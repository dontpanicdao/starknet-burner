import { writable } from 'svelte/store';
import { ec } from 'starknet';
import { toBN } from 'starknet/utils/number';
import { getSelectorFromName } from 'starknet/utils/hash';

export const logIn = async (key: string, account: string) => {
	console.log('log to account', account);
	privateKey.update(() => key);
	const keypair = ec.getKeyPair(key);
	console.log(ec.getStarkKey(keypair));
	wallet.update((data) => ({
		...data,
		account,
		publicKey: ec.getStarkKey(keypair),
		isLoggedIn: true
	}));
};

const BASEURL = 'https://alpha4.starknet.io';

const uint256ToBN = (uint256Amount: string[]) => {
	if (uint256Amount.length !== 2) {
		throw new Error('invalid uint256');
	}
	return toBN(uint256Amount[0]).add(toBN(uint256Amount[1]).mul(toBN(2).pow(toBN(128))));
};

const qty = (amount: string[], decimals: number): string => {
	let j = 2;
	let v = '0';
	for (let i = 2; i < 5; i++) {
		v = uint256ToBN(amount)
			.mul(toBN(10).pow(toBN(i)))
			.div(toBN(10).pow(toBN(decimals)))
			.toString(10);
		if (v.length > 1) {
			j = i;
			break;
		}
		console.log(v);
	}
	for (let i = 0; i <= j - v.length; i++) {
		v = '0' + v;
	}
	if (v.length === j) {
		v = '0' + v;
	}
	return v.slice(0, v.length - j) + '.' + v.slice(-j);
};

export const balanceOf = async (token: string, account: string) => {
	console.log('balance of', account, 'for token', token);
	let payload = {
		signature: [],
		contract_address: token.toLocaleLowerCase(),
		entry_point_selector: getSelectorFromName('balanceOf'),
		calldata: [toBN(account).toString(10)]
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
	wallet.update((x) => {
		let erc20 = x.erc20.map((e) =>
			e.contract === token
				? {
						...e,
						quantity: uint256ToBN(data.result),
						displayQuantity: qty(data.result, e.decimals)
				  }
				: e
		);
		return { ...x, erc20 };
	});
};

export const transfer = async (to: string, quantity: number) => {
	console.log('transfert to', to, 'qty', quantity);
};

const privateKey = writable('0x...');

export const wallet = writable({
	lastError: null,
	loading: false,
	isLoggedIn: false,
	account: '0x...',
	publicKey: '0x...',
	history: [],
	erc20: [
		{
			contract: '0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
			name: 'Ethereum',
			symbol: 'ETH',
			quantity: toBN(0),
			decimals: 18,
			displayQuantity: ''
		},
		{
			contract: '0x7a1a9784591aad3cc294ed3d89fa45add74e96e8c20e46a21153a6aa979a9cb',
			name: 'Stark pill',
			symbol: 'STRK',
			quantity: toBN(0),
			decimals: 0,
			displayQuantity: ''
		}
	]
});
