import App from "../components/Sidebar.svelte";

const vscode = acquireVsCodeApi();
const app = new App({
  target: document.body,
  props: {
    vscode,
  },
});

export default app;
