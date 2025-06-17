// app/api/signup/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  // Call your FastAPI backend
  const res = await fetch(`${process.env.FASTAPI_URL}/auth/signup`, {
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
  return NextResponse.json({ success: true });
}
