import { User } from '.prisma/generated/client';
import { appConfig } from 'config/appConfig';
import { google } from 'googleapis';
import { getUniqueUsername } from 'helpers';
import { getLoginSession, setLoginSession } from 'lib/auth';
import prisma from 'lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { AuthProviders } from 'types/entities';

const redirectUrl = `${appConfig.SITE_URL}/api/auth/google/callback`;

const isSQLite = prisma?._originalClient?._activeProvider === 'sqlite';

export async function GET(req: NextRequest) {
  const searchParams = new URL(req.url).searchParams;
  const code = searchParams.get('code');
  const state = JSON.parse(searchParams.get('state') || '');

  // if has active session, we will connect that google account to active session account, if it was never connected.
  // if google account connected to another user, throw an error.
  // if no active session, create new user and connect account, or authorize existing user with no logic.
  const session = await getLoginSession();
  const location = state?.backUrl
    ? state?.backUrl
    : session?.id
      ? `/dashboard/${session?.role?.toLowerCase()}/settings/account`
      : '/dashboard';

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_SECRET,
    redirectUrl
  );

  const { tokens } = await oauth2Client.getToken(code as string);
  oauth2Client.setCredentials(tokens);
  if (!tokens) {
    return NextResponse.error();
  }
  const googleUser = JSON.parse(
    Buffer.from((tokens as any).id_token.split('.')[1].split('.')[0], 'base64').toString('ascii')
  );
  // { email, email_verified }
  const { sub, name, locale, email } = googleUser;

  let user: Partial<User> = {};

  const username = await getUniqueUsername(name || email.split('@')?.[0]);

  const account = await prisma.account.findUnique({
    where: {
      provider: AuthProviders.google,
      providerAccountId: sub,
    },
  });

  try {
    if (session?.id) {
      if (account?.id && !!account?.userId && account?.userId !== session?.id) {
        return NextResponse.redirect(new URL('/error', req.url));
      }

      user =
        (await prisma.user.findUnique({
          where: {
            id: session?.id,
          },
        })) || {};

      if (account?.id) {
        await prisma.account.update({
          where: {
            id: account?.id,
          },
          data: {
            userId: session?.id,
          },
        });
      }
    } else {
      if (account?.id) {
        user =
          (await prisma.user.findFirst({
            where: {
              accounts: {
                some: {
                  id: account?.id,
                },
              },
            },
          })) || {};
      }

      if (!user?.id) {
        user = await prisma.user.create({
          data: {
            username,
            name,
            locale,
          },
        });
      }
    }

    if ((!isSQLite || !appConfig.IS_PROD) && !account?.id) {
      await prisma.account.create({
        data: {
          provider: AuthProviders.google,
          providerAccountId: sub,
          userId: user.id as string,
        },
      });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.redirect(new URL('/error', req.url));
  }

  const metadata = {
    id: user?.id,
    name: user?.name,
    username: user?.username,
    locale: user?.locale,
    role: user?.role,
    email: user?.email,
    email_verified: user?.email_verified,
  };

  const res = new NextResponse(location, {
    status: 302,
  });
  await setLoginSession(res, metadata);
  res.headers.set('Location', location);
  return res;
}
