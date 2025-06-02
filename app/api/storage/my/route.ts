import { Prisma } from '@prisma/client';
import { getLoginSession } from 'lib/auth';
import prisma from 'lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const session = await getLoginSession();
  if (!session?.id) return NextResponse.json({ error: 'Not authorized' }, { status: 500 });

  const { searchParams } = new URL(req.url);

  const limit = searchParams.get('limit') || 20;
  const offset = searchParams.get('offset') || 0;
  const search = searchParams.get('search') || '';

  const query: Prisma.StorageFindManyArgs = {
    where: {
      AND: [
        { userId: session?.id },
        {
          OR: [
            {
              name: {
                contains: search,
              },
            },
            {
              type: {
                contains: search,
              },
            },
          ],
        },
      ],
    },
    skip: +offset,
    take: +limit,
  };

  const [list, count] = await prisma.$transaction([
    prisma.storage.findMany(query),
    prisma.storage.count({ where: query.where }),
  ]);

  return NextResponse.json({ list, count });
}
