<script type="ts">
	import { logIn } from '$lib/stores/wallet';
	import { setState } from '$lib/stores/burner';
	import { loadKeys, saveKeys } from '$lib/ts/keys';
	import type { Txn } from '$lib/ts/txns';
	import { onMount } from 'svelte';
	let privateKey = '';
	let publicKey = '';
	let expirationTime = 0;
	let token1 = '';
	let token2 = '';
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
		const history: Txn[] = [];
		logIn(privateKey, account, history);
		setState('view');
	};

	onMount(() => {
		try {
			[publicKey, account] = loadKeys();
		} catch (e) {
			console.error(e);
		}
	});
</script>

<div class="register-keys">
	<label for="sessionkey">session key</label>
	<div>
		<input
			id="sessionkey"
			type="text"
			class="key"
			placeholder="0x..."
			bind:value={publicKey}
			disabled
		/>
		<button
			class="renew-session"
			on:click={() => {
				console.log('new...');
				setState('renewkey');
			}}>Change</button
		>
	</div>
	<label for="account">account</label>
	<input id="account" type="text" class="key" placeholder="0x..." bind:value={account} />
	<label for="expiration">expiration time</label>
	<input id="expiration" type="text" class="key" placeholder="" bind:value={expirationTime} />
	<label for="token1">session token (#1)</label>
	<input id="token1" type="text" class="key" placeholder="0x..." bind:value={token1} />
	<label for="token2">session token (#2)</label>
	<input id="token1" type="text" class="key" placeholder="0x..." bind:value={token2} />
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

	.renew-session {
		margin-left: -75px;
		width: 70px;
	}
</style>
