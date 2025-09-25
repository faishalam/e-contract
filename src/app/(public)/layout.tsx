'use client';
import { theme } from '@/styles/theme';
import { ThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AppRouterCacheProvider>
        <div className="h-screen w-screen no-scrollbar">
          <div className="w-full h-[calc(100vh-4.25rem)]">
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
          </div>
        </div>
      </AppRouterCacheProvider>
    </>
  );
}
