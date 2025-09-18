import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('accessToken')?.value;

  const isPublicPath = req.nextUrl.pathname.startsWith('/login');

  if (isPublicPath) return NextResponse.next();

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico).*)'],
};
