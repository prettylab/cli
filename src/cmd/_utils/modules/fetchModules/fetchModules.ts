import { FetchModules } from "./types.js";
import modulesUrl from "../../../../config/url.js";

const fetchModules = async (): FetchModules => {
  const response = await fetch(modulesUrl);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch JSON: ${response.status} ${response.statusText}`,
    );
  }

  return await response.json();
};

export default fetchModules;
