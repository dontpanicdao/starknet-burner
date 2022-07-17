import { writable } from 'svelte/store';
import { connect } from '$lib/ts/utils';
import { Contract } from 'starknet';
import erc20_abi from '../../abi/erc20_abi.json';

export const strk = writable({
	lastError: '',
	isRunning: false
});

export const sendSTRK = async (to: string, amount: number) => {
	await strk.update((data) => ({
		...data,
		isRunning: true,
		lastError: ''
	}));
	let currentAccount = await connect();
	if (!currentAccount) {
		await strk.update((data) => ({
			...data,
			isRunning: false,
			lastError: 'account not found'
		}));
		return;
	}
	const starkpillAddress =
		import.meta.env.STRK_CONTRACT_ADDRESS ||
		'0x7a1a9784591aad3cc294ed3d89fa45add74e96e8c20e46a21153a6aa979a9cb';
	let erc20 = new Contract(erc20_abi, starkpillAddress, currentAccount);
	try {
		let tx = await erc20.transfer(to, [amount, 0]);
		console.log(tx);
	} catch (e) {
		await strk.update((data) => ({
			...data,
			isRunning: false,
			lastError: (e as Error).message
		}));
	}
	await strk.update((data) => ({
		...data,
		isRunning: false,
		lastError: ''
	}));
};
