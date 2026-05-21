import isServer from "@prettylab/core/utils/ssr/isServer";

export const getCookie = (key: string): string | null => {
  if (isServer()) return null;

  const match = document.cookie.match(new RegExp(`(^| )${key}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : null;
};

export const setCookie = (key: string, value: string) => {
  if (isServer()) return null;

  document.cookie = `${key}=${encodeURIComponent(value)}; path=/; max-age=31536000`;
};
