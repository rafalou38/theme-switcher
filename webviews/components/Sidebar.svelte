<script lang="ts">
  import { onMount } from "svelte";
  import { flip } from "svelte/animate";

  import { currentTheme, themes } from "./stores";

  import FillStar from "../icons/star-solid.svg";
  import EmptyStar from "../icons/star-regular.svg";
  export let vscode: WebviewApi;

  let favorites: Set<string> = new Set(
    JSON.parse(localStorage.getItem("favorites") || "[]")
  );

  $: {
    localStorage.setItem("favorites", JSON.stringify(Array.from(favorites)));
  }
  onMount(() => {
    vscode.postMessage("getThemes");
  });

	function setTheme(id: string) {
		vscode.postMessage({type: "setTheme", theme:id});
	}
</script>

<div class="list__title">favorites</div>
<ul class="list">
  {#each $themes.filter((e) => favorites.has(e.id)) as theme (theme.id)}
    <li class="list__item" class:list__item--current={$currentTheme === theme.id} animate:flip={{ duration: 200 }} on:click={()=>setTheme(theme.id)}>
      {theme.name}
      <button
        class="list__item__star"
        on:click={() => {
          favorites.delete(theme.id);
          favorites = favorites;
        }}><FillStar /></button
      >
    </li>
  {/each}
</ul>

<div class="list__title">all themes</div>
<ul class="list">
  {#each $themes.filter((e) => !favorites.has(e.id)) as theme (theme.id)}
    <li class="list__item" class:list__item--current={$currentTheme === theme.id} animate:flip={{ duration: 200 }} on:click={()=>setTheme(theme.id)}>
      {theme.name}
      <button
        class="list__item__star"
        on:click={() => {
          favorites = favorites.add(theme.id);
        }}
        ><EmptyStar />
      </button>
    </li>
  {/each}
</ul>

<style lang="scss">
  :global(body){
    background: var(--vscode-sideBar-background);
  }
  .list {
    padding: 0;
    margin:0;
    list-style: none;

  }
  .list__title {
    background: var(--vscode-sideBarSectionHeader-background);
    color: var(--vscode-foreground);
    margin: 0;
    padding: .5em;
  }
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
