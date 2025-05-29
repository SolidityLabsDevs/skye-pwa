import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { /*getLoginSession,*/ setLoginSession } from 'lib/auth';
import prisma from 'lib/prisma';
import { subMinutes } from 'date-fns';
import { appConfig } from 'config/appConfig';
import { SignInSchema, TSignInSchema } from './schemas';
import { getUniqueUsername } from 'helpers';
import { AuthProviders } from 'types/entities';
import { RateLimiter } from 'lib/rateLimiter';
import { headers } from 'next/headers';

const isSQLite = prisma?._originalClient?._activeProvider === 'sqlite';

const rateLimiter = new RateLimiter({ windowSize: 60000, maxRequests: 5 });

const CODE_VALID_TIME_MINUTES = 15;

export async function POST(req: NextRequest) {
  const headersList = await headers();
  const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown';
  const isRateLimited = rateLimiter.limit(ip);

  if (isRateLimited)
    return NextResponse.json(
      { error: 'Rate limited. Try again after some time.' },
      { status: 429 }
    );

  const body: TSignInSchema = await req.json();

  const isValid = (await SignInSchema.safeParse(body)).success;

  const { email, password, mobile, code: authCode, verificationCode } = body;
  verificationCode;

  if (!isValid && !authCode) {
    return NextResponse.json({ error: 'Invalid submission data and code' }, { status: 500 });
  }

  let user = await prisma.user.findFirst({
    where: {
      email: {
        equals: isSQLite ? email.toLowerCase() : email,
        ...(isSQLite ? {} : { mode: 'insensitive' }),
      },
    },
  });

  if (authCode) {
    const verifyCode = await prisma.code.findFirst({
      where: {
        value: +authCode,
        email: {
          equals: isSQLite ? email.toLowerCase() : email,
          ...(isSQLite ? {} : { mode: 'insensitive' }),
        },
        created_at: {
          gte: subMinutes(new Date(), CODE_VALID_TIME_MINUTES).toISOString(),
        },
      },
    });

    if (verifyCode) {
      await prisma.code.delete({
        where: {
          id: verifyCode.id,
          email,
        },
      });
    }

    if (!verifyCode) return NextResponse.json({ error: 'Invalid code' }, { status: 500 });
  }

  if (user?.id) {
    if (!authCode) {
      const verified = await bcrypt.compare(password, user?.password as string);
      if (!verified)
        return NextResponse.json({ error: 'User verification failed' }, { status: 500 });
    }
  } else {
    if (!authCode)
      return NextResponse.json(
        { error: 'Not found email, password, or auth code' },
        { status: 500 }
      );

    const name = email.toLowerCase().split('@')[0];
    const username = await getUniqueUsername(name);

    user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        name,
        username,
      },
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

  // "Connect existing account" feature
  // const session = await getLoginSession();
  // if (session?.id && user?.id !== session?.id) {
  //   const verifyCode = await prisma.code.findFirst({
  //     where: {
  //       value: +(verificationCode || 0),
  //       email: {
  //         equals: isSQLite ? session?.email?.toLowerCase() : session?.email,
  //         ...(isSQLite ? {} : { mode: 'insensitive' }),
  //       },
  //       created_at: {
  //         gte: subMinutes(new Date(), CODE_VALID_TIME_MINUTES).toISOString(),
  //       },
  //     },
  //   });

  //   if (verifyCode) {
  //     await prisma.code.delete({
  //       where: {
  //         id: verifyCode.id,
  //         email: session?.email,
  //       },
  //     });
  //   }

  //   if (!verifyCode) return NextResponse.json({ error: 'Invalid code' }, { status: 500 });

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
