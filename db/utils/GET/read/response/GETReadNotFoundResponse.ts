import message, { matchMessageMeta } from "@prettylab/api/consts/message";

export const GETReadNotFoundResponse = () => {
  return Response.json(
    { message: message.NOT_FOUND },
    { status: matchMessageMeta[message.NOT_FOUND].code },
  );
};
