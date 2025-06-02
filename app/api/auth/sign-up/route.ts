import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { getLoginSession, setLoginSession } from 'lib/auth';
import prisma from 'lib/prisma';
import { getUniqueUsername } from 'helpers';
import { Prisma } from '@prisma/client';
import { appConfig } from 'config/appConfig';
import { SignUpSchema, TSignUpSchema } from './schemas';
import { AuthProviders } from 'types/entities';
import { subMinutes } from 'date-fns';
import { RateLimiter } from 'lib/rateLimiter';
import { headers } from 'next/headers';

const isSQLite = prisma?._originalClient?._activeProvider === 'sqlite';

const rateLimiter = new RateLimiter({ windowSize: 60000, maxRequests: 5 });

export async function POST(req: NextRequest) {
  const headersList = await headers();
  const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown';
  const isRateLimited = rateLimiter.limit(ip);

  if (isRateLimited)
    return NextResponse.json(
      { error: 'Rate limited. Try again after some time.' },
      { status: 429 }
    );

  const body: TSignUpSchema = await req.json();

  const isValid = (await SignUpSchema.safeParse(body)).success;

  const { email, password, name, mobile, verificationCode } = body;

  // "Connect new account" feature
  const session = await getLoginSession();
  if (verificationCode && session?.id) {
    const verifyCode = await prisma.code.findFirst({
      where: {
        value: +(verificationCode || 0),
        email: {
          equals: isSQLite ? session?.email?.toLowerCase() : session?.email,
          ...(isSQLite ? {} : { mode: 'insensitive' }),
        },
        created_at: {
          gte: subMinutes(new Date(), 10).toISOString(),
        },
      },
    });

    if (verifyCode) {
      await prisma.code.delete({
        where: {
          id: verifyCode.id,
          email: session?.email,
        },
      });
    }

    if (!verifyCode) return NextResponse.json({ error: 'Invalid code' }, { status: 500 });
  }

  if (!isValid)
    return NextResponse.json({ error: 'Submission data is not valid.' }, { status: 500 });

  let user = await prisma.user.findFirst({
    where: {
      email: {
        equals: isSQLite ? email.toLowerCase() : email,
        ...(isSQLite ? {} : { mode: 'insensitive' }),
      },
    },
  });

  if (user?.id) {
    return NextResponse.json({ error: 'User already exists. Sign in instead.' }, { status: 500 });
  } else {
    const params: Prisma.UserCreateInput = {
      email: email.toLowerCase(),
      email_verified: false,
      name,
    };

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const safe_password = await bcrypt.hash(password, salt);
      params.password = safe_password;
    }
    if (name) {
      const username = await getUniqueUsername(name);
      params.username = username;
    }

    user = await prisma.user.create({
      data: params,
    });
  }

  if (!isSQLite || !appConfig.IS_PROD) {
    await prisma.account.upsert({
      where: {
        provider: AuthProviders.jwt,
        providerAccountId: user.id,
        userId: user.id,
      },
      create: {
        provider: AuthProviders.jwt,
        providerAccountId: user.id,
        userId: user.id,
      },
      update: {
        provider: AuthProviders.jwt,
        providerAccountId: user.id,
      },
    });
  }

  // "Connect new account" feature
  // if (session?.id && user?.id !== session?.id) {
  //   const [alreadyConnected, alreadyConnected2] = await prisma.$transaction([
  //     prisma.user.findFirst({
  //       where: {
  //         id: session?.id,
  //         connectedAccounts: {
  //           some: {
  //             id: user?.id,
  //           },
  //         },
  //       },
  //     }),
  //     prisma.user.findFirst({
  //       where: {
  //         id: user?.id,
  //         connectedAccounts: {
  //           some: {
  //             id: session?.id,
  //           },
  //         },
  //       },
  //     }),
  //   ]);

  //   if (alreadyConnected?.id && alreadyConnected2?.id) {
  //     return NextResponse.json({ error: 'Accounts already connected.' }, { status: 500 });
  //   }

  //   const [, connectedUser] = await prisma.$transaction([
  //     prisma.user.update({
  //       where: { id: session?.id },
  //       data: { connectedAccounts: { connect: [{ id: user?.id }] } },
  //     }),
  //     prisma.user.update({
  //       where: { id: user?.id },
  //       data: { connectedAccounts: { connect: [{ id: session?.id }] } },
  //       select: {
  //         id: true,
  //         name: true,
  //         image: true,
  //       },
  //     }),
  //   ]);

  //   return NextResponse.json(connectedUser);
  // } else if (session?.id && user?.id === session?.id) {
  //   return NextResponse.json({ error: 'Connect another account, not current.' }, { status: 500 });
  // }

  const metadata = {
    email,
    id: user?.id,
    name: user?.name,
    username: user?.username,
    locale: user?.locale,
    role: user?.role,
    email_verified: user?.email_verified,
  };

  const res = new NextResponse();
  const token = await setLoginSession(res, metadata);
  return mobile ? NextResponse.json({ token }) : res;
}
