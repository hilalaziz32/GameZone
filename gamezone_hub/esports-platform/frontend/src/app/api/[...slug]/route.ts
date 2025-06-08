// app/api/[...slug]/route.js
import { NextResponse } from 'next/server';

export async function POST(req, { params }) {
  const url = process.env.FASTAPI_URL || 'http://localhost:8000';
  const path = params.slug.join('/');
  const body = await req.text();
  const res = await fetch(`${url}/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': req.headers.get('content-type') },
    body,
    credentials: 'include',
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function GET(req, { params }) {
  const url = process.env.FASTAPI_URL || 'http://localhost:8000';
  const path = params.slug.join('/');
  const res = await fetch(`${url}/${path}`, {
    method: 'GET',
    headers: { cookie: req.headers.get('cookie') },
    credentials: 'include',
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}