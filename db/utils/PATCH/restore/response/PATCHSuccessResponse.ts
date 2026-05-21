import message, { matchMessageMeta } from "@prettylab/api/consts/message";

export const PATCHSuccessResponse = () => {
  return Response.json(
    { message: message.UPDATE_SUCCESS },
    { status: matchMessageMeta[message.UPDATE_SUCCESS].code },
  );
};
