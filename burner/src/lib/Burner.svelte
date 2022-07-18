<script type="ts">
	import { loadKeys } from '$lib/ts/keys';
	import RegisterKeys from '$lib/RegisterKeys.svelte';
	import RefreshIcon from '$lib/RefreshIcon.svelte';
	import RenewKeys from '$lib/RenewKeys.svelte';
	import Transactions from '$lib/Transactions.svelte';
	import Send from '$lib/Send.svelte';
	import { onMount } from 'svelte';
	import { wallet, balanceOf } from '$lib/stores/wallet';
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
		loadKeys();
	};

	onMount(async () => {
		await connect();
		allBalance();
	});
</script>

<div class="burner">
	<h1 class="title">Burner Wallet</h1>
	{#if !$wallet.isLoggedIn}
		loading...
	{:else if $burner.state == 'renewkey'}
		<RenewKeys />
	{:else if $burner.state == 'keys' || !$wallet.token?.account}
		<RegisterKeys />
	{:else if $burner.state == 'view'}
		<ul class="key">
			<li>{$wallet.token?.account?.slice(0, 6)}...{$wallet.token?.account?.slice(-4)}</li>
		</ul>
		<div class="command">
			<button class="refresh" on:click={allBalance}><RefreshIcon /></button>
			<button
				class="standard"
				on:click={() => {
					setState('send');
				}}>Send...</button
			>
			<button
				class="standard"
				on:click={() => {
					setState('transactions');
				}}>Transactions</button
			>
			<button
				class="standard"
				on:click={() => {
					setState('keys');
				}}>Keys...</button
			>
		</div>
		<ul class="token-panel">
			{#each $wallet.erc20 as token}
				<li class="token">{token.symbol}: {token.displayQuantity}</li>
			{/each}
		</ul>
	{:else if $burner.state == 'transactions'}
		<Transactions />
	{:else if $burner.state == 'send'}
		<Send />
	{/if}
</div>

<style>
	.title {
		color: #ff6700;
	}
	.burner {
		display: flex;
		font-family: 'Coustard', serif;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100vw;
		margin: 0 auto;
		height: 100vh;
		background-color: #2f2d2e;
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
		min-width: 300px;
		flex-direction: row;
		align-content: space-around;
		justify-content: space-around;
		margin-top: 10px;
		margin-bottom: 10px;
	}

	.command .refresh {
		display: block;
		padding: 4px;
		min-width: 24px;
		margin-left: 5px;
	}

	.command .standard {
		display: block;
		padding: 4px;
		min-width: 90px;
		margin-left: 5px;
	}

	:global(button) {
		border-radius: 5px;
		border: 1px;
		font: inherit;
		color: #ff6700;
		background-color: #2e4057;
	}

	:global(label) {
		color: white;
	}

	:global(button:hover) {
		cursor: pointer;
		color: #2e4057;
		background-color: #ff6700;
	}

	:global(button.secondary) {
		color: #2e4057;
		background-color: #c0c0c0;
	}

	:global(button.secondary:hover) {
		color: #c0c0c0;
		background-color: #2e4057;
	}

	:global(label) {
		text-transform: capitalize;
		color: #ebebeb;
	}

	test {
		color: #ff6700;
		color: #ebebeb;
		color: #c0c0c0;
		color: #3a6ea5;
		color: #2f2d2e;
	}
</style>
