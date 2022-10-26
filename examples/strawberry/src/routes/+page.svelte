<script lang="ts">
  import { browser } from "$app/environment";
  import { register } from "@starknet/burner";
  import { onMount } from "svelte";

  const contractAddress = "0x51e94d515df16ecae5be4a377666121494eb54193d854fcf5baba2b0da679c6";
  let isConnected: boolean = wallet()?.isConnected;

  onMount(() => {
    if (!browser) {
      return;
    }

    const clear = setInterval(() => {
      isConnected = connectedWallet();
    }, 1000);

    return () => clearInterval(clear);
  });

  if (browser) {
    register({ tokenId: "0x234", usePin: true });
  }

  function wallet() {
    return browser && (window as any)?.["starknet-burner"];
  }

  function connectedWallet(): boolean {
    return wallet()?.isConnected;
  }

  async function connect() {
    await wallet().enable({ showModal: true });
  }

  async function disconnect() {
    if (connectedWallet()) {
      await wallet().request({ type: "keyring_Disconnect" });
    }
  }

  async function increment() {
    if (connectedWallet()) {
      wallet().account.execute({ contractAddress, entrypoint: "increment" });
    }
  }

  async function forbidden() {
    if (connectedWallet()) {
      wallet().account.execute({ contractAddress, entrypoint: "increment" });
    }
  }

  $: isConnected;
</script>

