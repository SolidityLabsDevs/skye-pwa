export const runtime = 'nodejs';

import { PrismaClient, Prisma } from '@prisma/client';

type GlobalPrisma = PrismaClient & {
  _originalClient?: { _activeProvider?: 'sqlite' | 'postgresql' };
};

let prisma: GlobalPrisma;

interface IGlobal {
  prisma?: GlobalPrisma;
  EdgeRuntime?: unknown;
}

if (process.env.NODE_ENV === 'production' && !(global as IGlobal)?.EdgeRuntime) {
  prisma = new PrismaClient();
} else {
  if (!(global as IGlobal).prisma && !(global as IGlobal)?.EdgeRuntime) {
    (global as IGlobal).prisma = new PrismaClient();
  }
  prisma = (global as IGlobal).prisma as PrismaClient;
}

type A<T extends string> = T extends `${infer U}ScalarFieldEnum` ? U : never;
type Entity = A<keyof typeof Prisma>;
type Keys<T extends Entity> = Extract<
  keyof (typeof Prisma)[keyof Pick<typeof Prisma, `${T}ScalarFieldEnum`>],
  string
>;

export function prismaExclude<T extends Entity, K extends Keys<T>>(type: T, omit: K[]) {
  type Key = Exclude<Keys<T>, K>;
  type TMap = Record<Key, true>;
  const result: TMap = {} as TMap;
  for (const key in Prisma[`${type}ScalarFieldEnum`]) {
    if (!omit.includes(key as K)) {
      result[key as Key] = true;
    }
  }
  return result;
}

export default prisma;
