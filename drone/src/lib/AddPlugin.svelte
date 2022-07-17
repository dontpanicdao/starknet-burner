<script>
	import { Contract } from 'starknet';
	import abi from '../abi/argentaccount_plugin_abi.json';
	import { connect } from '$lib/ts/utils';
	import { account } from '$lib/stores/account';

	const pluginClassHash =
		import.meta.env.VITE_PLUGIN_HASH ||
		'0x377e145923e881f59d62269a46057d8dac67e27d68a12679b198d4224a0966b';
	const upgradeAccountHash =
		import.meta.env.VITE_ACCOUNT_PLUGIN_CLASS_HASH ||
		'0x443e7c09ffda6b7cf5fe88fb18eb0a78d285db8ef8277c3918326d476c73efa';

	let tx;
	const click = async () => {
		let account = await connect();
		if (!account) {
			throw new Error('No connected account');
		}
		let c = new Contract(abi, account.address, account);
		tx = await c.add_plugin(pluginClassHash);
		console.log(tx);
	};
</script>

<button
	on:click={click}
	disabled={$account.hasPlugin || $account.currentClass !== upgradeAccountHash}>Add Plugin</button
>
