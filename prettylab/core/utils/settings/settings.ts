import { fromBase64, toBase64 } from "@prettylab/core/utils/encode/base64";

export function encodeSettings(settings: Record<string, any>): string {
  return toBase64(JSON.stringify(settings));
}

export function decodeSettings(encoded: string): Record<string, any> {
  try {
    const decoded = fromBase64(encoded);
    return JSON.parse(decoded);
  } catch (err) {
    console.error("Failed to decode settings:", err);
    return {};
  }
}
