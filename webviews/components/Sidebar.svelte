<script lang="ts">
	import { onMount } from "svelte";
import { themes } from "./stores";

	export let vscode: WebviewApi;

	let favorites: Set<string> = new Set(['Abyss', "Default Light+"])

	onMount(()=>{
		vscode.postMessage("getThemes")
	})
</script>

<div class="list--title">favorites</div>
<ul class="list">
	{#each $themes.filter(e=>favorites.has(e.id)) as theme}
		 <li class="list--item">
			 {theme.name}
			</li>
	{/each}
</ul>

<div class="list--title">all themes</div>
<ul class="list">
	{#each $themes.filter(e=>!favorites.has(e.id)) as theme}
		 <li class="list--item">
			 {theme.name}
			</li>
	{/each}
</ul>


<style lang="scss">
	.list{
		list-style: none;
	}
	.list--title{
		background: var(--vscode-dropdown-listBackground);
		color: var(--vscode-dropdown-foreground);
	}
	.list--item{
		position: relative;
		z-index: 1;

		height: 2em;
		padding: .5em;

		user-select: none;
		cursor: pointer;

		display: flex;
		align-items: center;

		font-weight: 500;
		&::before{
			content: "";
			background: var(--vscode-editor-background);
			position: absolute;
			z-index: -1;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
		}
		&:hover::before{
			filter: brightness(120%);
		}
	}
</style>
