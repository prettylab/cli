import message, { matchMessageMeta } from "@prettylab/api/consts/message";

export const GETReadSuccessResponse = (data: any) => {
  return Response.json(
    { message: message.OK, data },
    { status: matchMessageMeta[message.OK].code },
  );
};
