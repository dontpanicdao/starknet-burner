import { writable } from 'svelte/store';

export const queryContract = async () => {
	await account.update((data) => {
		return {
			...data,
			isRunning: true
		};
	});
	await account.update((data) => {
		return {
			...data,
			isRunning: false
		};
	});
};

export const account = writable({
	lastError: '',
	isRunning: false,
	currentClass: '',
	hasPlugin: true,
	tokens: 2
});
