import { ValidationSchema } from "@prettylab/db/crud/validation/utils/types";

export type IdPromise = { params: Promise<{ id: string }> };
export type TokenPromise = { params: Promise<{ token: string }> };
export type Relation = BelongsTo | HasMany | HasOne;

export const RESERVED_PARAMS = new Set([
  "search",
  "limit",
  "page",
  "orderBy",
  "orderDir",
]);

export type MetaData = {
  // Default return on list response
  page: number; // Current page
  limit: number; // Current limit set
  count: number; // Count of all rows in current query
};

// CONFIG
export type CrudConfig = {
  selectable: readonly string[]; // Array of columns which are returned on list and read requests e.g. ['id', 'name']
  search?: readonly string[]; // Array of columns which are being used to search on ?q=<query> list request e.g. ['name']
  listHints?: ListHint; // Hints for prisma which relations it should use on list request
  defaultOrderBy?: string; // Default order by column on list request e.g. 'created_at'
  defaultOrderDir?: "asc" | "desc"; // Default order direction on list request e.g. 'asc'
  maxLimit?: number; // Max number of returned rows ?limit=500 list request e.g. 200
  relations?: readonly Relation[]; // Relation definition on list and read, look at relations definition below. Remember to set it "as const" in definition
  filtersConfig?: FiltersConfig; // List request query params config (enable/disable features), look at filters config definition below
  customParams?: Array<CustomParams>; // List of custom params e.g. ?is_solo=1 searches for value 1 in is_solo config
  softDeleteColumn?: string; // Name of column which is used to validate is row deleted
  validation?: ValidationSchema; // Validation schema used on create and update requests
  disableSoftDelete?: boolean; // When true, delete request permanently deletes row instead of setting deleted_at column to current date
};

export type ListHint = Record<string, "some" | "every" | "none">;

// RELATIONS
export type BelongsTo = {
  type: "belongsTo";
  table: string; // Name of destination table e.g. 'participants'
  alias: string; // Alias of above table e.g. 'part'
  localKey: string; // Column of local table which points to relation e.g. 'participant_id'
  foreignKey: string; // Column of relation table primary key e.g. 'id'
  selectable: readonly string[]; // Array of columns which should be selected from relation table
};

export type HasMany = {
  type: "hasMany";
  table: string; // Name of table where local table is used as relation e.g. 'formation'
  alias: string; // Alias of above table e.g. 'form'
  foreignKey: string; // Column of relation table where local table is used as relation e.g. 'age_group_id' when local table is 'age_group'
  selectable: readonly string[]; // Array of columns which should be selected from relation table e.g. ['name', 'address']
  orderBy?: string; // Order by column of returned rows where local table id are used e.g. 'created_at'
  orderDir?: "asc" | "desc"; // Order direction e.g. 'asc'
  limitPerParent?: number; // Limit of rows per single id e.g. when limit is set to 2, but id of local table are used 6 times its sliced to first 2 rows
};

export type HasOne = {
  type: "hasOne";
  table: string; // Name of table where local table is used as relation e.g. 'formation'
  alias: string; // Alias of above table e.g. 'form'
  foreignKey: string; // Column of relation table where local table is used as relation e.g. 'age_group_id' when local table is 'age_group'
  selectable: readonly string[]; // Array of columns which should be selected from relation table e.g. ['name', 'address']
  orderBy?: string; // Order by column of returned rows where local table id are used e.g. 'created_at'
  orderDir?: "asc" | "desc"; // Order direction e.g. 'asc'
};

// FILTERS
export type FiltersConfig = {
  search: boolean; // Enables ?q=<query> search query
  limit: boolean; // Enables ?limit=<number> ability to limit rows
  page: boolean; // Enables ?page=<number> ability to change page when limit is set
  relations: boolean; // Enables relations on list and read requests
  order: boolean; // Enables ?orderBy=<string> and ?orderDir=<asc | desc> query params to order results
  customParams: boolean; // Enables customParams e.g. ?is_solo=1 defined in CrudConfig
};

export type CustomParams =
  | string // When string given e.g. 'is_solo' then for query ?is_solo=0 it searches is_solo=0 in database
  | {
      param?: string;
      column?: string;
    }; // When object given e.g. { param: 'name', column: 'formation_name' } then for query ?name=aaa it searches formation_name=aaa in database
