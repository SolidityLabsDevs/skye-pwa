import { getLoginSession } from 'lib/auth';
import mailer from 'lib/mailer';
import prisma from 'lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const error = NextResponse.error();

  const { email } = await req.json();

  if (!email) {
    return error;
  }

  const code = await prisma.code.create({
    data: {
      email: email,
      value: Math.floor(100_000 + Math.random() * 900_000),
    },
  });

  await mailer({
    to: email,
    subject: 'Your verification code',
    html: `<p>${code?.value}</p>`,
  });

  const res = NextResponse.json('');
  return res;
}

export async function GET() {
  const error = NextResponse.error();
  const session = await getLoginSession();

  if (!session?.email) {
    return error;
  }

  const code = await prisma.code.create({
    data: {
      email: session?.email,
      value: Math.floor(100_000 + Math.random() * 900_000),
    },
  });

  await mailer({
    to: session?.email,
    subject: 'Your verification code',
    html: `<p>${code?.value}</p>`,
  });

  const res = NextResponse.json('');
  return res;
}
