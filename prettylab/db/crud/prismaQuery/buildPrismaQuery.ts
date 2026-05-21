import {
  BelongsTo,
  CrudConfig,
  HasMany,
  HasOne,
} from "@prettylab/db/db/utils/types";
import { BuiltParams } from "@prettylab/db/crud/queryParams/buildParams";
import { buildContainsWhereFromPath } from "@prettylab/db/crud/prismaQuery/utils";

const buildWhere = (
  cfg: CrudConfig,
  built: BuiltParams,
): Record<string, any> => {
  const AND: any[] = [];

  if (cfg.filtersConfig?.search && built.search && cfg.search?.length) {
    const raw = built.search.trim();
    if (!raw) return {};

    const isNumeric = /^\d+$/.test(raw);
    const numericId = isNumeric ? Number(raw) : null;

    const colsOrPaths = cfg.search.filter((c) => c !== "id");
    const tokens = raw.split(/\s+/).filter(Boolean);

    AND.push({
      OR: [
        ...(numericId !== null ? [{ id: numericId }] : []),

        ...colsOrPaths
          .map((p) => buildContainsWhereFromPath(p, raw, cfg.listHints))
          .filter(Boolean),

        ...(tokens.length && colsOrPaths.length
          ? [
              {
                AND: tokens.map((t) => ({
                  OR: colsOrPaths
                    .map((p) => buildContainsWhereFromPath(p, t, cfg.listHints))
                    .filter(Boolean),
                })),
              },
            ]
          : []),
      ],
    });
  }

  if (!cfg.disableSoftDelete) {
    AND.push({
      deleted_at: null,
    });
  }

  if (cfg.filtersConfig?.customParams && cfg.customParams?.length) {
    for (const def of cfg.customParams) {
      const paramName =
        typeof def === "string" ? def : (def.param ?? def.column ?? undefined);
      const columnName =
        typeof def === "string" ? def : (def.column ?? def.param ?? undefined);

      if (!paramName || !columnName) continue;

      const value = built.searchParams.get(paramName);
      if (value == null || value === "") continue;

      if (value === "not null") {
        AND.push({ [columnName]: { not: null } });
        continue;
      }

      const parsedValue =
        value === "true"
          ? true
          : value === "false"
            ? false
            : Number.isFinite(Number(value))
              ? Number(value)
              : value === "null"
                ? null
                : value;

      AND.push({ [columnName]: parsedValue });
    }
  }

  if (!built.includeIds.length && AND.length) {
    return { AND };
  }

  if (built.includeIds.length && !AND.length) {
    return { id: { in: built.includeIds } };
  }

  if (built.includeIds.length && AND.length) {
    return { OR: [{ AND }, { id: { in: built.includeIds } }] };
  }

  return { AND };
};

const buildOrderBy = (
  cfg: CrudConfig,
  built: BuiltParams,
): Record<string, any>[] => {
  if (!cfg.filtersConfig?.order) return [];
  if (!built.orderBy) return [];
  return [
    {
      [built.orderBy]: built.orderDir,
    },
  ];
};

const buildSelect = (cfg: CrudConfig): Record<string, any> => {
  const select: Record<string, any> = {};

  for (const col of cfg.selectable) {
    select[col] = true;
  }

  if (!cfg.filtersConfig?.relations || !cfg.relations?.length) {
    return select;
  }

  for (const rel of cfg.relations) {
    if (rel.type === "belongsTo") {
      select[rel.alias] = buildBelongsToSelect(rel);
    } else if (rel.type === "hasMany") {
      select[rel.alias] = buildHasManySelect(rel, cfg);
    } else if (rel.type === "hasOne") {
      select[rel.alias] = buildHasOneSelect(rel, cfg);
    }
  }

  return select;
};

const buildBelongsToSelect = (rel: BelongsTo) => {
  const select: Record<string, boolean> = {};
  for (const col of rel.selectable) {
    select[col] = true;
  }
  return { select };
};

const buildHasManySelect = (rel: HasMany, cfg: CrudConfig) => {
  const select: Record<string, boolean> = {};
  for (const col of rel.selectable) {
    select[col] = true;
  }
  const include: any = {
    select,
    ...(!cfg.disableSoftDelete && { where: { deleted_at: null } }),
  };

  if (rel.orderBy) {
    include.orderBy = {
      [rel.orderBy]: rel.orderDir ?? "asc",
    };
  }

  if (typeof rel.limitPerParent === "number") {
    include.take = rel.limitPerParent;
  }

  return include;
};

const buildHasOneSelect = (rel: HasOne, cfg: CrudConfig) => {
  const select: Record<string, boolean> = {};
  for (const col of rel.selectable) {
    select[col] = true;
  }
  const include: any = {
    select,
    ...(!cfg.disableSoftDelete && { where: { deleted_at: null } }),
  };

  if (rel.orderBy) {
    include.orderBy = {
      [rel.orderBy]: rel.orderDir ?? "asc",
    };
  }

  include.take = 1;
  return include;
};

export const buildPrismaQuery = (params: BuiltParams, cfg: CrudConfig): any => {
  const where = buildWhere(cfg, params);
  const orderBy = buildOrderBy(cfg, params);
  const select = buildSelect(cfg);

  const args: any = {
    where,
    select,
  };

  if (cfg.filtersConfig?.limit !== false && params.limit !== -1) {
    args.take = params.limit;
    args.skip = params.offset;
  }

  if (orderBy.length) {
    args.orderBy = orderBy;
  }

  return args;
};
