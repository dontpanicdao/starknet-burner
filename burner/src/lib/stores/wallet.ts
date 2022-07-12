import { writable } from 'svelte/store';
import { ec } from 'starknet';

export const setState = (state: string) => {
	if (state !== 'view' && state !== 'editKeys') {
		throw new Error('invalid state');
	}
	wallet.update((wallet) => ({ ...wallet, state }));
};

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

export const balanceOf = async (token: string, account: string) => {
	console.log('balance of', account, 'for token', token);
	wallet.update((data) => data);
};

export const transfer = async (to: string, quantity: number) => {
	console.log('transfert to', to, 'qty', quantity);
};

const privateKey = writable('0x...');

export const wallet = writable({
	lastError: null,
	loading: false,
	isLoggedIn: false,
	state: 'view',
	account: '0x...',
	publicKey: '0x...',
	history: [],
	erc20: [
		{
			address: '0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
			name: 'Ethereum',
			symbol: 'ETH',
			quantity: null,
			decimals: 18
		},
		{
			contract: '0x7a1a9784591aad3cc294ed3d89fa45add74e96e8c20e46a21153a6aa979a9cb',
			name: 'Stark pill',
			symbol: 'STRK',
			quantity: null,
			decimals: 0
		}
	]
});
