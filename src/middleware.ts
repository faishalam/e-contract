import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_ROUTES = ['/login', '/activation', '/reset-password'];

export const runtime = 'experimental-edge';

function base64UrlDecode(str: string) {
  let s = str.replace(/-/g, '+').replace(/_/g, '/');
  while (s.length % 4) s += '=';
  try {
    return globalThis.atob(s);
  } catch {
    return '';
  }
}

async function verifyToken(token: string | undefined): Promise<boolean> {
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

  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname === '/favicon.ico') {
    return NextResponse.next();
  }

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  if (isPublicRoute) {
    if (token && (await verifyToken(token))) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const isValid = await verifyToken(token);
  if (!isValid) {
    const response = NextResponse.redirect(new URL('/login', request.url));
    try {
      response.cookies.delete('accessToken');
      response.cookies.delete('refreshToken');
    } catch {}
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api|static|favicon.ico).*)'],
};
