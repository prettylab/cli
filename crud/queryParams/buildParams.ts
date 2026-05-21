import { CrudConfig } from "@prettylab/db/db/utils/types";

export type BuiltParams = {
  search: string;
  limit: number;
  page: number;
  offset: number;
  orderBy: string;
  orderDir: "asc" | "desc";
  includeIds: number[];
  searchParams: URLSearchParams;
};

export const buildParams = (req: Request, cfg: CrudConfig): BuiltParams => {
  const maxLimit = cfg.maxLimit ?? 100;
  const defaultOrderBy = cfg.defaultOrderBy ?? "id";
  const defaultOrderDir = cfg.defaultOrderDir ?? "desc";

  const { searchParams } = new URL(req.url);
  const search = searchParam(searchParams);
  const limit = limitParam(searchParams, maxLimit);
  const page = pageParam(searchParams);
  const offset = offsetParam(page, limit);
  const orderBy = orderByParam(searchParams, defaultOrderBy);
  const orderDir = orderDirParam(searchParams, defaultOrderDir);
  const includeIds = includeIdsParam(searchParams);

  return {
    search,
    limit,
    page,
    offset,
    orderBy,
    orderDir,
    includeIds,
    searchParams,
  };
};

const searchParam = (searchParams: any) => {
  return searchParams.get("q") ?? "";
};

const limitParam = (searchParams: any, maxLimit: number) => {
  return Math.min(Number(searchParams.get("limit") ?? 20), maxLimit);
};

const pageParam = (searchParams: any) => {
  return Math.max(Number(searchParams.get("page") ?? 1), 1);
};

const offsetParam = (page: number, limit: number) => {
  return (page - 1) * limit;
};

const orderByParam = (searchParams: any, defaultOrderBy: string) => {
  return searchParams.get("orderBy") ?? defaultOrderBy;
};

const orderDirParam = (searchParams: any, defaultOrderDir: string) => {
  return (searchParams.get("orderDir") ?? defaultOrderDir).toLowerCase() ===
    "desc"
    ? "desc"
    : "asc";
};

const includeIdsParam = (searchParams: any) => {
  return (
    searchParams
      .getAll("include_ids[]")
      .flatMap((v: any) => v.split(","))
      .map((v: any) => Number(v.trim()))
      .filter((v: any) => Number.isInteger(v)) ?? []
  );
};
