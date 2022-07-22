<script type="ts">
	import { setState } from '$lib/stores/burner';
	import QR from '$lib/QR.svelte';
	import { wallet, renewSessionKey } from '$lib/stores/wallet';

	const baseURL = import.meta.env.VITE_DRONE_BASEURL || 'http://localhost:5173';
	const back = () => {
		setState('keys');
	};
</script>

<div class="container qr">
	<a href="{baseURL}?s={$wallet.token.sessionkey}">
		<QR value={baseURL + '?s=' + $wallet.token.sessionkey} />
	</a>
	<div class="sessionKey">
		{$wallet.token.sessionkey.slice(0, 6)}...{$wallet.token.sessionkey.slice(-4)}
	</div>
	<div class="command">
		<button class="secondary" on:click={back}>Back...</button>
		<button on:click={renewSessionKey}>Renew</button>
	</div>
</div>

<style>
	.qr {
		align-items: center;
	}
	.sessionKey {
		color: #c0c0c0;
	}
	.command {
		display: flex;
		min-width: 70%;
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
