import { NextRequest, NextResponse } from "next/server";

type Options = {
  message: string;
  url: string;
  code: number;
};

export const redirect = (req: NextRequest, { message, url, code }: Options) => {
  if (isJsonExpected(req)) {
    return new NextResponse(JSON.stringify({ message }), {
      status: code,
      headers: { "Content-Type": "application/json" },
    });
  }

  return NextResponse.redirect(new URL(url, req.url));
};

export const isJsonExpected = (req: NextRequest) => {
  const accept = req.headers.get("accept") || "";
  return accept.includes("application/json");
};
