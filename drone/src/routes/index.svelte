<script lang="ts">
	import { getStarknet } from 'get-starknet';
	import type { TypedData } from 'starknet/utils/typedData/types';
	import { Buffer } from 'buffer';
	import { toBN } from 'starknet/utils/number';
	import QR from '$lib/QR.svelte';

	let baseURL = 'http://localhost:3000?key=';
	let sessionKey = '';
	let account = '';
	let token1 = '';
	let token2 = '';
	let expires = Math.round(new Date().getTime() / 1000) + 60 * 60 * 24;
	let errMessage = '';
	const encode = (str: string): string => Buffer.from(str, 'binary').toString('base64');

	$: sessionKey, checkError();

	const checkError = () => {
		if (!sessionKey || sessionKey === '') {
			errMessage = 'Enter a valid sessionkey';
			return;
		}
		errMessage = '';
	};

	const connect = async () => {
		if (!sessionKey || sessionKey === '') {
			return;
		}
		let starknet = getStarknet();
		console.log('connect...');
		if (!starknet.isConnected) {
			await starknet.enable();
		}
		if (starknet.selectedAddress) {
			account = starknet.selectedAddress;
		}
		let msg: TypedData = {
			domain: {
				name: 'Example DApp',
				chainId: 'SN_GOERLI',
				version: '0.0.1'
			},
			types: {
				StarkNetDomain: [
					{ name: 'name', type: 'felt' },
					{ name: 'chainId', type: 'felt' },
					{ name: 'version', type: 'felt' }
				],
				Message: [
					{ name: 'message', type: 'felt' },
					{ name: 'expires', type: 'felt' }
				]
			},
			primaryType: 'Message',
			message: {
				message: sessionKey,
				expires: expires
			}
		};
		let signature = await starknet.account.signMessage(msg);
		token1 = `0x${toBN(signature[0], 10).toString(16)}`;
		token2 = `0x${toBN(signature[1], 10).toString(16)}`;
	};

	const sign = async () => {
		await connect();
	};
</script>

<content>
	<h1>drone</h1>
	<p>drone let you sign a session key with your argent-x browser extension</p>
	<div class="selection">
		{#if token1 && sessionKey}
			<div>
				<a
					href={`${baseURL}${encode(
						JSON.stringify({
							sessionKey,
							account,
							token1,
							token2,
							expires
						})
					)}`}
				>
					<QR
						value={`${baseURL}${encode(
							JSON.stringify({
								sessionKey,
								account,
								token1,
								token2,
								expires
							})
						)}`}
					/>
				</a>
			</div>
			<div class="buttons">
				<button
					on:click={() => {
						sessionKey = '';
						expires = Math.round(new Date().getTime() / 1000) + 60 * 60 * 24;
						token1 = '';
						token2 = '';
						errMessage = '';
					}}>Reset</button
				>
			</div>
			<label for="sessionkey">sessionkey</label>
			<input
				id="sessionkey"
				disabled
				type="text"
				class="key"
				placeholder="0x..."
				bind:value={sessionKey}
			/>
			<label for="account">account (see argent-x)</label>
			<input id="account" disabled type="text" class="key" placeholder="0" bind:value={account} />
			<label for="expires">expires</label>
			<input id="expires" disabled type="int" class="key" placeholder="0" bind:value={expires} />
			<label for="token1">token (section #1)</label>
			<input id="token1" disabled type="text" class="key" placeholder="0x..." bind:value={token1} />
			<label for="token2">token (section #2)</label>
			<input id="token2" disabled type="text" class="key" placeholder="0x..." bind:value={token2} />
		{:else}
			<label for="sessionkey">sessionkey</label>
			<input id="sessionkey" type="text" class="key" placeholder="0x..." bind:value={sessionKey} />
			<label for="account">account (see argent-x)</label>
			<input id="account" disabled type="text" class="key" placeholder="0" bind:value={account} />
			<label for="expires">expires</label>
			<input id="expires" disabled type="int" class="key" placeholder="0" bind:value={expires} />
			<label for="token1">token (section #1)</label>
			<input id="token1" disabled type="text" class="key" placeholder="0x..." bind:value={token1} />
			<label for="token2">token (section #2)</label>
			<input id="token2" disabled type="text" class="key" placeholder="0x..." bind:value={token2} />
			<div class="message">{errMessage}</div>
			<div class="buttons">
				<button
					on:click={() => {
						sessionKey = '';
						expires = Math.round(new Date().getTime() / 1000) + 60 * 60 * 24;
						token1 = '';
						token2 = '';
						errMessage = '';
					}}>Clear</button
				>
				<button on:click={sign}>Sign</button>
			</div>
		{/if}
	</div>
</content>

<style>
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
	.selection input {
		width: 200px;
	}
	.selection button {
		width: 100px;
	}
	.buttons {
		margin-top: 1em;
	}

	.message {
		margin-top: 1em;
		color: red;
	}
</style>
