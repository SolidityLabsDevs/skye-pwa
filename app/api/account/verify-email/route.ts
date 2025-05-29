import { subMinutes } from 'date-fns';
import { getLoginSession } from 'lib/auth';
import mailer from 'lib/mailer';
import prisma from 'lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const session = await getLoginSession();
  const error = NextResponse.error();

  if (!session?.email) {
    return error;
  }

  const code = await prisma.code.create({
    data: {
      email: session?.email as string,
      value: Math.floor(100_000 + Math.random() * 900_000),
    },
  });
  await mailer({
    to: session?.email as string,
    subject: 'Your verification code',
    html: `<p>${code?.value}</p>`,
  });
  const res = NextResponse.json('');
  return res;
}

export async function POST(req: NextRequest) {
  const session = await getLoginSession();
  const error = NextResponse.error();
  const { value } = await req.json();

  if (!session?.email || !value) {
    return error;
  }

  const code = await prisma.code.findFirstOrThrow({
    where: {
      value,
      email: session?.email,
      created_at: {
        gte: subMinutes(new Date(), 15).toISOString(),
      },
    },
  });

  if (code) {
    await prisma.$transaction([
      prisma.user.update({
        where: {
          email: session?.email as string,
        },
        data: {
          email_verified: true,
        },
      }),
      prisma.code.delete({
        where: {
          id: code.id,
        },
      }),
    ]);
  }

  const res = NextResponse.json('');
  return res;
}
