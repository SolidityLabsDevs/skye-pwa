import { JWTPayload, JWTVerifyResult, SignJWT, jwtVerify } from 'jose';
import cookie from 'cookie';
import { NextResponse } from 'next/server';
import { MAX_AGE, removeTokenCookie, setTokenCookie } from './auth-cookie';
import { headers } from 'next/headers';

export const setLoginSession = async (
  res: NextResponse,
  metadata: { [key in string]: unknown }
) => {
  const session = {
    ...metadata,
    createdAt: new Date(),
    maxAge: MAX_AGE,
  };

  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + MAX_AGE;

  const token = await new SignJWT(session)
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(process.env.TOKEN_SECRET as string));

  setTokenCookie(res, token);

  return token;
};

export const removeLoginSession = async (res: NextResponse) => {
  removeTokenCookie(res);
};

export const getLoginSession = async () => {
  try {
    const headersList = await headers();
    const cookies = headersList.get('cookie') || '';
    const token = headersList.get((process.env.TOKEN_NAME as string) || 'token') || '';

    const reqCookie = cookie.parse(cookies);
    const tokenCookie = reqCookie?.[(process.env.TOKEN_NAME as string) || 'token'];

    if (!token && !tokenCookie) return;

    const metadata = await jwtVerify(
      token || tokenCookie,
      new TextEncoder().encode(process.env.TOKEN_SECRET as string)
    );
    return metadata?.payload as unknown as JWTVerifyResult<JWTPayload> &
      Partial<{
        id: string;
        email: string;
        email_verified: string;
        locale: string;
        role: string;
      }>;
  } catch {
    return;
  }
};
