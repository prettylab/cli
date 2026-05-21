import message, { matchMessageMeta } from "@prettylab/api/consts/message";

export const DELETESuccessResponse = () => {
  return Response.json(
    { message: message.DELETE_SUCCESS },
    { status: matchMessageMeta[message.DELETE_SUCCESS].code },
  );
};
