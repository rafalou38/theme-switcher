import * as vscode from "vscode";
import { getCurrentTheme } from "./theme";

let myStatusBarItem: vscode.StatusBarItem;

export function activate({ subscriptions }: vscode.ExtensionContext) {
  // register a command that is invoked when the status bar
  // item is selected
  const commandId = "theme-switcher.change-theme";

  // create a new status bar item that we can now manage
  myStatusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  );
  myStatusBarItem.command = commandId;
  subscriptions.push(myStatusBarItem);

  // update status bar item once at start
  updateStatusBarItem();
}

function updateStatusBarItem(): void {
  setText(getCurrentTheme().name);
  myStatusBarItem.show();
}

export function setText(text: string): void {
  if (myStatusBarItem) {
    myStatusBarItem.text = `$(symbol-color) ${text}`;
  }
}
