import { NextResponse } from 'next/server';
import { removeLoginSession } from 'lib/auth';

export async function POST() {
  const res = new NextResponse(null, { status: 302 });
  res.headers.set('Location', '/');
  await removeLoginSession(res);
  return res;
}
