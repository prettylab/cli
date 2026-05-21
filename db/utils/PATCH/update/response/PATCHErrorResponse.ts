import message, { matchMessageMeta } from "@prettylab/api/consts/message";

export const PATCHErrorResponse = (data?: Array<any>) => {
  return Response.json(
    { message: message.UPDATE_ERROR, ...(data && { data }) },
    { status: matchMessageMeta[message.UPDATE_ERROR].code },
  );
};
