<script>
  import { browser } from "$app/environment";
  import { register } from "@starknet/burner";

  if (browser) {
    register({ tokenId: "0x234", usePin: true });
  }
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
