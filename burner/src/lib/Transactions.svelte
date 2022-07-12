<script>
	import { setState } from '$lib/stores/burner';
</script>

<div class="transactions">
	View pending transactions...
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

	.command {
		display: flex;
		justify-content: space-between;
		margin-top: 20px;
	}
</style>
