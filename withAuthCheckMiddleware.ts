import { NextRequest } from "next/server";

type Options = {
  cookieName: string;
  url: string;
};

export const withAuthCheckMiddleware = async (
  req: NextRequest,
  { cookieName, url }: Options,
) => {
  const sid = req.cookies.get(cookieName)?.value;
  if (!sid) {
    return false;
  }

  const check = await fetch(url, {
    headers: { Authorization: `Bearer ${sid}` },
    cache: "no-store",
  });

  if (!check.ok) {
    return false;
  }

  const { user } = await check.json();
  return user;
};
