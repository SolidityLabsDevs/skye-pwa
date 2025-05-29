import { serialize } from 'cookie';
import { NextResponse } from 'next/server';

export const MAX_AGE = 60 * 60 * 24 * 30; //30 days
// export const MAX_AGE = 60 * 60 * 8; // 8 hours

export const setTokenCookie = (res: NextResponse, token: string) => {
  const cookieOptions = {
    maxAge: MAX_AGE,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax' as const,
  };
  const cookie = serialize(process.env.TOKEN_NAME as string, token, cookieOptions);
  res.headers.set('Set-Cookie', cookie);
};

export const removeTokenCookie = (res: NextResponse) => {
  const cookieOptions = {
    maxAge: MAX_AGE,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax' as const,
  };
  const cookie = serialize(process.env.TOKEN_NAME as string, 'null', cookieOptions);
  res.headers.set('Set-Cookie', cookie);
};
