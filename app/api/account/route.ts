import { getLoginSession, removeLoginSession } from 'lib/auth';
import prisma from 'lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { z } from 'zod';

const schema = z
  .object({
    name: z.string().min(1).max(30),
    password: z.string().optional(),
  })
  .strict();

export async function DELETE() {
  const session = await getLoginSession();
  const error = NextResponse.error();

  if (!session?.id) return error;

  await prisma.user.delete({
    where: {
      id: session?.id as string,
    },
  });

  const res = new NextResponse(null, { status: 302 });
  res.headers.set('Location', '/');
  await removeLoginSession(res);

  return res;
}

export async function PATCH(req: NextRequest) {
  const session = await getLoginSession();
  const error = NextResponse.error();

  if (!session?.id) {
    return error;
  }

  const body = await req.json();

  const isValid = (await schema.safeParse(body)).success;

  if (!isValid) return error;

  if (!!body?.password) {
    const salt = await bcrypt.genSalt(10);
    const safe_password = await bcrypt.hash(body?.password, salt);
    body.password = safe_password;
  } else {
    delete body?.password;
  }

  await prisma.user.update({
    where: {
      id: session?.id as string,
    },
    data: body,
  });

  return NextResponse.json(null);
}
