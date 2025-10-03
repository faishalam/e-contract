'use client';
import { theme } from '@/styles/theme';
import { ThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import Link from 'next/link';
import { LoginProvider } from './login/hooks';

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AppRouterCacheProvider>
        <LoginProvider>
          <ThemeProvider theme={theme}>
            <div className="h-screen w-screen no-scrollbar">
              <div className="w-full h-[calc(100vh-4.25rem)]">{children}</div>

              <footer className="fixed bottom-0 left-0 w-full bg-white/60 justify-center items-center backdrop-blur-sm py-5 flex flex-col gap-2 px-10 z-20">
                <div className="flex gap-4 text-xs">
                  <Link href={''} className="text-gray-500">
                    &copy; 2024 PT. POS Indonesia
                  </Link>
                  <Link href={''} className="text-gray-500">
                    Kebijakan Privasi
                  </Link>
                  <Link href={''} className="text-gray-500">
                    Syarata dan Ketentuan
                  </Link>
                  <Link href={''} className="text-gray-500">
                    Bantuan
                  </Link>
                </div>
                <div className="text-center text-xs">
                  <Link href={''} className="text-gray-500">
                    Version 2.1.0 | Build 20241201
                  </Link>
                </div>
              </footer>
            </div>
          </ThemeProvider>
        </LoginProvider>
      </AppRouterCacheProvider>
    </>
  );
}
