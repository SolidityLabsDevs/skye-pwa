import { appConfig } from 'config/appConfig';
import appleSignin from 'apple-signin-auth';
import { NextRequest, NextResponse } from 'next/server';

const redirectUrl = `${appConfig.SITE_URL}/api/auth/apple/callback`;

export async function GET(req: NextRequest) {
  if (!process.env.APPLE_CLIENT_ID) return NextResponse.json({ Location: '/' });

  const searchParams = new URL(req.url).searchParams;
  const backUrl = searchParams.get('backUrl');

  const authorizationUrl = appleSignin.getAuthorizationUrl({
    clientID: process.env.APPLE_CLIENT_ID as string,
    redirectUri: redirectUrl,
    state: JSON.stringify({ backUrl: backUrl || '' }),
    responseMode: 'form_post',
    scope: 'email',
  });

  return NextResponse.json({ Location: authorizationUrl });
}
