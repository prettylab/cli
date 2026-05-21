import message, { matchMessageMeta } from "@prettylab/api/consts/message";

export const GETListErrorResponse = () => {
  return Response.json(
    { message: message.INTERNAL_SERVER_ERROR },
    { status: matchMessageMeta[message.INTERNAL_SERVER_ERROR].code },
  );
};
