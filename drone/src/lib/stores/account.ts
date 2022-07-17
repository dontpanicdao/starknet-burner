import { writable } from 'svelte/store';
import { connect } from '$lib/ts/utils';
import { Contract } from 'starknet';
import { uint256ToBN } from 'starknet/utils/uint256';

import proxy_abi from '../../abi/proxy_abi.json';
import account_abi from '../../abi/argentaccount_plugin_abi.json';
import erc20_abi from '../../abi/erc20_abi.json';

export const account = writable({
	lastError: '',
	isRunning: false,
	currentClass: '',
	hasPlugin: true,
	tokens: 2
});

export const queryContract = async () => {
	await account.update((data) => ({
		...data,
		isRunning: true,
		lastError: ''
	}));
	let currentAccount = await connect();
	if (!currentAccount) {
		await account.update((data) => ({
			...data,
			isRunning: false,
			lastError: 'account not found'
		}));
		return;
	}
	let proxy = new Contract(proxy_abi, currentAccount.address, currentAccount);
	let result = await proxy.call('get_implementation', []);
	const starkpillAddress =
		import.meta.env.STRK_CONTRACT_ADDRESS ||
		'0x7a1a9784591aad3cc294ed3d89fa45add74e96e8c20e46a21153a6aa979a9cb';
	let erc20 = new Contract(erc20_abi, starkpillAddress, currentAccount);
	let balance = await erc20.call('balanceOf', [currentAccount.address]);
	console.log(uint256ToBN(balance[0]).toNumber());
	const pluginHash =
		import.meta.env.VITE_PLUGIN_HASH ||
		'0x377e145923e881f59d62269a46057d8dac67e27d68a12679b198d4224a0966b';
	const upgradedAccountHash =
		import.meta.env.VITE_ACCOUNT_PLUGIN_CLASS_HASH ||
		'0x443e7c09ffda6b7cf5fe88fb18eb0a78d285db8ef8277c3918326d476c73efa';
	let hasPlugin = false;
	if (`0x${result[0].toString(16)}` === upgradedAccountHash) {
		let upgradedAccount = new Contract(account_abi, currentAccount.address, currentAccount);
		let plugin = await upgradedAccount.call('is_plugin', [pluginHash]);
		if (plugin[0].toNumber() === 1) {
			hasPlugin = true;
		}
	}
	console.log('current class', `0x${result[0].toString(16)}`);
	await account.update((data) => {
		return {
			...data,
			isRunning: false,
			currentClass: `0x${result[0].toString(16)}`,
			tokens: uint256ToBN(balance[0]).toNumber(),
			hasPlugin
		};
	});
};
