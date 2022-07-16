<script context="module" lang="ts">
	import { Buffer } from 'buffer';
	import { browser } from '$app/env';
	const decode = (str: string): string => Buffer.from(str, 'base64').toString('ascii');

	/** @type {import('./__types/[slug]').Load} */
	export async function load({ url }) {
		console.log('load...');
		let key = url.searchParams.get('key');
		if (!key || key === '' || !browser) {
			return {
				status: 200
			};
		}
		let v = JSON.parse(decode(key));
		let bwtk = {
			account: v.account,
			sessionkey: v.sessionkey,
			expires: v.expires,
			token: [v.token1, v.token2]
		};
		localStorage.setItem('bwtk', JSON.stringify(bwtk));
		return {
			status: 200
		};
	}
</script>

<script type="ts">
	import Burner from '$lib/Burner.svelte';
</script>

<div>
	<Burner />
</div>
