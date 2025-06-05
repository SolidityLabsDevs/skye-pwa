export const revalidate = 0;
import { memo, FC } from 'react';

import { getLoginSession } from 'lib/auth';
import prisma, { prismaExclude } from 'lib/prisma';
import { Session } from 'components/lib/Session';

type SessionProps = unknown;

const Page: FC<SessionProps> = memo(async () => {
  const data = await getLoginSession();
  let user: Record<string, unknown> = {};
  try {
    if (data?.id) {
      user =
        (await prisma.user.findUnique({
          where: {
            id: data?.id as string,
          },
          select: {
            ...prismaExclude('User', ['password']),
            answers: true,
          },
        })) || {};
    }
  } catch {}

  return <Session data={{ ...(data as any), ...user }} />;
});

export default Page;
