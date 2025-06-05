import { NextRequest, NextResponse } from 'next/server';
import { getTracks } from './queries';
import { getLoginSession } from 'lib/auth';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const error = NextResponse.error();

  const session = await getLoginSession();
  if (session?.role !== 'USER') return error;

  const limit = searchParams.get('limit') || 20;
  const offset = searchParams.get('offset') || 0;
  const search = searchParams.get('search') || '';

  const list = await getTracks(+limit, +offset, search, session?.id);
  if (!list) return error;

  const res = NextResponse.json(list);
  return res;
}
