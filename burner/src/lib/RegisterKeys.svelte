<script>
	import { setState, logIn } from '$lib/stores/wallet';
	import { loadKeys, saveKeys } from '$lib/ts/keys';
	import { onMount } from 'svelte';
	let privateKey = '';
	let account = '';
	let errMessage = '';

	const cancel = () => {
		setState('view');
	};

	const save = () => {
		console.log('you have clicked on save');
		if (!privateKey || !account) {
			console.log('you have clicked on save');
			errMessage = 'Please enter a private key and an account';
			return;
		}
		saveKeys(privateKey, account);
		logIn(privateKey, account);
		setState('view');
	};

	onMount(() => {
		try {
			[privateKey, account] = loadKeys();
		} catch (e) {
			console.error(e);
		}
	});
</script>

<div class="register-keys">
	<label for="privatekey">private key</label>
	<input id="privatekey" type="text" class="key" placeholder="0x..." bind:value={privateKey} />
	<label for="account">account</label>
	<input id="account" type="text" class="key" placeholder="0x..." bind:value={account} />
	{#if errMessage}
		<div class="error">{errMessage}</div>
	{/if}
	<div class="command">
		<button on:click={cancel}>Cancel</button>
		<button on:click={save}>Save</button>
	</div>
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
