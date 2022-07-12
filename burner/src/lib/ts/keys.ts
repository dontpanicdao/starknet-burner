import { ec } from 'starknet';
import type { Txn } from '$lib/ts/txns';

export const loadKeys = (): [string, string, Txn[]] => {
	let sessPrivateKey = localStorage.getItem('bwpk');
	let sessAccount = localStorage.getItem('bwac');
	if (!sessPrivateKey || !sessAccount) {
		throw new Error('keys missing');
	}
	let bwtx = localStorage.getItem('bwtx');
	let history: Txn[] = [];
	if (!bwtx || bwtx === '') {
		return [sessPrivateKey, sessAccount, history];
	}
	const txns: string[] = JSON.parse(bwtx);
	history = txns.map((hash) => ({ hash, status: 'unknown', block: '' }));
	return [sessPrivateKey, sessAccount, history];
};

export const saveKeys = (privateKey: string, account: string) => {
	localStorage.setItem('bwpk', privateKey);
	let prevAccount = localStorage.getItem('bwac');
	localStorage.setItem('bwac', account);
	if (prevAccount !== account) {
		localStorage.setItem('bwtx', JSON.stringify([]));
	}
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

export const getPublicKey = (privateKey: string) => {
	const keypair = ec.getKeyPair(privateKey);
	return ec.getStarkKey(keypair);
};
