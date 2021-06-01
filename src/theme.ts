import { extensions, workspace } from "vscode";

export const themes = getThemes();

export function setTheme(id: string): void {
  const workbenchConfig = workspace.getConfiguration("workbench");
  workbenchConfig.update("colorTheme", id);
}

export function getCurrentTheme(): ITheme {
  const workbenchConfig = workspace.getConfiguration("workbench");
  let currentTheme = workbenchConfig.get("colorTheme");

  console.log(currentTheme);

  return themes.filter((e) => e.id === currentTheme)[0];
}

function getThemes(): ITheme[] {
  return extensions.all.reduce((acc: Array<ITheme>, current) => {
    let newVal: Array<ITheme> = [];
    const themeExts = current.packageJSON.contributes?.themes;
    if (!themeExts) return acc;

    themeExts.forEach((theme: any) => {
      const label = theme.label;
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
        },
      ];
    });

    return [...acc, ...newVal];
  }, []);
}
