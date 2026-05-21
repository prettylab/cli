import { cookies } from "next/headers";
import message from "@prettylab/api/consts/message";
import prisma from "@prettylab/db/db/db";

type Options = {
  cookieName: string;
  sessionTable: string;
};

export function authLogout({ cookieName, sessionTable }: Options) {
  const POST = async () => {
    const cookiesList = await cookies();
    const sid = cookiesList.get(cookieName)?.value;

    if (sid) {
      // @ts-ignore
      await prisma[sessionTable].update({
        where: { token: sid },
        data: {
          revoked_at: new Date(),
        },
      });
    }

    return new Response(JSON.stringify({ message: message.LOGOUT_SUCCESS }), {
      headers: {
        "Set-Cookie": `${cookieName}=; HttpOnly; Secure; Path=/; Max-Age=0; SameSite=Lax`,
        "Content-Type": "application/json",
      },
    });
  };

  return { POST };
}
