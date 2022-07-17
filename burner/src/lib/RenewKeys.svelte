<script type="ts">
	import { setState } from '$lib/stores/burner';
	import QR from '$lib/QR.svelte';
	import { wallet, renewSessionKey } from '$lib/stores/wallet';

	const baseURL = import.meta.env.VITE_DRONE_BASEURL || 'http://localhost:5173';
	const back = () => {
		setState('keys');
	};

	const renew = () => {
		renewSessionKey();
	};
</script>

<div class="register-keys">
	<a href="{baseURL}?s={$wallet.token.sessionkey}">
		<QR value={baseURL + '?s=' + $wallet.token.sessionkey} />
	</a>
	<div>{$wallet.token.sessionkey.slice(0, 6)}...{$wallet.token.sessionkey.slice(-4)}</div>
	<div class="command">
		<button on:click={renew}>Renew</button>
		<button on:click={back}>Back...</button>
	</div>
</div>

<style>
	.register-keys {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		background-color: #fff;
		padding: 20px;
		border-radius: 5px;
	}

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
