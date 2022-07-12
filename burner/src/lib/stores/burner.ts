import { writable } from 'svelte/store';

export const setState = (state: string) => {
	if (state !== 'view' && state !== 'keys' && state !== 'transactions' && state !== 'send') {
		throw new Error('invalid state');
	}
	burner.update((b) => ({ ...b, state }));
};

export const burner = writable({
	state: 'view'
});
