import message, { matchMessageMeta } from "@prettylab/api/consts/message";

export const POSTErrorResponse = (data?: Array<any>) => {
  return Response.json(
    { message: message.CREATE_ERROR, ...(data && { data }) },
    { status: matchMessageMeta[message.CREATE_ERROR].code },
  );
};
