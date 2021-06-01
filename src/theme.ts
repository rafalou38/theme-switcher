import { readFileSync } from "fs";
import { join } from "path";
import { extensions, workspace } from "vscode";
import { contentCache } from "./cache";

export const themes = getThemes();

export function setTheme(id: string): void {
  const workbenchConfig = workspace.getConfiguration("workbench");
  workbenchConfig.update("colorTheme", id);
}

export function getCurrentTheme(): ITheme {
  const workbenchConfig = workspace.getConfiguration("workbench");
  let currentTheme = workbenchConfig.get("colorTheme");
  if (currentTheme) {
    return themes.filter((e) => e.id === currentTheme)[0];
  } else {
    console.error("no theme found!");
  }
}

function getThemes(): ITheme[] {
  return extensions.all.reduce((acc: Array<ITheme>, current) => {
    let newVal: Array<ITheme> = [];
    const themeExts = current.packageJSON.contributes?.themes;
    if (!themeExts) return acc;

    themeExts.forEach((theme: any) => {
      const label = theme.label;
      const path = join(current.extensionPath, theme.path);
      let content: string;
      if (contentCache.has(path)) {
        content = contentCache.get(path) as string;
      } else {
        let f = readFileSync(path);
        console.log("read file: " + path);
        content = f.toString();
        contentCache.set(path, content);
      }

      const id = theme.id ? theme.id : label;
      const uiTheme = theme.uiTheme === "vs-dark" ? "dark" : "light";
      const extensionType = current.packageJSON.isBuiltin
        ? "Built-in"
        : "External";

      newVal = [
        ...newVal,
        {
          id,
          name: label,
          type: uiTheme,
          extension: current.id,
          extType: extensionType,
          content,
        },
      ];
    });

    return [...acc, ...newVal];
  }, []);
}
