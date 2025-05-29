import prisma from 'lib/prisma';
import { toKebabCase } from 'utils';
import latinize from 'latinize';

export const getUniqueUsername = async (username: string): Promise<string> => {
  username = latinize(username).toLowerCase();
  username = username.replace(/[^a-zA-Z0-9_.-]*/g, ''); // allowed only: numbers, letters, "_" "." "-" symbols

  const withKebab = toKebabCase(username);

  const exists = await prisma.user.findUnique({ where: { username: withKebab } });

  const withPrefixAndKebab = `${Math.floor(100_000 + Math.random() * 900_000)}-${toKebabCase(
    username
  )}`;

  if (exists?.id) {
    return getUniqueUsername(withPrefixAndKebab);
  } else {
    return withKebab as string;
  }
};
