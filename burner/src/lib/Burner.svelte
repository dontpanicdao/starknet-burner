<script>
	import { loadKeys } from '$lib/ts/keys';
	import RegisterKeys from '$lib/RegisterKeys.svelte';
	import { onMount } from 'svelte';
	import { wallet, logIn, setState } from '$lib/stores/wallet';

	const connect = async () => {
		try {
			let [privateKey, account] = loadKeys();
			console.log('privateKey', privateKey);
			logIn(privateKey, account);
		} catch (e) {
			console.error(e);
		}
	};

	const editKeys = () => {
		setState('editKeys');
	};

	onMount(connect);
</script>

<div class="burner">
	{#if !$wallet.isLoggedIn}
		<button on:click={connect}>Log</button>
	{:else if $wallet.state == 'view'}
		<ul class="key">
			<li>{$wallet.account.slice(0, 6)}...{$wallet.account.slice(-4)}</li>
		</ul>
		<div class="command">
			<button on:click={editKeys}>change keys...</button>
		</div>
		<ul class="token-panel">
			{#each $wallet.erc20 as token}
				<li class="token">{token.symbol}</li>
			{/each}
		</ul>
	{:else if $wallet.state == 'editKeys'}
		<RegisterKeys />
	{/if}
</div>

<style>
	.burner {
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

	.key {
		min-width: 300px;
		height: 1em;
		border: 1px solid #ccc;
		border-radius: 5px;
		margin-bottom: 10px;
		padding: 10px;
	}

	.key li {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.token-panel {
		margin: 0;
		padding: 0;
		border: 0;
		margin-bottom: 10px;
	}

	.token {
		min-width: 300px;
		list-style: none;
		height: 1em;
		border: 1px solid #ccc;
		border-radius: 5px;
		margin-bottom: 10px;
		padding: 10px;
	}

	.command {
		display: flex;
		justify-content: space-between;
		margin-top: 10px;
		margin-bottom: 10px;
	}
</style>
