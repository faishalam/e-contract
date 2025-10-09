import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_ROUTES = ['/login', '/activation', '/reset-password'];

function base64UrlDecode(str: string) {
  let s = str.replace(/-/g, '+').replace(/_/g, '/');
  while (s.length % 4) s += '=';
  try {
    return globalThis.atob(s);
  } catch {
    return '';
  }
}

function verifyToken(token?: string): boolean {
  if (!token) return false;
  try {
    const parts = token.split('.');
    if (parts.length < 2) return false;
    const payloadStr = base64UrlDecode(parts[1]);
    if (!payloadStr) return false;
    const payload = JSON.parse(payloadStr);
    if (!payload.exp) return false;
    return Number(payload.exp) * 1000 > Date.now();
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('accessToken')?.value;
  const isValid = verifyToken(token);
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname === '/favicon.ico') {
    return NextResponse.next();
  }

  if (pathname === '/') {
    return NextResponse.redirect(new URL(isValid ? '/dashboard' : '/login', request.url));
  }

  if (pathname === '/login' && isValid) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (isPublicRoute) {
    return NextResponse.next();
  }

  if (!isValid) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api|static|favicon.ico).*)'],
};
