import kleur from "kleur";

const logError = (msg: string) => {
  console.error(kleur.red(msg));
};

export default logError;
