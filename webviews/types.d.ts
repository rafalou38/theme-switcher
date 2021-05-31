declare interface WebviewApi {
  getState: () => any;
  postMessage: (message: any, transfer?: any) => any;
  setState: (newState: any) => any;
}

declare function acquireVsCodeApi(): WebviewApi;

declare interface ITheme {
  id: string;
  name: string;
  type: string;
  extension: string;
  extType: string;
}

declare module "*.svg";
