import kleur from "kleur";
import { FetchModules } from "./types.js";
import modulesUrl from "../../../../config/url.js";

const fetchModules = async (): FetchModules => {
  let response: Response;

  try {
    response = await fetch(modulesUrl, {
      redirect: "follow",
      headers: {
        Accept: "application/json",
        "User-Agent": "prettylab-cli",
      },
    });
  } catch (err: any) {
    console.error(
      kleur.red(`✗ Could not reach ${modulesUrl}\n  ${err?.cause?.message ?? err?.message ?? err}`),
    );
    process.exit(1);
  }

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    console.error(
      kleur.red(
        `✗ Failed to fetch ${modulesUrl}: ${response.status} ${response.statusText}\n${body.slice(0, 200)}`,
      ),
    );
    process.exit(1);
  }

  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    console.error(
      kleur.red(
        `✗ Response from ${modulesUrl} is not valid JSON. First bytes:\n${text.slice(0, 200)}`,
      ),
    );
    process.exit(1);
  }
};

export default fetchModules;
