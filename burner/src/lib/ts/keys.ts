import { ec } from 'starknet';

export const loadKeys = () => {
	let sessPrivateKey = localStorage.getItem('bwpk');
	let sessAccount = localStorage.getItem('bwac');
	if (sessPrivateKey && sessAccount) {
		return [sessPrivateKey, sessAccount];
	}
	throw new Error('keys missing');
};

export const saveKeys = (privateKey: string, account: string) => {
	localStorage.setItem('bwpk', privateKey);
	localStorage.setItem('bwac', account);
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
