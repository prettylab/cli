import { Config } from "../project/_actions/getConfig/types.js";
import isRemoteExists from "../git/isRemoteExists/isRemoteExists.js";
import fetchRemote from "../git/_actions/fetchRemote/fetchRemote.js";
import isModuleDirty from "../git/isModuleDirty/isModuleDirty.js";
import splitPrefix from "../splitPrefix/splitPrefix.js";
import isAheadOrBehind from "../git/isAheadOrBehind/isAheadOrBehind.js";
import { ModuleStatus } from "./types.js";

const moduleStatus = async (
  root: string,
  mname: string,
  cfg: Config,
): ModuleStatus => {
  const mod = cfg.modules[mname];
  const remoteAlias = `pretty-${mname}`;
  await isRemoteExists(root, remoteAlias, mod.remote);
  await fetchRemote(root, remoteAlias);

  const branch = mod.branch || cfg.defaultBranch || "main";
  const remoteRef = `${remoteAlias}/${branch}`;

  const [dirty, splitSha] = await Promise.all([
    isModuleDirty(root, mod.prefix),
    splitPrefix(root, mod.prefix),
  ]);

  if (!splitSha) {
    return {
      name: mname,
      prefix: mod.prefix,
      remote: mod.remote,
      branch,
      dirty,
      ahead: 0,
      behind: 0,
    };
  }

  let ahead = 0,
    behind = 0;
  try {
    const ab = await isAheadOrBehind(root, splitSha, remoteRef);
    ahead = ab.ahead;
    behind = ab.behind;
  } catch {
    ahead = 0;
    behind = 0;
  }

  return {
    name: mname,
    prefix: mod.prefix,
    remote: mod.remote,
    branch,
    dirty,
    ahead,
    behind,
  };
};

export default moduleStatus;
