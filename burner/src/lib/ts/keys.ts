import { ec } from 'starknet';
import { toBN } from 'starknet/utils/number';
import type { Txn } from '$lib/ts/txns';
import { wallet } from '$lib/stores/wallet';

export const loadKeys = () => {
	let sessPrivateKey = localStorage.getItem('bwpk');
	if (!sessPrivateKey || sessPrivateKey === '') {
		sessPrivateKey = `0x${ec.genKeyPair().getPrivate().toString(16)}`;
		if (!sessPrivateKey) {
			throw new Error('failed to generate key');
		}
		localStorage.setItem('bwpk', sessPrivateKey);
		localStorage.removeItem('bwtk');
		localStorage.removeItem('bwtx');
	}
	let keypair = ec.getKeyPair(toBN(sessPrivateKey));
	let sessPublicKey = ec.getStarkKey(keypair);
	let bwtk = localStorage.getItem('bwtk');
	if (!bwtk || bwtk === '') {
		return;
	}
	let tokenData = JSON.parse(bwtk);
	let bwtx = localStorage.getItem('bwtx');
	let history: Txn[] = [];
	if (bwtx && bwtx !== '') {
		let historyData: string[] = JSON.parse(bwtx);
		history = historyData.map((data) => ({ hash: data, status: 'unknown', block: 0 }));
	}
	wallet.update((data) => {
		let token = {
			sessionkey: sessPublicKey as string,
			account: tokenData.account,
			expires: tokenData.expires,
			token: tokenData.token
		};
		return {
			...data,
			token,
			history,
			isLoggedIn: true
		};
	});
	return;
};

export const saveTxns = (history: Txn[]) => {
	const txns: string[] = history.map((txn) => txn.hash);
	localStorage.setItem('bwtx', JSON.stringify(txns));
};

export const genKey = () => {
	const keypair = ec.genKeyPair();
	const privateKey = keypair.getPrivate();
	const publicKey = ec.getStarkKey(keypair);
	return [privateKey, publicKey];
};
