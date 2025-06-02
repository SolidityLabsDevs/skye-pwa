import { Prisma } from '@prisma/client';
import prisma from 'lib/prisma';

export const getTracks = async (limit = 10, offset = 0, search = '') => {
  const query: Prisma.AudioFindManyArgs = {
    where: {},
    take: limit,
    skip: offset,
    orderBy: {
      created_at: 'desc' as const,
    },
    include: {
      audioCoverImage: true,
    },
  };

  if (search) {
    query.where = {
      ...query.where,
      OR: [
        {
          title: {
            contains: search,
          },
        },
        {
          description: {
            contains: search,
          },
        },
      ],
    };
  }

  const [list, count] = await prisma.$transaction([
    prisma.audio.findMany(query),
    prisma.audio.count({ where: query.where }),
  ]);

  return {
    list,
    count,
  };
};
