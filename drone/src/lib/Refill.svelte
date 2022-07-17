<script>
	import { Contract } from 'starknet';
	import abi from '../abi/faucet_abi.json';
	import { connect } from '$lib/ts/utils';
	import { account } from '$lib/stores/account';

	const contractAddress =
		import.meta.env.VITE_FAUCET_ADDRESS ||
		'0x05a87f6bec0b6121e55f291f8e06e6149accd706fb43c725a7f1fd3f3f62aadf';
	const upgradeAccountHash =
		import.meta.env.VITE_ACCOUNT_PLUGIN_CLASS_HASH ||
		'0x443e7c09ffda6b7cf5fe88fb18eb0a78d285db8ef8277c3918326d476c73efa';
	let tx;
	const click = async () => {
		let account = await connect();
		if (!account) {
			throw new Error('No connected account');
		}
		let c = new Contract(abi, contractAddress, account);
		tx = await c.withdraw();
		console.log(tx);
	};
</script>

<button
	on:click={click}
	disabled={$account.currentClass !== upgradeAccountHash || $account.token >= 2}>Refill</button
>
