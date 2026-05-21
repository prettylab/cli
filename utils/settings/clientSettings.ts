import {
  decodeSettings,
  encodeSettings,
} from "@prettylab/core/utils/settings/settings";
import {
  getCookie,
  setCookie,
} from "@prettylab/core/utils/cookie/clientCookie";
import config from "@prettylab/config";

export function getClientSettings(key?: string) {
  try {
    const encoded = getCookie(config.core.settings.cookie_name);
    const settings = encoded ? decodeSettings(encoded) : {};
    return (key ? settings[key] : settings) ?? null;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export function saveClientSettings(key: string, value: any): void {
  try {
    const encoded = getCookie(config.core.settings.cookie_name);
    const settings = encoded ? decodeSettings(encoded) : {};
    settings[key] = value;
    setCookie(config.core.settings.cookie_name, encodeSettings(settings));
  } catch (err) {
    console.error(err);
  }
}
