import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Public paths that don't require authentication
const publicPaths = [
  '/auth/login',
  '/auth/signup',
  '/',
  '/_next',
  '/api/auth',
  '/favicon.ico',
  '/logo.png',
  '/landing-bg.gif',
  '/kdsms'
];

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const isPublicPath = publicPaths.some(path => request.nextUrl.pathname.startsWith(path));

  if (!token && !isPublicPath) {
    // Redirect to login if trying to access protected route without auth
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('callbackUrl', request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (token && (request.nextUrl.pathname === '/auth/login' || request.nextUrl.pathname === '/auth/signup')) {
    // Redirect to dashboard if trying to access auth pages while logged in
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}; 