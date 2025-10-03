import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Contoh: fungsi verifikasi JWT/token kamu
async function verifyToken(token: string): Promise<boolean> {
  try {
    // TODO: implementasikan validasi token asli
    token;
    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('accessToken')?.value;

  if (
    pathname.startsWith('/_next') ||
    pathname === '/favicon.ico' ||
    pathname.startsWith('/assets') ||
    pathname.startsWith('/public')
  ) {
    return NextResponse.next();
  }

  if (
    pathname.startsWith('/login') ||
    pathname.startsWith('/activation') ||
    pathname.startsWith('/reset-password')
  ) {
    if (!token) {
      return NextResponse.next();
    }

    const isValid = await verifyToken(token);
    if (isValid) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    const res = NextResponse.next();
    res.cookies.delete('accessToken');
    return res;
  }

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const isValid = await verifyToken(token);
  if (!isValid) {
    const res = NextResponse.redirect(new URL('/login', request.url));
    res.cookies.delete('accessToken');
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/|favicon.ico|assets/|public/).*)'],
};
