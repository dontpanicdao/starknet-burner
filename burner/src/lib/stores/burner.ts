import { writable } from 'svelte/store';
export const setState = (state: string) => {
	if (
		state !== 'view' &&
		state !== 'keys' &&
		state !== 'transactions' &&
		state !== 'send' &&
		state !== 'renewkey'
	) {
		throw new Error('invalid state');
	}
	burner.update((b) => ({ ...b, state }));
};

export const track = (loading: boolean, lastError: string) => {
	burner.update((b) => ({ ...b, loading, lastError }));
};

export const burner = writable({
	lastError: '',
	loading: false,
	state: 'view',
	isLoggedIn: false
});
