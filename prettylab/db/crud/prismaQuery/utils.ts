import { ListHint } from "@prettylab/db/db/utils/types";

export const buildContainsWhereFromPath = (
  path: string,
  value: string,
  listHints?: ListHint,
) => {
  const parts = path.split(".").filter(Boolean);

  const leaf = parts.pop();
  if (!leaf) return null;

  let node: any = { [leaf]: { contains: value } };

  for (let i = parts.length - 1; i >= 0; i--) {
    const key = parts[i];

    const listOp = listHints?.[key];
    if (listOp) {
      node = { [key]: { [listOp]: node } };
    } else {
      node = { [key]: node };
    }
  }

  return node;
};
