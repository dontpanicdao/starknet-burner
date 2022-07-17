<script>
	import { queryContract, account } from '$lib/stores/account';

	let tx;
	const click = async () => {
		await queryContract();
	};
</script>

<button on:click={click} disabled={$account.isRunning}>Refresh</button>
