<script lang="ts">
	import type { PageData } from './$types';

	/** @type {import('./$types').PageData */
	export let data: PageData;
	let { sessionkey } = data;
	$: ({ sessionkey } = data);

	import { Buffer } from 'buffer';
	import { toBN } from 'starknet/utils/number';
	import QR from '$lib/QR.svelte';
	import { connect } from '$lib/ts/utils';
	interface sessionToken {
		sessionPublicKey: string;
		account: string;
		expires: number;
		token: string[];
		contract: string;
	}

	const apiURL = import.meta.env.VITE_API_BASEURL || '';
	const baseURL = import.meta.env.VITE_BURNER_BASEURL || 'http://localhost:3000';
	let account = '';
	let token1 = '';
	let token2 = '';
	let expires = Math.round(new Date().getTime() / 1000) + 60 * 60 * 24;
	let errMessage = '';
	const encode = (str: string): string => Buffer.from(str, 'binary').toString('base64');

	$: sessionkey, checkError();

	const checkError = () => {
		if (!sessionkey || sessionkey === '') {
			errMessage = 'Enter a valid sessionkey';
			return;
		}
		errMessage = '';
	};

	const save = async (t: sessionToken) => {
		if (apiURL === '') {
			return;
		}
		const response = await fetch(`${apiURL}/${t.sessionPublicKey}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(t)
		});
		if (response.status !== 201) {
			throw new Error(`${response.status} ${response.statusText}`);
		}
	};

	const sign = async () => {
		let wallet = await connect();
		if (!wallet) {
			return;
		}
		let msg: any = {
			domain: {
				name: 'burner.starknet',
				version: '0.4',
				chainId: 'SN_GOERLI'
			},
			types: {
				StarkNetDomain: [
					{ name: 'name', type: 'felt' },
					{ name: 'version', type: 'felt' },
					{ name: 'chainId', type: 'felt' }
				],
				Session: [
					{ name: 'session_key', type: 'felt' },
					{ name: 'expires', type: 'felt' }
				]
			},
			primaryType: 'Session',
			message: {
				session_key: sessionkey,
				expires: expires
			}
		};
		account = wallet.address;
		let signature = await wallet.signMessage(msg);
		token1 = `0x${toBN(signature[0], 10).toString(16)}`;
		token2 = `0x${toBN(signature[1], 10).toString(16)}`;
		await save({
			sessionPublicKey: sessionkey,
			account: account,
			expires: expires,
			token: [token1, token2],
			contract: '0xdeadbeef'
		});
	};
</script>

<content>
	<div class="selection">
		{#if token1 && sessionkey}
			<div>
				<a
					href={`${baseURL}?key=${encode(
						JSON.stringify({
							sessionkey,
							account,
							token1,
							token2,
							expires
						})
					)}`}
				>
					<QR
						value={`${baseURL}?key=${encode(
							JSON.stringify({
								sessionkey,
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
						sessionkey = '';
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
				bind:value={sessionkey}
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
			<h1>Drone</h1>
			<p>see also <a href="/admin?s={sessionkey}">manage your account</a></p>
			<label for="sessionkey">sessionkey</label>
			<input id="sessionkey" type="text" class="key" placeholder="0x..." bind:value={sessionkey} />
			<div class="message">{errMessage}</div>
			<div class="buttons">
				<button
					on:click={() => {
						sessionkey = '';
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
	h1 {
		margin-bottom: 0px;
	}
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
