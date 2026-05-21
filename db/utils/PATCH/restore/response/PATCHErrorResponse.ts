import message, { matchMessageMeta } from "@prettylab/api/consts/message";

export const PATCHErrorResponse = () => {
  return Response.json(
    { message: message.UPDATE_ERROR },
    { status: matchMessageMeta[message.UPDATE_ERROR].code },
  );
};
