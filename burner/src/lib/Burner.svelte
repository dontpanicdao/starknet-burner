<script type="ts">
	import { loadKeys } from '$lib/ts/keys';
	import RegisterKeys from '$lib/RegisterKeys.svelte';
	import RenewKeys from '$lib/RenewKeys.svelte';
	import Transactions from '$lib/Transactions.svelte';
	import Send from '$lib/Send.svelte';
	import { onMount } from 'svelte';
	import { wallet, logIn, balanceOf } from '$lib/stores/wallet';
	import { burner, setState } from '$lib/stores/burner';

	const allBalance = async () => {
		[
			'0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
			'0x7a1a9784591aad3cc294ed3d89fa45add74e96e8c20e46a21153a6aa979a9cb'
		].forEach(async (address) => {
			await balanceOf(address, $wallet.token.account);
		});
	};

	const connect = async () => {
		try {
			let [publicKey, account, tx] = loadKeys();
			console.log('publicKey', publicKey);
			logIn(publicKey, account, tx);
		} catch (e) {
			console.error(e);
		}
	};

	onMount(connect);
</script>

<div class="burner">
	{#if !$wallet.isLoggedIn}
		<button on:click={connect}>Log</button>
	{:else if $burner.state == 'view'}
		<ul class="key">
			<li>{$wallet.token?.account.slice(0, 6)}...{$wallet.token?.account.slice(-4)}</li>
		</ul>
		<div class="command">
			<button on:click={allBalance}>Refresh</button>
			<button
				on:click={() => {
					setState('send');
				}}>Send...</button
			>
			<button
				on:click={() => {
					setState('transactions');
				}}>Transactions</button
			>
			<button
				on:click={() => {
					setState('keys');
				}}>Session Key...</button
			>
		</div>
		<ul class="token-panel">
			{#each $wallet.erc20 as token}
				<li class="token">{token.symbol}: {token.displayQuantity}</li>
			{/each}
		</ul>
	{:else if $burner.state == 'keys'}
		<RegisterKeys />
	{:else if $burner.state == 'renewkey'}
		<RenewKeys />
	{:else if $burner.state == 'transactions'}
		<Transactions />
	{:else if $burner.state == 'send'}
		<Send />
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
