import message, { matchMessageMeta } from "@prettylab/api/consts/message";

export const DELETENotFoundResponse = () => {
  return Response.json(
    { message: message.NOT_FOUND },
    { status: matchMessageMeta[message.NOT_FOUND].code },
  );
};
