import { ec } from 'starknet';

export const loadKeys = () => {
	let sessPrivateKey = localStorage.getItem('bwpk');
	let sessAccount = localStorage.getItem('bwac');
	let tx = localStorage.getItem('bwtx');
	if (!tx || tx === '') {
		tx = JSON.stringify([]);
	}
	if (sessPrivateKey && sessAccount) {
		return [sessPrivateKey, sessAccount, JSON.parse(tx)];
	}
	throw new Error('keys missing');
};

export const saveKeys = (privateKey: string, account: string) => {
	localStorage.setItem('bwpk', privateKey);
	let prevAccount = localStorage.getItem('bwac');
	localStorage.setItem('bwac', account);
	if (prevAccount !== account) {
		localStorage.setItem('bwtx', JSON.stringify([]));
	}
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
