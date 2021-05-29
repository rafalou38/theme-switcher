<script lang="ts">
	import { onMount } from "svelte";
import { themes } from "./stores";

	export let vscode: WebviewApi;

	onMount(()=>{
		vscode.postMessage("getThemes")
	})
</script>

<ul>
	{#each $themes as theme}
		 <li>{theme.name}</li>
	{/each}
</ul>


<style lang="scss">

</style>
