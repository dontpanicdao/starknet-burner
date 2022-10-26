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
    }, 2000);

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
  <div class="credits">buy more credits?</div>
  <div class="buttons">
    <button on:click={connect} class:hide={isConnected}>🍓 Connect to my wallet</button>
    <button on:click={increment} class:hide={!isConnected}>🍄 Add lives</button>
    <button on:click={forbidden} class="error" class:hide={!isConnected}>
      ☠️ Give me infinite lives!!!
    </button>
    <button on:click={disconnect} class="warn" class:hide={!isConnected}>🚪 Disconnect</button>
  </div>
</div>

<style>
  .buttons {
    display: grid;
    gap: 0.5em;
  }
  .container {
    margin: 0 auto;
    max-width: 400px;
  }
  .credits {
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
