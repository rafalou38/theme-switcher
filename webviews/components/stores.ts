import { writable } from "svelte/store";

export const themes = writable<ITheme[]>([]);
export const currentTheme = writable<ITheme | null>(null);

window.addEventListener("message", (event) => {
  if (event.origin !== "vscode-webview://webviewview-themeswitcher-sidebar")
    return console.warn(event.origin, "is a bad origin");
  if (event.data.type === "updateThemes") {
    themes.set(event.data.themes as ITheme[]);
  }
  if (event.data.type === "updateCurrentThemes") {
    currentTheme.set(event.data.theme as ITheme);
  }
});
