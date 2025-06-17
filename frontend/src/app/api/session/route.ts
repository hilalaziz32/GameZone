import { NextResponse } from 'next/server';
import { getUserSession } from '../../../../actions/auth';

export async function GET() {
  const session = await getUserSession();
  if (!session?.user) {
    return NextResponse.json({ user: null });
  }
  return NextResponse.json({ user: session.user });
}
