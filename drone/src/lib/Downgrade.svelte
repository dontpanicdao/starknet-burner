<script>
	import { Contract } from 'starknet';
	import abi from '../abi/argentaccount_plugin_abi.json';
	import { connect } from '$lib/ts/utils';
	import { account } from '$lib/stores/account';

	const downgradeAccountHash =
		import.meta.env.VITE_ACCOUNT_CLASSIC_CLASS_HASH ||
		'0x03e327de1c40540b98d05cbcb13552008e36f0ec8d61d46956d2f9752c294328';
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
		tx = await c.upgrade(downgradeAccountHash);
		console.log(tx);
	};
</script>

<button on:click={click} disabled={$account.currentClass !== upgradeAccountHash}>Downgrade</button>
