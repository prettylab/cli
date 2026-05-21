import { Route } from "@prettylab/core/types/Route";
import config from "@prettylab/config";

// Get route core function which returns a route based on a callback condition
const getRoute = (callback: (item: any) => boolean): Route => {
  const routesArray = Object.values(config.core.routes.publicRoutes);
  const protectedRoutesArray = Object.values(
    config.core.routes.protectedRoutes,
  );

  // @ts-ignore
  const failbackRoute = config.core.routes.publicRoutes?.index;
  const combinedRoutes = [...routesArray, ...protectedRoutesArray];
  return combinedRoutes.find(callback) || failbackRoute;
};

// Checks if url2 matches the pattern defined in url
// e.g., matchRoutePattern('/user/:id', '/user/123') => true
export const matchRoutePattern = (url: string, url2: string) => {
  const regexPattern = url.replace(/:[^\s/]+/g, "([\\w-]+)");
  const regex = new RegExp(`^${regexPattern}$`);

  return regex.test(url2);
};

// Get route object by pathname
export const getRouteObjectByPathname = (route: string) => {
  return getRoute((item: any) => matchRoutePattern(item.href, route));
};

// Checks if given pathname is a protected route
export const isProtectedRoute = (href: string) =>
  Object.values(config.core.routes.protectedRoutes).some((route) => {
    return matchRoutePattern(route.href, href);
  });

// Checks if given pathname is a public route
export const isPublicRoute = (href: string) =>
  Object.values(config.core.routes.publicRoutes).some((route) => {
    return matchRoutePattern(route.href, href);
  });

// Generate path with route params and query params
export function generatePath(url: any, params: any = {}) {
  const { route = {}, query = {} } = params;

  const path = url.replace(/:(\w+)/g, (_: any, key: any) => {
    if (route[key] !== undefined) {
      return route[key];
    }
    throw new Error(`Missing parameter: ${key}`);
  });

  const queryEntries = Object.entries(query).filter(
    ([, value]) => value !== undefined && value !== null,
  );

  if (queryEntries.length === 0) {
    return path;
  }

  const queryString = queryEntries
    .map(
      ([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`,
    )
    .join("&");

  return `${path}?${queryString}`;
}

export function generateApiPath(url: any, params: any = {}) {
  return process.env.NEXT_PUBLIC_SITE_URL + generatePath(url, params);
}
