// app/api/signin/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const res = await fetch(`${process.env.FASTAPI_URL}/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: body.email,
      password: body.password,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json({ error: data.detail }, { status: res.status });
  }

  // Set access token in cookie
  if (data.access_token) {
    const response = NextResponse.json({ success: true });
    response.cookies.set("access_token", data.access_token, { path: "/" });
    return response;
  }

  return NextResponse.json({ error: "Unknown error" }, { status: 500 });
}
