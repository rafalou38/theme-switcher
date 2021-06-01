<script lang="ts">
  import { flip } from "svelte/animate";

  import { currentTheme} from "./stores";

  import FillStar from "../icons/star-solid.svg";
  import EmptyStar from "../icons/star-regular.svg";

	export let favorites: Set<string>;

	export let theme: ITheme;
	export let vscode: WebviewApi;

	function setTheme() {
		vscode.postMessage({type: "setTheme", theme:theme.id});
	}
</script>


<li class="list__item" class:list__item--current={$currentTheme === theme.id} on:click={setTheme}>
	{theme.name}
	<button
		class="list__item__star"
		on:click={() => {
			if (favorites.has(theme.id)) {

				favorites.delete(theme.id);
			}else{

				favorites.add(theme.id);
			}
			favorites = favorites;
		}}>
		{#if favorites.has(theme.id)}

			 <FillStar />
		{:else}
		<EmptyStar />
		{/if}
		</button
	>
</li>




<style lang="scss">
	.list__item {
    position: relative;
    z-index: 1;

    height: 4em;
    padding: .5em 1em;

    user-select: none;
    cursor: pointer;

    display: flex;
    align-items: center;

    font-weight: 500;
    &::before {
      content: "";
      background: var(--vscode-sideBar-background);
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
    &:hover::before,
    &--current::before {
      filter: brightness(120%);
    }
  }
  .list__item__star {
    display: block;
    position: absolute;
    right: 0;

    width: 2em;

    background: none;

    :global(svg) {
      color: var(--vscode-foreground);
    }
  }
</style>