<script type="ts">
	import { loadKeys } from '$lib/ts/keys';
	import RegisterKeys from '$lib/RegisterKeys.svelte';
	import RefreshIcon from '$lib/icons/RefreshIcon.svelte';
	import StarknetIcon from '$lib/icons/StarknetIcon.svelte';
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
	<i class="cometOne" />
	<i class="cometTwo" />
	<h1 class="title">Burner Wallet</h1>
	<div class="subtitle-container">
		<h3 class="subtitle">Powered by</h3>
		<div class="icon-wrapper"><StarknetIcon /></div>
	</div>
	{#if !$wallet.isLoggedIn}
		<div class="lds-hourglass" />
	{:else if $burner.state == 'renewkey'}
		<RenewKeys />
	{:else if $burner.state == 'keys' || !$wallet.token?.account}
		<RegisterKeys />
	{:else if $burner.state == 'view'}
		<div class="container">
			<ul class="key">
				<li>{$wallet.token?.account?.slice(0, 6)}...{$wallet.token?.account?.slice(-4)}</li>
			</ul>
			<div class="command">
				<button class="refresh secondary" on:click={allBalance}><RefreshIcon /></button>
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
		</div>
	{:else if $burner.state == 'transactions'}
		<Transactions />
	{:else if $burner.state == 'send'}
		<Send />
	{/if}
</div>

<style>
	.lds-hourglass {
		display: inline-block;
		position: relative;
		width: 80px;
		height: 80px;
	}
	.lds-hourglass:after {
		content: ' ';
		display: block;
		border-radius: 50%;
		width: 0;
		height: 0;
		margin: 8px;
		box-sizing: border-box;
		border: 32px solid #fff;
		border-color: #fff transparent #fff transparent;
		animation: lds-hourglass 1.2s infinite;
	}
	@keyframes lds-hourglass {
		0% {
			transform: rotate(0);
			animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
		}
		50% {
			transform: rotate(900deg);
			animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
		}
		100% {
			transform: rotate(1800deg);
		}
	}
	.cometOne {
		display: inline-block;
		position: absolute;
		border-radius: 5% 40% 70%;
		box-shadow: inset 0px 0px 1px #294b67;
		border: 1px solid #333;
		z-index: 1;
		background-color: #fff;
		opacity: 0.7;
		left: 25vw;
		height: 73px;
		width: 3px;
		animation-name: fallingOne;
		animation-timing-function: ease-in;
		animation-duration: 8s;
		animation-delay: 0s;
		animation-iteration-count: infinite;
	}
	.cometTwo {
		display: inline-block;
		position: absolute;
		border-radius: 5% 40% 70%;
		box-shadow: inset 0px 0px 1px #294b67;
		border: 1px solid #333;
		z-index: 1;
		background-color: #fff;
		opacity: 0.7;
		height: 35px;
		width: 4px;
		left: -5vw;
		top: 20vh;
		animation-name: fallingTwo;
		animation-timing-function: ease-in;
		animation-duration: 8s;
		animation-delay: 2s;
		animation-iteration-count: infinite;
	}

	@keyframes fallingOne {
		0% {
			-webkit-transform: translate3d(-100px, -500px, 0px) rotate(160deg);
		}

		30% {
			-webkit-transform: translate3d(450px, 900px, 0) rotate(160deg);
			opacity: 0;
		}
		100% {
			-webkit-transform: translate3d(450px, 900px, 0) rotate(160deg);
			opacity: 0;
		}
	}
	@keyframes fallingTwo {
		0% {
			-webkit-transform: translate3d(0, 0, 0) rotate(115deg);
		}

		45% {
			-webkit-transform: translate3d(120vw, 55vh, 0) rotate(120deg);
			opacity: 0;
		}

		100% {
			-webkit-transform: translate3d(120vw, 55vh, 0) rotate(120deg);
			opacity: 0;
		}
	}
	.title {
		color: #ff6700;
	}
	.subtitle-container {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		width: 170px;
	}
	.subtitle {
		color: #c0c0c0;
	}
	.icon-wrapper {
		height: 26px;
		width: 26px;
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
		background: rgb(2, 0, 36);
		background: linear-gradient(
			180deg,
			rgba(2, 0, 36, 1) 0%,
			rgba(9, 9, 121, 1) 49%,
			rgba(12, 83, 97, 1) 100%
		);
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
		color: #ebebeb;
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
		color: #ebebeb;
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
		display: flex;
		padding: 4px;
		min-width: 24px;
		margin-left: 5px;
		fill: #2e4057;
	}

	.command .refresh:hover {
		fill: #c0c0c0;
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

	:global(div.container) {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin: 0 auto;
		background-color: rgba(192, 192, 192, 0.2);
		padding: 2%;
		border-radius: 10px;
		z-index: 10;
	}
</style>
