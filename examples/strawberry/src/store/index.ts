import { derived, writable } from "svelte/store";

export const wallet = writable();
export const clear = () => wallet.set(undefined);
export const isConnected = derived(wallet, ($wallet, set) => set(!!$wallet));
