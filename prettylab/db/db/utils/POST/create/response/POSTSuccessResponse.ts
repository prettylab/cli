import message, { matchMessageMeta } from "@prettylab/api/consts/message";

export const POSTSuccessResponse = (data: any) => {
  return Response.json(
    { message: message.CREATE_SUCCESS, ...(data && { data }) },
    { status: matchMessageMeta[message.CREATE_SUCCESS].code },
  );
};
