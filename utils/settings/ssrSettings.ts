import { decodeSettings, encodeSettings } from "./settings";
import { getCookie, setCookie } from "@prettylab/core/utils/cookie/ssrCookie";
import config from "@prettylab/config";

export const getServerSettings = async (key?: string) => {
  const encoded = await getCookie(config.core.settings.cookie_name);
  const settings = encoded ? decodeSettings(encoded) : {};
  return (key ? settings[key] : settings) ?? {};
};

export const saveServerSettings = async (key: string, value: any) => {
  const encoded = await getCookie(config.core.settings.cookie_name);
  const settings = encoded ? decodeSettings(encoded) : {};
  settings[key] = value;

  const newEncoded = encodeSettings(settings);
  await setCookie(config.core.settings.cookie_name, newEncoded);
};
