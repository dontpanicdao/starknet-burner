<script lang="ts">
	throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");

	export let sessionkey = '';
	import { goto } from '$app/navigation';
	import Upgrade from '$lib/Upgrade.svelte';
	import AddPlugin from '$lib/AddPlugin.svelte';
	import Downgrade from '$lib/Downgrade.svelte';
	import Refill from '$lib/Refill.svelte';
	import Refresh from '$lib/Refresh.svelte';
	import { queryContract, account } from '$lib/stores/account';
	import { onMount } from 'svelte';

	onMount(async () => {
		await queryContract();
	});
</script>

<content>
	<div class="selection">
		<h1>Drone</h1>
		<p>see also <a href="/?s={sessionkey}">manage sessionkey</a></p>
		<div class="menu">
			<Refresh />
			{#if !$account.isRunning}
				<Upgrade />
				<AddPlugin />
				<Downgrade />
				<Refill />
				<button
					on:click={() => {
						goto(`/starkpills?s=${sessionkey}`);
					}}
					disabled={$account.tokens === 0}>Send token</button
				>
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
