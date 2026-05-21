import crypto from "crypto";
import message, { matchMessageMeta } from "@prettylab/api/consts/message";
import prisma from "@prettylab/db/db/db";
import { verifyPassword } from "@prettylab/db/utils/verifyPassword";

type Options = {
  cookieName: string;
  sessionTable: string;
  userTable: string;
  ttl: number;
};

export function authLogin({
  cookieName,
  sessionTable,
  userTable,
  ttl,
}: Options) {
  const POST = async (req: Request) => {
    const { email, password } = await req.json();

    // @ts-ignore
    const user = await prisma[userTable].findUnique({
      where: { email },
      select: { id: true, password: true, email: true },
    });

    if (!user) {
      return Response.json(
        { message: message.INVALID_CREDENTIALS },
        { status: matchMessageMeta[message.INVALID_CREDENTIALS].code },
      );
    }

    const ok = await verifyPassword(password, user.password);
    if (!ok) {
      return Response.json(
        { message: message.INVALID_CREDENTIALS },
        { status: matchMessageMeta[message.INVALID_CREDENTIALS].code },
      );
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + ttl * 1000);

    // @ts-ignore
    const session = await prisma[sessionTable].create({
      data: {
        user_id: user.id,
        token,
        expires_at: expiresAt,
      },
    });

    if (!session) {
      return Response.json(
        { message: message.INTERNAL_SERVER_ERROR },
        { status: matchMessageMeta[message.INTERNAL_SERVER_ERROR].code },
      );
    }

    return new Response(
      JSON.stringify({
        message: message.LOGIN_SUCCESS,
        user: { id: user.id, email: user.email },
      }),
      {
        headers: {
          "Set-Cookie": `${cookieName}=${token}; HttpOnly; Secure; Path=/; SameSite=Lax; Max-Age=${ttl}`,
          "Content-Type": "application/json",
        },
      },
    );
  };

  return { POST };
}
