import kleur from "kleur";

const logWarning = (msg: string) => {
  console.warn(kleur.yellow(msg));
};

export default logWarning;
