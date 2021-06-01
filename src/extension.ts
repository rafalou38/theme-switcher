// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { themes, setTheme } from "./theme";
import * as statusBarItem from "./status";
import { SidebarProvider } from "./SidebarProvider";
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "theme-switcher" is now active!'
  );

  statusBarItem.activate(context);

  const sidebarProvider = new SidebarProvider(context.extensionUri);

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      "themeSwitcher-sidebar",
      sidebarProvider
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("theme-switcher.change-theme", async () => {
      let newTheme = themes[Math.floor(Math.random() * themes.length)];

      setTheme(newTheme.id);

      vscode.window.showInformationMessage(`current theme: ${newTheme.name}`);
      statusBarItem.setText(newTheme.name);

      sidebarProvider.updateThemes(newTheme);
    })
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
