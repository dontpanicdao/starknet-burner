<script context="module" lang="ts">
	/** @type {import('./__types/[slug]').Load} */
	export async function load({ url }) {
		console.log('load...');
		let session = url.searchParams.get('s');

		return {
			status: 200,
			props: {
				sessionkey: session
			}
		};
	}
</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import { sendSTRK, strk } from '$lib/stores/strk';
	export let sessionkey = '';
	let destination = '';
	let quantity = 1;
	import { get } from 'svelte/store';

	import { connect } from '$lib/ts/utils';
	import { onMount } from 'svelte';

	onMount(() => {
		connect();
	});
</script>

<content>
	<div class="selection">
		<h1>Drone</h1>
		<p>Send STRK to anyone...</p>
		<div class="menu">
			{#if !$strk.isRunning}
				<label for="destination">destination</label>
				<input id="destination" type="text" bind:value={destination} placeholder="0x..." />
				<label for="quantity">quantity</label>
				<input id="quantity" type="int" bind:value={quantity} placeholder="1" />
				<div class="button">
					<button
						on:click={() => {
							goto(`/admin?s=${sessionkey}`);
						}}>Cancel</button
					>
					<button
						on:click={async () => {
							await sendSTRK(destination, quantity);
							goto(`/admin?s=${sessionkey}`);
						}}
						disabled={quantity === 0 || !destination || destination === ''}>Send</button
					>
				</div>
			{:else}
				<p>loading...</p>
			{/if}
		</div>
	</div>
</content>

<style>
	h1 {
		margin-bottom: 0px;
	}
	.menu {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	.button {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		margin-top: 12px;
	}
	content {
		margin: 0 auto;
		max-width: 1024px;
	}
	.selection {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}
</style>
