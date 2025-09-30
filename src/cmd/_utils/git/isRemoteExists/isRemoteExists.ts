import { execa } from "execa";
import * as kleur from "kleur";

/* ------------------------------------------------------------ */
/* Ensures that a git remote with the given name and URL exists */
/* ------------------------------------------------------------ */

const isRemoteExists = async (root: string, name: string, url: string) => {
  const { stdout } = await execa("git", ["remote"], { cwd: root });
  const remotes = stdout.split(/\r?\n/);
  if (!remotes.includes(name)) {
    await execa("git", ["remote", "add", name, url], { cwd: root });
    console.log(kleur.green(`Added remote '${name}' → ${url}`));
  }
};

export default isRemoteExists;
