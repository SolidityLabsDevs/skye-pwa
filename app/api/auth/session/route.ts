export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getLoginSession } from 'lib/auth';

/*
 * not used in web app.
 * you can pass token as GET parameters also.
 * use this endpoint for mobile apps.
 */
export async function GET() {
  const data = await getLoginSession();
  const res = NextResponse.json(data || '');

  res.headers.set('Cache-Control', 'no-store');
  return res;
}

/*
for mobile apps

export const dynamic = 'force-dynamic';
import { NextResponse, NextRequest } from 'next/server';
import { headers } from 'next/headers';
import { getLoginSession } from 'lib/auth';
import prisma, { prismaExclude } from 'lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token'); // token=${xxx}
  const headersList = headers();
  const cookie = headersList.get('cookie');
  const data = await getLoginSession(token !== 'null' ? token : cookie);
  let user = {};

  if (data?.email) {
    user =
      (await prisma.user.findUnique({
        where: {
          email: data?.email as string,
        },
        select: prismaExclude('User', ['password']),
      })) || {};
  }
  const res = NextResponse.json({ ...data, ...user } || '');
  res.headers.set('Cache-Control', 'no-store');
  return res;
}
*/
