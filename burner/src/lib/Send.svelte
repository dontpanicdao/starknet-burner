<script>
	import { burner, setState, track } from '$lib/stores/burner';
	import { sendToken } from '$lib/stores/wallet';
	import { STRKCONTRACT } from '$lib/ts/constants';
	import Scanner from './Scanner.svelte';
	import ScanIcon from './ScanIcon.svelte';

	let to = '0x0207aCC15dc241e7d167E67e30E769719A727d3E0fa47f9E187707289885Dfde';
	let amount = 1;
	let errMessage = '';
	let displayScan = false;

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

	function onSuccess(res) {
		to = res;
		displayScan = false;
	}

	const onClick = () => {
		displayScan = !displayScan;
	};
</script>

<div class="register-keys">
	{#if $burner.lastError !== ''}
		<div class="error">{$burner.lastError}</div>
		<button
			class="secondary"
			on:click={() => {
				track(false, '');
			}}>Return</button
		>
	{:else if $burner.loading}
		<div class="loading">Loading...</div>
	{:else}
		<label for="to">to</label>
		<input id="to" type="text" class="key" placeholder="0x..." bind:value={to} />
		{#if displayScan}
			<div class="scanner">
				<Scanner {onSuccess} disableFlip={true} qrbox={{ width: 480, height: 480 }} />
			</div>
			<div class="command">
				<button on:click={onClick}>Close</button>
			</div>
		{:else}
			<ScanIcon {onClick} />
		{/if}
		<label for="account">pills</label>
		<input id="account" type="text" class="key" bind:value={amount} />
		{#if errMessage}
			<div class="error">{errMessage}</div>
		{/if}
		<div class="command">
			<button class="secondary" on:click={cancel}>Cancel</button>
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
		min-width: 70%;
		height: 1em;
		border: 1px solid #ccc;
		border-radius: 5px;
		margin-bottom: 10px;
		padding: 10px;
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
