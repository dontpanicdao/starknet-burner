<script type="ts">
	import { setState } from '$lib/stores/burner';
	import { loadKeys } from '$lib/ts/keys';
	import { onMount } from 'svelte';
	import QR from '$lib/QR.svelte';
	import { wallet, renewSessionKey } from '$lib/stores/wallet';

	const back = () => {
		setState('keys');
	};

	const renew = () => {
		renewSessionKey();
	};
</script>

<div class="register-keys">
	<QR value={$wallet.token.sessionkey} />
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
		justify-content: space-between;
		margin-top: 20px;
	}
</style>
