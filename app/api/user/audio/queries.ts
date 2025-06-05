import { Prisma } from '@prisma/client';
import prisma from 'lib/prisma';

export const getTracks = async (limit = 10, offset = 0, search = '', userId = '') => {
  const answers = await prisma.answers.findFirst({
    where: {
      userId,
    },
  });

  if (!answers) {
    return {
      list: [],
      count: 0,
    };
  }

  const OR = [];
  if (answers.question_1) {
    OR.push({
      show_for_answers_question_1: {
        has: answers.question_1,
      },
    });
  }

  if (answers.question_2) {
    OR.push({
      show_for_answers_question_2: {
        has: answers.question_2,
      },
    });
  }

  if (answers.question_4?.length === 2) {
    OR.push(
      {
        show_for_answers_question_4: {
          has: answers.question_4?.[0],
        },
      },
      {
        show_for_answers_question_4: {
          has: answers.question_4?.[1],
        },
      }
    );
  }

  if (answers.question_5) {
    OR.push({
      show_for_answers_question_5: {
        has: answers.question_5,
      },
    });
  }

  if (answers.question_6) {
    OR.push({
      show_for_answers_question_6: {
        has: answers.question_6,
      },
    });
  }

  if (answers.question_7) {
    OR.push({
      show_for_answers_question_7: {
        has: answers.question_7,
      },
    });
  }

  if (answers.question_8) {
    OR.push({
      show_for_answers_question_8: {
        has: answers.question_8,
      },
    });
  }

  if (answers.question_9) {
    OR.push({
      show_for_answers_question_9: {
        has: answers.question_9,
      },
    });
  }

  const query: Prisma.AudioFindManyArgs = {
    where: {
      OR,
    },
    take: limit,
    skip: offset,
    orderBy: {
      created_at: 'desc' as const,
    },
    include: {
      audioCoverImage: true,
    },
    omit: {
      show_for_answers_question_1: true,
      show_for_answers_question_2: true,
      show_for_answers_question_3: true,
      show_for_answers_question_4: true,
      show_for_answers_question_5: true,
      show_for_answers_question_6: true,
      show_for_answers_question_7: true,
      show_for_answers_question_8: true,
      show_for_answers_question_9: true,
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
