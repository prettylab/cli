import isServer from "@prettylab/core/utils/ssr/isServer";

export const toBase64 = (str: string) =>
  isServer() ? Buffer.from(str).toString("base64") : window.btoa(str);

export const fromBase64 = (str: string) =>
  isServer() ? Buffer.from(str, "base64").toString("utf-8") : window.atob(str);
