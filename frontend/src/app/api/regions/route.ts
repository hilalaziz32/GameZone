import { NextResponse } from "next/server";

export async function GET() {
  const apiRes = await fetch("http://localhost:8000/regions", {
    method: "GET",
  });

  const data = await apiRes.json();
  return NextResponse.json(data, { status: apiRes.status });
}