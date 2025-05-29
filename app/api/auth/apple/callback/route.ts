export const runtime = 'nodejs';
import { User } from '.prisma/generated/client';
import { appConfig } from 'config/appConfig';
import { getUniqueUsername } from 'helpers';
import { getLoginSession, setLoginSession } from 'lib/auth';
import prisma from 'lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import appleSignin from 'apple-signin-auth';
import { AuthProviders } from 'types/entities';

const redirectUrl = `${appConfig.SITE_URL}/api/auth/apple/callback`;

const isSQLite = prisma?._originalClient?._activeProvider === 'sqlite';

export async function POST(req: NextRequest) {
  const fd = await req.formData();
  const code = fd.get('code');
  const state = JSON.parse((fd.get('state') as string) || '');

  // if has active session, we will connect that apple account to active session account, if it was never connected.
  // if apple account connected to another user, throw an error.
  // if no active session, create new user and connect account, or authorize existing user with no logic.
  const session = await getLoginSession();
  const location = state?.backUrl
    ? state?.backUrl
    : session?.id
      ? `/dashboard/${session?.role?.toLowerCase()}/settings/account`
      : '/dashboard';

  const clientSecret = appleSignin.getClientSecret({
    clientID: process.env.APPLE_CLIENT_ID as string,
    teamID: process.env.APPLE_TEAM_ID as string,
    privateKey: process.env.APPLE_PRIVATE_KEY as string,
    keyIdentifier: process.env.APPLE_PRIVATE_KEY_IDENTIFIER as string,
    expAfter: 15777000,
  });

  if (!code) return NextResponse.error();

  const tokenResponse = await appleSignin.getAuthorizationToken(code as string, {
    clientID: process.env.APPLE_CLIENT_ID as string,
    redirectUri: redirectUrl,
    clientSecret: clientSecret,
  });

  if (!tokenResponse.id_token) return NextResponse.error();

  // { email_verified }
  const { sub, email } = await appleSignin.verifyIdToken(tokenResponse.id_token, {
    audience: process.env.APPLE_CLIENT_ID as string,
  });

  let user: Partial<User> = {};

  const name = email.split('@')[0];
  const username = await getUniqueUsername(name);

  const account = await prisma.account.findUnique({
    where: {
      provider: AuthProviders.apple,
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
          },
        });
      }
    }

    if ((!isSQLite || !appConfig.IS_PROD) && !account?.id) {
      await prisma.account.create({
        data: {
          provider: AuthProviders.apple,
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
