import { NextRequest, NextResponse } from "next/server";

export const includeHeaders = (req: NextRequest, session?: false | any) => {
  const res = NextResponse.next();
  res.headers.set("Origin", req.nextUrl.origin);
  res.headers.set("x-url", req.url);
  res.headers.set("x-pathname", req.nextUrl.pathname);

  if (session) {
    res.headers.set("x-user-id", String(session.id));
    res.headers.set("x-user-email", session.email);
  }

  return res;
};
