<script lang="ts">
	import type { PageData } from './$types';
	import {
		createSession,
		type SignedSession,
		type RequestSession,
		type PreparedSession
	} from '@argent/x-sessions';
	import { connect } from '$lib/ts/utils';
	import { Policies, type websites } from '$lib/ts/dapps';

	/** @type {import('./$types').PageData */
	export let data: PageData;
	let { sessionkey } = data;
	$: ({ sessionkey } = data);

	const apiURL = import.meta.env.VITE_API_BASEURL || '';

	let errMessage = '';
	let signedKey: (SignedSession & { account: string }) | undefined = undefined;

	$: sessionkey, checkError();

	const checkError = () => {
		if (!sessionkey || sessionkey === '') {
			errMessage = 'Enter a valid sessionkey';
			return;
		}
		errMessage = '';
	};

	const save = async (
		t: SignedSession & RequestSession & PreparedSession & { account: string }
	) => {
		if (apiURL === '') {
			throw new Error(`apiURL is empty`);
		}
		const response = await fetch(`${apiURL}/${t.key}`, {
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

	const Signer = (app: websites) => {
		return async () => {
			if (!window) {
				return;
			}
			let account = await connect();
			if (!account) {
				errMessage = 'cannot connect to wallet';
				return;
			}
			const requestSession: RequestSession = {
				key: sessionkey,
				expires: Math.floor((Date.now() + 1000 * 60 * 60 * 24) / 1000), // 1 day in seconds
				policies: Policies[app]
			};
			const signedSession = await createSession(requestSession, account);
			await save({ ...signedSession, account: account.address });
			signedKey = { ...signedSession, account: account.address };
		};
	};
</script>

<content>
	<div class="selection">
		{#if signedKey}
			<h1>key signed, congrats!</h1>
			<div class="buttons">
				<button
					on:click={() => {
						errMessage = '';
						signedKey = undefined;
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
			<pre>{JSON.stringify(signedKey, null, ' ')}</pre>
		{:else}
			<h1>Drone</h1>
			<label for="sessionkey">sessionkey</label>
			<input id="sessionkey" type="text" class="key" placeholder="0x..." bind:value={sessionkey} />
			<div class="message">{errMessage}</div>
			<div class="buttons">
				<button
					on:click={() => {
						errMessage = '';
					}}>Clear</button
				>
				<button on:click={Signer('demo')}>Sign</button>
			</div>
			<h2 class="frenstitle">Frens...</h2>
			<div class="frens">
				<img class="frenslands" src="/react.png" alt="demo" />
				<button on:click={Signer('demo')}>Sign</button>
			</div>
			<div class="frens">
				<img
					class="frenslands"
					src="https://www.frenslands.xyz/resources/front/UI_GameTitle.png"
					alt="frenslands"
				/>
				<button on:click={Signer('frenslands')}>Sign</button>
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
		margin-top: 0.5em;
	}

	.frenstitle {
		margin-top: 1.5em;
		margin-bottom: 0em;
	}

	.frens {
		display: flex;
		margin-top: 0.5em;
		justify-content: space-between;
		align-items: center;
		min-width: 250px;
	}

	.frenslands {
		width: 64px;
	}

	.message {
		margin-top: 1em;
		color: red;
	}
</style>
