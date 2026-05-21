import message, { matchMessageMeta } from "@prettylab/api/consts/message";
import prisma from "@prettylab/db/db/db";

type Options = {
  sessionTable: string;
  userTable: string;
};

export const authCheck = ({ sessionTable, userTable }: Options) => {
  const GET = async (req: Request) => {
    const auth = req.headers.get("authorization");

    if (!auth?.startsWith("Bearer ")) {
      return Response.json(
        { message: message.NO_TOKEN_PROVIDED },
        { status: matchMessageMeta[message.NO_TOKEN_PROVIDED].code },
      );
    }

    const token = auth.substring("Bearer ".length);

    // @ts-ignore
    const session = await prisma[sessionTable].findUnique({
      where: { token },
      select: {
        expires_at: true,
        [userTable]: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });

    if (!session) {
      return Response.json(
        { message: message.SESSION_INVALID },
        { status: matchMessageMeta[message.SESSION_INVALID].code },
      );
    }

    if (session.expiresAt && new Date(session.expiresAt) < new Date()) {
      return Response.json(
        { message: message.SESSION_EXPIRED },
        { status: matchMessageMeta[message.SESSION_EXPIRED].code },
      );
    }

    return Response.json(
      {
        message: message.OK,
        user: {
          id: session.user.id,
          email: session.user.email,
        },
      },
      { status: matchMessageMeta[message.OK].code },
    );
  };

  return { GET };
};
