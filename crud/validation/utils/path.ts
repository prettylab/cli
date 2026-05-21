const WILDCARD = Symbol("WILDCARD");
type PathToken = string | typeof WILDCARD;

export function parsePath(path: string): PathToken[] {
  const raw = path.split(".");
  const tokens: PathToken[] = [];

  for (const seg of raw) {
    if (seg.endsWith("[]")) {
      const base = seg.slice(0, -2);
      if (base) tokens.push(base);
      tokens.push(WILDCARD);
    } else {
      tokens.push(seg);
    }
  }

  return tokens;
}

interface Match {
  value: any;
  path: (string | number)[];
}

export function collectMatches(
  source: any,
  tokens: PathToken[],
  currentPath: (string | number)[] = [],
): Match[] {
  if (!tokens.length) {
    return [{ value: source, path: currentPath }];
  }

  const [head, ...rest] = tokens;

  if (head === WILDCARD) {
    if (!Array.isArray(source)) return [];
    const out: Match[] = [];
    source.forEach((item, idx) => {
      out.push(...collectMatches(item, rest, [...currentPath, idx]));
    });
    return out;
  }

  if (source == null || typeof source !== "object" || !(head in source)) {
    return [];
  }

  return collectMatches(source[head], rest, [...currentPath, head]);
}

export function setDeep(
  target: any,
  path: (string | number)[],
  value: any,
): void {
  let cur = target;

  path.forEach((segment, i) => {
    const isLast = i === path.length - 1;

    if (isLast) {
      if (typeof segment === "number") {
        if (!Array.isArray(cur)) cur = [];
        cur[segment] = value;
      } else {
        cur[segment] = value;
      }
      return;
    }

    const nextSeg = path[i + 1];
    const isNextIndex = typeof nextSeg === "number";

    if (typeof segment === "number") {
      if (!Array.isArray(cur)) {
        cur = [];
      }
      if (cur[segment] == null) {
        cur[segment] = isNextIndex ? [] : {};
      }
      cur = cur[segment];
    } else {
      if (cur[segment] == null) {
        cur[segment] = isNextIndex ? [] : {};
      }
      cur = cur[segment];
    }
  });
}

export function pathToString(path: (string | number)[]): string {
  let out = "";
  for (const seg of path) {
    if (typeof seg === "number") {
      out += `[${seg}]`;
    } else {
      if (out.length === 0) out += seg;
      else out += `.${seg}`;
    }
  }
  return out;
}
