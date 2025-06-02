import { NextRequest, NextResponse } from 'next/server';
import { getTracks } from './queries';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const error = NextResponse.error();

  const limit = searchParams.get('limit') || 20;
  const offset = searchParams.get('offset') || 0;
  const search = searchParams.get('search') || '';

  const list = await getTracks(+limit, +offset, search);
  if (!list) return error;

  const res = NextResponse.json(list);
  return res;
}
