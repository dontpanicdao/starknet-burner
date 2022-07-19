<script type="ts">
	import { setState } from '$lib/stores/burner';
	import QR from '$lib/QR.svelte';
	import { wallet, renewSessionKey } from '$lib/stores/wallet';
	import { red } from 'bn.js';

	const baseURL = import.meta.env.VITE_DRONE_BASEURL || 'http://localhost:5173';
	const back = () => {
		setState('keys');
	};

	const renew = () => {
		renewSessionKey();
	};
</script>

<div class="container">
	<a href="{baseURL}?s={$wallet.token.sessionkey}">
		<QR value={baseURL + '?s=' + $wallet.token.sessionkey} />
	</a>
	<div>{$wallet.token.sessionkey.slice(0, 6)}...{$wallet.token.sessionkey.slice(-4)}</div>
	<div class="command">
		<button class="secondary" on:click={back}>Back...</button>
		<button on:click={renew}>Renew</button>
	</div>
</div>

<style>
	.command {
		display: flex;
		min-width: 300px;
		flex-direction: row;
		align-content: space-around;
		justify-content: space-around;
		margin-top: 10px;
	}

	.command button {
		display: block;
		padding: 4px;
		min-width: 120px;
		margin-left: 5px;
	}
</style>
