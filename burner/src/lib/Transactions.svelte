<script>
	import { setState } from '$lib/stores/burner';
	import QR from '$lib/QR.svelte';
	import { wallet, refreshTxn } from '$lib/stores/wallet';
	import RefreshIcon from '$lib/icons/RefreshIcon.svelte';
</script>

<div class="transactions">
	Transactions:
	<div class="transaction-panel">
		{#each $wallet.history as transaction}
			<ul class="transaction">
				<li>
					{transaction?.hash.slice(0, 6)}...{transaction?.hash.slice(-4)}
				</li>
				<li>
					{transaction?.status}
				</li>
				<div>
					<button
						on:click={() => {
							refreshTxn(transaction.hash);
						}}><RefreshIcon /></button
					>
				</div>
			</ul>
			<div class="qr">
				<a href={`https://goerli.voyager.online/tx/${transaction?.hash}`}>
					<QR value={`https://goerli.voyager.online/tx/${transaction?.hash}`} />
				</a>
			</div>
		{/each}
	</div>
	<div class="command">
		<button
			on:click={() => {
				setState('view');
			}}>Back</button
		>
	</div>
</div>

<style>
	.transactions {
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

	.qr {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		background-color: #fff;
		border-radius: 5px;
	}

	.transaction-panel {
		margin: 0;
		padding: 0;
		border: 0;
		margin-bottom: 10px;
	}

	.transaction {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		min-width: 300px;
		list-style: none;
		height: 2em;
		border: 1px solid #ccc;
		border-radius: 5px;
		margin-bottom: 10px;
		padding: 10px;
	}

	.transaction {
		min-width: 300px;
		list-style: none;
		height: 2em;
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
	}

	.command button {
		display: block;
		padding: 4px;
		min-width: 120px;
		margin-left: 5px;
	}
</style>
