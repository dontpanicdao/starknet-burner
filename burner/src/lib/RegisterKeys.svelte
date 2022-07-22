<script type="ts">
	import { wallet, saveToken } from '$lib/stores/wallet';
	import { setState } from '$lib/stores/burner';
	import { loadKeys } from '$lib/ts/keys';
	import type { Txn } from '$lib/ts/txns';
	import { onMount } from 'svelte';
	import CopyIcon from '$lib/icons/CopyIcon.svelte';

	const cancel = () => {
		setState('view');
	};

	const copyInClipBoard = async (value: string) => {
		const elem = document.createElement('textarea');
		elem.value = value;
		document.body.appendChild(elem);
		elem.select();
		document.execCommand('copy');
		document.body.removeChild(elem);
	};

	onMount(() => {
		loadKeys();
	});
</script>

<div class="container">
	<label for="sessionkey">session key</label>
	<div class="session-key-wrapper">
		<input
			id="sessionkey"
			type="text"
			class="key"
			placeholder="0x..."
			value={$wallet.token?.sessionkey}
			disabled
		/>
		<button
			class="secondary"
			on:click={() => {
				copyInClipBoard($wallet.token?.sessionkey);
			}}
		>
			<CopyIcon />
		</button>
	</div>
	<button
		class="renew-session"
		on:click={() => {
			console.log('new...');
			setState('renewkey');
		}}>Change</button
	>
	<label style="margin-top: 20px" for="account">account</label>
	<input
		id="account"
		disabled
		type="text"
		class="key"
		placeholder="0x..."
		value={$wallet.token?.account}
	/>
	<label for="expires">expires</label>
	<input
		id="expires"
		disabled
		type="text"
		class="key"
		placeholder=""
		value={$wallet.token?.expires}
	/>
	<label for="token1">session token (#1)</label>
	<input
		id="token1"
		disabled
		type="text"
		class="key"
		placeholder="0x..."
		value={$wallet.token?.token[0]}
	/>
	<label for="token2">session token (#2)</label>
	<input
		id="token2"
		disabled
		type="text"
		class="key"
		placeholder="0x..."
		value={$wallet.token?.token[1]}
	/>
	<div class="command">
		<button class="secondary" on:click={cancel}>Back</button>
	</div>
</div>

<style>
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
		margin-top: 20px;
	}

	.command button {
		display: block;
		padding: 4px;
		min-width: 120px;
		margin-left: 5px;
	}

	.renew-session {
		min-width: 70%;
		padding: 4px;
	}

	.session-key-wrapper {
		display: flex;
		margin-bottom: 10px;
	}

	.session-key-wrapper .key {
		margin-bottom: 0;
		margin-right: 5px;
		color: white;
	}

	.session-key-wrapper button {
		fill: #2e4057;
	}

	.session-key-wrapper button:hover {
		fill: #c0c0c0;
	}
</style>
