// // import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  //   // const { pathname } = request.nextUrl;
  //   // const token = request.cookies.get('accessToken')?.value;

  //   // if (
  //   //   pathname.startsWith('/_next') ||
  //   //   pathname === '/favicon.ico' ||
  //   //   pathname.startsWith('/assets') ||
  //   //   pathname.startsWith('/public')
  //   // ) {
  //   //   return NextResponse.next();
  //   // }

  //   // if (pathname.startsWith('/login')) {
  //   //   if (!token) {
  //   //     return NextResponse.next();
  //   //   }
  //   //   const isValid = await verifyToken(token);
  //   //   if (isValid) {
  //   //     return NextResponse.redirect(new URL('/dashboard', request.url));
  //   //   }
  //   //   const res = NextResponse.next();
  //   //   res.cookies.delete('accessToken');
  //   //   return res;
  //   // }

  //   // if (!token) {
  //   //   const loginUrl = new URL('/login', request.url);
  //   //   return NextResponse.redirect(loginUrl);
  //   // }

  //   // const isValid = await verifyToken(token);
  //   // if (!isValid) {
  //   //   const res = NextResponse.redirect(new URL('/login', request.url));
  //   //   res.cookies.delete('accessToken');
  //   //   return res;
  //   // }

  //   // return NextResponse.next();
  console.log(request);
}

// export const config = {
//   // matcher: ['/((?!_next/|favicon.ico|assets/|public/).*)'],
// };

// // async function verifyToken(token: string) {
//   // const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
//   // if (!apiBaseUrl) return false;
//   // const preferredPath = process.env.NEXT_PUBLIC_AUTH_VERIFY_PATH;
//   // const candidatePaths = [preferredPath?.replace(/^\//, '') || 'auth/me', 'auth/verify'];

//   // for (const path of candidatePaths) {
//   //   try {
//   //     const url = `${apiBaseUrl.replace(/\/$/, '')}/${path}`;
//   //     const resp = await fetch(url, {
//   //       method: 'GET',
//   //       headers: { Authorization: `Bearer ${token}` },
//   //     });
//   //     if (resp.status === 200) return true;
//   //     if (resp.status === 401 || resp.status === 403) return false;
//   //     if (resp.status === 404) continue;
//   //   } catch {
//   //     // ignore and treat as invalid
//   //   }
//   // }
//   // return false;
// // }
