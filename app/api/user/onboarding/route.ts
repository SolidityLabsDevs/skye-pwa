import { getLoginSession } from 'lib/auth';
import prisma from 'lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const session = await getLoginSession();
  const error = NextResponse.error();

  if (session?.role !== 'USER') return error;

  const { db_prop, value } = await req.json();

  if (!db_prop || !value) return error;

  await prisma.answers.upsert({
    where: {
      userId: session?.id,
    },
    create: {
      userId: session?.id,
      [db_prop]: value,
    },
    update: {
      [db_prop]: value,
    },
  });

  return NextResponse.json(null);
}
