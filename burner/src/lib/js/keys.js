import { ec } from 'starknet';

export const loadKeys = () => {
	let privateKey = '0x0';
	let publicKey = '0x0';
	let sessPrivateKey = localStorage.getItem('privateKey');
	let sessPublicKey = localStorage.getItem('publicKey');
	if (sessPrivateKey && sessPublicKey) {
		privateKey = sessPrivateKey;
		publicKey = sessPublicKey;
		return [privateKey, publicKey];
	}
	let keypair = ec.genKeyPair();
	if (!keypair) {
		return [privateKey, publicKey];
	}
	let priv = keypair.getPrivate();
	if (!priv) {
		return [privateKey, publicKey];
	}
	privateKey = `0x${priv.toString('hex')}`;
	publicKey = ec.getStarkKey(keypair);
	localStorage.setItem('privateKey', privateKey);
	localStorage.setItem('publicKey', publicKey);
	return [privateKey, publicKey];
};
