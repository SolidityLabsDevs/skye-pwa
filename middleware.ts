import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ROUTES = {
  dashboardAll: '/dashboard/(.*)',
  dashboard: '/dashboard',
  profileMyAll: '/profile/my/(.*)',
  profileMy: '/profile/my',
  login: '/login',
  register: '/register',
  signIn: '/sign-in',
  signUp: '/sign-up',
  success: '/success',
};

export async function middleware(req: NextRequest) {
  const includes = (arr: string[]) => arr.some(r => req.nextUrl.href.includes(r));
  const redirect = (url: string) => NextResponse.redirect(new URL(url, req.url));

  const next = NextResponse.next();

  try {
    const token = req.cookies.get(process.env.TOKEN_NAME as string)?.value;
    const session = await jwtVerify(
      token as string,
      new TextEncoder().encode(process.env.TOKEN_SECRET as string)
    );

    const isValid =
      session?.payload?.exp && Date.now() < ((session?.payload?.exp || 0) * 1_000 || 0);
    const role = session?.payload?.role; // uncomment for role based route dashboard

    if (isValid) {
      if (includes([ROUTES.dashboard, ROUTES.profileMyAll, ROUTES.profileMy])) {
        if (req.nextUrl.pathname === '/dashboard') {
          return redirect(`/dashboard/${(role as string)?.toLowerCase()}`); // uncomment for role based route dashboard
        }
        return next;
      }

      if (includes([ROUTES.signIn, ROUTES.signUp, ROUTES.success, ROUTES.login, ROUTES.register])) {
        return redirect(`/dashboard/${(role as string)?.toLowerCase()}`); // uncomment for role based route dashboard
        // return redirect('/dashboard');
      }
    } else {
      if (includes([ROUTES.signIn, ROUTES.signUp, ROUTES.success, ROUTES.login, ROUTES.register]))
        return next;
    }

    return redirect('/');
  } catch (e) {
    console.log('midleware.ts error: ', e);

    if (includes([ROUTES.dashboard, ROUTES.dashboardAll, ROUTES.profileMyAll, ROUTES.profileMy]))
      return redirect(`/sign-in?backUrl=${req.nextUrl.pathname}`);

    if (includes([ROUTES.signIn, ROUTES.signUp, ROUTES.success, ROUTES.login, ROUTES.register]))
      return next;

    return redirect('/');
  }
}

export const config = {
  matcher: [
    '/dashboard/(.*)',
    '/dashboard',
    '/profile/my/(.*)',
    '/sign-in',
    '/sign-up',
    '/success',
    '/login',
    '/register',
  ],
};
