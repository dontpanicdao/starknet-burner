<script>
	import { burner, setState, track } from '$lib/stores/burner';
	import { sendToken } from '$lib/stores/wallet';
	import { STRKCONTRACT } from '$lib/ts/constants';
	let to = '';
	let amount = 0;
	let errMessage = '';

	const cancel = () => {
		setState('view');
	};

	const send = async () => {
		console.log('you will send ');
		if (!to || !amount || amount === 0) {
			console.log('you have clicked on save');
			errMessage = 'you need to specify an account and a number of pills';
			return;
		}
		await sendToken(STRKCONTRACT.contract, to, amount, track);
		setState('transactions');
	};
</script>

<div class="register-keys">
	{#if $burner.lastError !== ''}
		<div class="error">{$burner.lastError}</div>
		<button
			on:click={() => {
				track(false, '');
			}}>Return</button
		>
	{:else if $burner.loading}
		<div class="loading">Loading...</div>
	{:else}
		<label for="to">to</label>
		<input id="to" type="text" class="key" placeholder="0x..." bind:value={to} />
		<label for="account">pills</label>
		<input id="account" type="text" class="key" bind:value={amount} />
		{#if errMessage}
			<div class="error">{errMessage}</div>
		{/if}
		<div class="command">
			<button on:click={cancel}>Cancel</button>
			<button on:click={send}>Send</button>
		</div>
	{/if}
</div>

<style>
	.register-keys {
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

	.command {
		display: flex;
		justify-content: space-between;
		margin-top: 20px;
	}
</style>
