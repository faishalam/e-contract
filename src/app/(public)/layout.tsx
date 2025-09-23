'use client';
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
          <div className="w-full h-[calc(100vh-4.25rem)]">{children}</div>
        </div>
      </AppRouterCacheProvider>
    </>
  );
}
