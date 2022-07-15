<script type="ts">
	import QRCode from 'qrcode';
	import { onMount } from 'svelte';

	export let value = '';
	let img: string | undefined = '';

	$: value, updateValue();

	const updateValue = async () => {
		console.log(value);
		img = await QRCode.toDataURL(value);
	};

	onMount(updateValue);
</script>

<img src={img} alt="qrcode" />
