import { writable, get } from 'svelte/store';
import { ec } from 'starknet';
import { toBN } from 'starknet/utils/number';
import { getSelectorFromName } from 'starknet/utils/hash';
import { checkTx, sendToken as sendTokenOperation } from '$lib/ts/operations';
import { ETHCONTRACT, STRKCONTRACT } from '$lib/ts/constants';

export const logIn = async (key: string, account: string, tx: Txn[]) => {
	console.log('log to account', account);
	privateKey.update(() => key);
	const keypair = ec.getKeyPair(key);
	console.log(ec.getStarkKey(keypair));

	wallet.update((data) => ({
		...data,
		account,
		publicKey: ec.getStarkKey(keypair),
		history: tx,
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

export const sendToken = async (
	token: string,
	to: string,
	amount: number,
	track: (loading: boolean, lastError: string) => void
) => {
	track(true, '');
	try {
		const pk = get(privateKey);
		const account = get(wallet).account;
		if (!pk || !account) {
			throw new Error('not logged in');
		}
		const tx = await sendTokenOperation(pk, account, token, to, amount);
		wallet.update((data) => {
			const txns = data.history.map((txn) => txn.hash);
			txns.push(tx);
			localStorage.setItem('bwtx', JSON.stringify(txns));
			return {
				...data,
				history: [...data.history, { hash: tx, status: 'unknown', block: 0 }]
			};
		});
	} catch (e) {
		track(false, (e as Error).message);
		return;
	}
	track(false, '');
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

export const refreshTxn = async (hash: string) => {
	console.log('refresh txn', hash);
	const idx = get(wallet).history.findIndex((x) => x.hash === hash);
	if (idx === -1) {
		return;
	}
	const output = await checkTx(hash);
	console.log(JSON.stringify(output, null, 2));
	wallet.update((data) => {
		const idx = data.history.findIndex((x) => x.hash === hash);
		const tx = {
			hash: data.history[idx].hash,
			status: output.tx_status.toLowerCase(),
			block: output.block_hash
		};
		data.history[idx] = tx;
		return data;
	});
};

const privateKey = writable('0x...');

type Txn = {
	hash: string;
	status: string;
	block: number;
};

export const wallet = writable({
	lastError: null,
	loading: false,
	isLoggedIn: false,
	account: '0x...',
	publicKey: '0x...',
	history: [] as Txn[],
	erc20: [
		{
			...ETHCONTRACT,
			quantity: toBN(0),
			displayQuantity: ''
		},
		{
			...STRKCONTRACT,
			quantity: toBN(0),
			displayQuantity: ''
		}
	]
});
