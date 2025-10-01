import kleur from "kleur";
import moduleStatus from "../../../modules/moduleStatus/moduleStatus.js";

const formatStatus = (s: Awaited<ReturnType<typeof moduleStatus>>): string => {
  const name = kleur.bold(s.name);
  const pathTxt = kleur.gray(s.prefix);
  const remoteTxt = kleur.gray(`${s.remote}#${s.branch}`);
  const flags: string[] = [];

  if (s.dirty) flags.push(kleur.yellow("dirty"));
  if (s.ahead > 0) flags.push(kleur.cyan(`ahead:${s.ahead}`));
  if (s.behind > 0) flags.push(kleur.magenta(`behind:${s.behind}`));
  if (flags.length === 0) flags.push(kleur.green("up-to-date"));
  return `${name}  ${pathTxt}  ${remoteTxt}  ${flags.join("  ")}`;
};

export default formatStatus;
