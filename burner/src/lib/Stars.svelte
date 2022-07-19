<script type="ts">
	function getRandomInt(max: number) {
		return Math.floor(Math.random() * max);
	}

	let stars = new Array(100);
</script>

{#each stars as star}
	<i
		class="star"
		style="top: {getRandomInt(20)}%; left: {getRandomInt(100)}%; animation-duration: {getRandomInt(
			15
		)}s;"
	/>
{/each}

<style>
	.star {
		position: absolute;
		width: 2px;
		height: 2px;
		background: rgba(255, 255, 255, 0);
		border-radius: 5px;
		animation-name: twinkle;
		animation-timing-function: ease-in;
		animation-iteration-count: infinite;
	}

	@keyframes twinkle {
		0% {
			transform: scale(1, 1);
			background: rgba(255, 255, 255, 0);
			animation-timing-function: ease-in;
		}
		60% {
			transform: scale(0.8, 0.8);
			background: rgba(255, 255, 255, 1);
			animation-timing-function: ease-out;
		}
		80% {
			background: rgba(255, 255, 255, 0);
			transform: scale(1, 1);
		}
		100% {
			background: rgba(255, 255, 255, 0);
			transform: scale(1, 1);
		}
	}
</style>
