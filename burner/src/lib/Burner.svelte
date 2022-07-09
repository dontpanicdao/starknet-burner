<script>
	import { loadKeys } from './js/keys';
	import { onMount } from 'svelte';

	let privateKey = '0x...';
	let publicKey = '0x...';

	onMount(() => {
		[privateKey, publicKey] = loadKeys();
	});
</script>

<ul>
	<li>{privateKey.slice(0, 6)}...{privateKey.slice(-4)}</li>
	<li>{publicKey.slice(0, 6)}...{publicKey.slice(-4)}</li>
</ul>

<button
	on:click={() => {
		console.log('useless');
	}}>Burner</button
>
