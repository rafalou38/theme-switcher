import { extensions, workspace } from "vscode";

interface Theme {
	id: string;
	name: string;
	type: string;
	extension: string;
	extType: string;
}

export const themes = getThemes();
const workbenchConfig = workspace.getConfiguration("workbench");

export function setTheme(id: string): void {
	workbenchConfig.update("colorTheme", id);
}

export function getCurrentTheme(): Theme {
	let currentTheme = workbenchConfig.get("colorTheme");
	return themes.filter((e) => e.id === currentTheme)[0];
}

function getThemes(): Theme[] {
	return extensions.all.reduce((acc: Array<Theme>, current: any) => {
		let newVal: Array<Theme> = [];
		const contributesThemes = current.packageJSON.contributes
			? current.packageJSON.contributes.themes
				? current.packageJSON.contributes.themes
				: undefined
			: undefined;
		if (contributesThemes) {
			for (var i = 0; i < contributesThemes.length; i++) {
				const label = contributesThemes[i].label;
				const id = contributesThemes[i].id
					? contributesThemes[i].id
					: label;
				const uiTheme =
					contributesThemes[i].uiTheme === "vs-dark"
						? "dark"
						: "light";
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
			}
		}
		return [...acc, ...newVal];
	}, []);
}