<div class="container">
  <div class="gameover">GAME OVER</div>
  <div class="title">
    {#if isConnected}
      MAKE A WISE CHOICE
    {:else}
      WANT MORE CREDITS?
    {/if}
  </div>
  <div class="buttons">
    <button on:click={connect} class:hide={isConnected}>
      🍓 connect to
      <svg
        width="40"
        height="40"
        viewBox="0 0 410 428"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M330 213.5C330 282.812 273.813 339 204.502 339C135.19 339 79 282.812 79 213.5C79 144.188 135.19 88 204.502 88C273.813 88 330 144.188 330 213.5Z"
          fill="#29296E"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M263.25 179.992L260.081 170.202C259.437 168.21 257.865 166.661 255.867 166.05L246.028 163.024C244.666 162.608 244.655 160.687 246.006 160.249L255.8 157.08C257.788 156.436 259.337 154.864 259.952 152.865L262.974 143.027C263.39 141.668 265.311 141.654 265.749 143.008L268.918 152.799C269.562 154.787 271.134 156.336 273.132 156.951L282.97 159.973C284.332 160.392 284.347 162.31 282.992 162.748L273.198 165.917C271.211 166.561 269.661 168.137 269.047 170.135L266.025 179.97C265.609 181.332 263.688 181.347 263.25 179.992Z"
          fill="#FAFAFA"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M90 211.548C92.9916 205.642 98.9079 201.192 105.055 198.38C111.264 195.597 118.091 193.889 124.795 193.335C138.33 192.103 151.515 194.384 163.526 198.327C169.714 200.185 175.251 202.765 180.97 205.372C183.75 206.72 186.362 208.248 189.053 209.724L196.486 214.065C204.646 219.106 212.558 223.57 219.991 227.038C227.442 230.476 234.176 232.802 240.523 233.989C246.871 235.192 253.322 235.177 261.256 233.342C269.127 231.548 277.983 227.679 287.24 222.716C296.553 217.75 306.104 211.66 317 205.709C315.907 218.147 312.414 229.81 306.959 241.072C301.369 252.199 293.595 263.053 282.26 271.843C271.141 280.704 255.871 286.88 240.326 287.809C224.774 288.868 209.979 285.415 197.392 280.221C184.757 274.951 173.839 268.026 164.162 260.382C161.49 258.27 160.055 257.071 158.082 255.39L152.571 250.525C148.858 247.596 145.261 244.094 141.585 241.192C134.253 235.016 126.999 228.829 119.046 223.465C115.036 220.739 110.9 218.211 106.21 215.971C103.88 214.889 101.405 213.881 98.7481 213.087C96.0278 212.192 93.2629 211.66 90 211.548Z"
          fill="#FF4F0A"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M90 211.712C91.5274 199.013 97.4474 187.101 106.935 176.962C116.374 166.92 131.12 159.179 147.483 158.153C155.558 157.614 163.757 158.514 171.293 160.602C178.796 162.684 185.827 165.716 192.164 169.288C195.33 171.083 198.292 173.045 201.242 175.026L209.106 180.98L221.381 190.665C229.348 197.009 236.952 202.878 243.979 207.724C251.074 212.578 257.116 216.123 262.888 218.201C268.607 220.468 275.831 221.048 285.382 218.647C290.124 217.554 295.07 215.559 300.347 213.396C305.595 211.18 311.043 208.538 317 205.918C316.283 212.303 314.986 218.662 312.522 224.605C310.155 230.629 307.037 236.523 302.678 242.02C300.448 244.696 298.058 247.387 295.271 249.869C292.484 252.293 289.396 254.593 285.984 256.611C279.18 260.555 271.108 263.435 262.828 264.461C254.548 265.501 246.235 264.981 238.665 263.375C231.054 261.814 224.12 259.298 217.754 256.392C205.066 250.49 194.453 243.072 185.069 235.219C180.357 231.298 175.938 227.202 171.754 223.044L166.811 218.082C165.321 216.644 163.816 215.198 162.326 213.875C156.32 208.564 150.746 204.506 144.607 201.975C138.512 199.325 130.712 198.236 121.142 200.027C111.61 201.8 101.152 205.922 90 211.712Z"
          fill="#FAFAFA"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M141 277C141 280.865 137.864 284 133.998 284C130.132 284 127 280.865 127 277C127 273.135 130.132 270 133.998 270C137.864 270 141 273.135 141 277Z"
          fill="#FAFAFA"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M141 277C141 280.865 137.864 284 133.998 284C130.132 284 127 280.865 127 277C127 273.135 130.132 270 133.998 270C137.864 270 141 273.135 141 277Z"
          fill="#FAFAFA"
        />
      </svg>
    </button>
    <button on:click={increment} class:hide={!isConnected}>🍄 1 UP</button>
    <button on:click={forbidden} class="error" class:hide={!isConnected}>
      ☠️ gimme "immortal" potion!
    </button>
    <button on:click={disconnect} class="warn" class:hide={!isConnected}>🚪 disconnect</button>
  </div>
</div>

<style>
  svg {
    margin: -5px 0 0 -8px;
    vertical-align: middle;
  }
  .buttons {
    display: grid;
    gap: 0.5em;
  }
  .container {
    margin: 0 auto;
    max-width: 400px;
    padding: 0.5rem;
  }
  .title {
    font-family: "VT323";
    margin-bottom: 2rem;
    text-align: center;
  }
  .gameover {
    animation-name: gameover;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    font-family: "VT323";
    font-size: 3rem;
    margin: 12rem auto 6rem;
    text-align: center;
  }

  @keyframes gameover {
    0% {
      color: #92cd41;
      text-shadow: 0 0 10px #4aa52e;
    }
    25% {
      color: #4aa52e;
      text-shadow: 2px 2px 2px #92cd41;
      transform: translate(-2px, 1px);
    }
    40% {
      color: #92cd41;
      text-shadow: none;
      transform: translate(0, 0);
    }
    50% {
      color: #4aa52e;
      text-shadow: 2px 2px 2px blue, -2px -2px 2px red;
      transform: translate(0px, 5px);
    }
    70% {
      color: #92cd41;
      text-shadow: none;
      transform: translate(0, 0);
    }
    80% {
      color: #92cd41;
      text-shadow: 0 0 10px #4aa52e;
      transform: translate(-2px, 1px);
    }
    100% {
      color: #92cd41;
      text-shadow: none;
    }
  }
</style>
