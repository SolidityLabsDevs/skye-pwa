import { appConfig } from 'config/appConfig';
import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';

const redirectUrl = `${appConfig.SITE_URL}/api/auth/google/callback`;

export async function GET(req: NextRequest) {
  const searchParams = new URL(req.url).searchParams;
  const backUrl = searchParams.get('backUrl');

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_SECRET,
    redirectUrl
  );

  const scopes = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
  ];

  const authorizationUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    include_granted_scopes: true,
    state: JSON.stringify({ backUrl: backUrl || '' }),
    prompt: 'select_account',
  });

  return NextResponse.json({ Location: authorizationUrl });
}
