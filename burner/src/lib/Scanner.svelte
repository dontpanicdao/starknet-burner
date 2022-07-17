<script>
	import { Html5QrcodeScanner } from 'html5-qrcode';
	import { onDestroy, onMount } from 'svelte';
	export let aspectRatio = 1;
	export let qrcodeRegionId = 'html5qr-code-full-region';
	export let disableFlip = false;
	export let fps = 10;
	export let onError = () => {};
	export let onSuccess;
	export let qrbox = {};
	export let rememberLastUsedCamera = true;
	export let verbose = false;
	let html5QrcodeScanner;
	onDestroy(() => {
		html5QrcodeScanner &&
			html5QrcodeScanner.clear().catch((err) => {
				console.error('Failed to clear html5QrcodeScanner"', err);
			});
	});
	onMount(() => {
		if (!onSuccess) {
			throw 'onSuccess callback is required callback.';
		}
		const config = { aspectRatio, disableFlip, fps, qrbox, rememberLastUsedCamera };
		html5QrcodeScanner = new Html5QrcodeScanner(qrcodeRegionId, config, verbose);
		html5QrcodeScanner.render(onSuccess, onError);
	});
</script>

<div class="qrcode" id={qrcodeRegionId} />

<style>
	.qrcode {
		position: relative;
		width: 480px;
		height: 480px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}
</style>
