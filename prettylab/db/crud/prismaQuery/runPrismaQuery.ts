import { CrudConfig } from "@prettylab/db/db/utils/types";

type ModelDelegate = {
  findMany(args: any): Promise<any[]>;
  count(args: any): Promise<number>;
};

export const runPrismaQuery = async (
  model: ModelDelegate,
  prismaQuery: any,
  cfg: CrudConfig,
) => {
  const [rows, total] = await Promise.all([
    model.findMany(prismaQuery),
    model.count({ where: prismaQuery.where }),
  ]);

  const data = rows.map((row: any) => {
    const keys =
      cfg.relations
        ?.filter((rel: any) => rel.type === "hasOne")
        ?.map((rel) => rel.alias) || [];

    return {
      ...row,
      ...Object.fromEntries(
        keys?.map((key: any) => [
          key,
          (row[key] as any[] | null | undefined)?.[0] ?? null,
        ]),
      ),
    };
  });

  return { data, count: total };
};
