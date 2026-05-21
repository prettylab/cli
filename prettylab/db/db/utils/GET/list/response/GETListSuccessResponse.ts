import { MetaData } from "@prettylab/db/db/utils/types";
import message, { matchMessageMeta } from "@prettylab/api/consts/message";

export const GETListSuccessResponse = (data: any, meta?: MetaData) => {
  return Response.json(
    { message: message.OK, data, ...(meta ? meta : {}) },
    { status: matchMessageMeta[message.OK].code },
  );
};
