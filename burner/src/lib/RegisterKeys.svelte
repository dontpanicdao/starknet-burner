<script type="ts">
	import { wallet, saveToken } from '$lib/stores/wallet';
	import { setState } from '$lib/stores/burner';
	import { loadKeys } from '$lib/ts/keys';
	import type { Txn } from '$lib/ts/txns';
	import { onMount } from 'svelte';

	let publicKey = '';
	let expires = 0;
	let token1 = '';
	let token2 = '';
	let account = '';
	let errMessage = '';

	const cancel = () => {
		setState('view');
	};

	const save = () => {
		if (!account) {
			errMessage = 'Enter an account';
			return;
		}
		const history: Txn[] = [];
		saveToken(account, expires, token1, token2, history);
		setState('view');
	};

	onMount(() => {
		loadKeys();
		wallet.subscribe((data) => {
			publicKey = data.token.sessionkey;
			expires = data.token.expires;
			if (data.token.token.length >= 2) {
				token1 = data.token.token[0];
				token2 = data.token.token[1];
			}
			account = data.token.account;
		});
	});
</script>

<div class="register-keys">
	<label for="sessionkey">session key</label>
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
	<label for="account">account</label>
	<input id="account" type="text" class="key" placeholder="0x..." bind:value={account} />
	<label for="expires">expires</label>
	<input id="expires" type="text" class="key" placeholder="" bind:value={expires} />
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
		margin: 0 auto;
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
		min-width: 300px;
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

	.renew-session {
		min-width: 300px;
		padding: 4px;
	}
</style>
