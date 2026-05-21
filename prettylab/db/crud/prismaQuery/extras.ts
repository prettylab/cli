type AnyFindManyArgs = {
  where?: any;
  select?: any;
  orderBy?: any;
};

export const addWhere = <T extends AnyFindManyArgs, W extends object>(
  prismaQuery: T,
  extraWhere: W,
): T & { where: any } => {
  const prevWhere = prismaQuery.where;

  prismaQuery.where = prevWhere ? { AND: [prevWhere, extraWhere] } : extraWhere;

  return prismaQuery as T & { where: any };
};

export const addSelect = <
  T extends AnyFindManyArgs,
  S extends Record<string, any>,
>(
  prismaQuery: T,
  extraSelect: S,
): T & { select: T["select"] & S } => {
  const prevSelect = (prismaQuery.select ?? {}) as Record<string, any>;

  prismaQuery.select = {
    ...prevSelect,
    ...extraSelect,
  };

  return prismaQuery as T & { select: T["select"] & S };
};

export const addOrderBy = <T extends AnyFindManyArgs, O extends object>(
  prismaQuery: T,
  extraOrderBy: O,
): T & { orderBy: any } => {
  const prev = prismaQuery.orderBy;

  prismaQuery.orderBy = prev
    ? Array.isArray(prev)
      ? [...prev, extraOrderBy]
      : [prev, extraOrderBy]
    : extraOrderBy;

  return prismaQuery as T & { orderBy: any };
};

export const addRelationSelect = <
  T extends AnyFindManyArgs,
  S extends Record<string, any>,
>(
  prismaQuery: T,
  relationName: string,
  extraRelationSelect: S,
): T & { select: any } => {
  const prevSelect = (prismaQuery.select ?? {}) as Record<string, any>;
  const prevRelation = (prevSelect[relationName] ?? {}) as any;

  const prevRelationSelect =
    prevRelation && typeof prevRelation === "object" && "select" in prevRelation
      ? (prevRelation.select as Record<string, any>)
      : {};

  prismaQuery.select = {
    ...prevSelect,
    [relationName]: {
      ...(typeof prevRelation === "object" ? prevRelation : {}),
      select: {
        ...prevRelationSelect,
        ...extraRelationSelect,
      },
    },
  };

  return prismaQuery as T & { select: any };
};
