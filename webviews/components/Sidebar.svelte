<script lang="ts">
  import { onMount } from "svelte";
  import ListItem from "./ListItem.svelte";
  import { themes } from "./stores";

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
</script>

<div class="list__title">favorites</div>
<ul class="list">
  {#each $themes.filter((e) => favorites.has(e.id)) as theme (theme.id)}
    <ListItem bind:favorites bind:theme {vscode} />
  {/each}
</ul>

<div class="list__title">all themes</div>
<ul class="list">
  {#each $themes.filter((e) => !favorites.has(e.id)) as theme (theme.id)}
    <ListItem bind:favorites bind:theme {vscode} />
  {/each}
</ul>

<style lang="scss">
  :global(body) {
    background: var(--vscode-sideBar-background);
  }
  .list {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  .list__title {
    background: var(--vscode-sideBarSectionHeader-background);
    color: var(--vscode-foreground);
    margin: 0;
    padding: 0.5em;
  }
</style>
