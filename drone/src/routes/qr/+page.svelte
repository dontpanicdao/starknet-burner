<script lang="ts">
	import type { PageData } from './$types';

	/** @type {import('./$types').PageData */
	export let data: PageData;
	let { qr } = data;
	$: ({ qr } = data);

	import QR from '$lib/QR.svelte';
	import { connect } from '$lib/ts/utils';

	const load = async () => {
		let wallet = await connect();
		if (!wallet) {
			return;
		}
		qr = wallet.address;
	};
</script>

<div class="display">
	{#if qr && qr !== ''}
		<QR bind:value={qr} />
		<div class="check">
			<a href={`https://goerli.voyager.online/contract/${qr}`}>{qr.slice(0, 6)}...{qr.slice(-4)}</a>
		</div>
	{/if}
	<div class="command"><button on:click={load}>Load...</button></div>
</div>

<style>
	.display {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: 0 auto;
	}

	.display button {
		margin-top: 1rem;
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
