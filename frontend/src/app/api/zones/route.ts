import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const token = (await cookies()).get("token")?.value;
  const body = await req.json();

  const apiRes = await fetch(`${process.env.FASTAPI_URL}/zones/zones`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  // Safe JSON parsing: never throw on empty or invalid JSON
  let data;
  try {
    const text = await apiRes.text();
    data = text ? JSON.parse(text) : {};
  } catch {
    data = {};
  }

  return NextResponse.json(data, { status: apiRes.status });
}
