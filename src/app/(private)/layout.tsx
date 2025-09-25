'use client';
import Navbar from '@/components/molecules/navbar';
import Sidebar from '@/components/molecules/sidebar';
import { theme } from '@/styles/theme';
import { ThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AppRouterCacheProvider>
        <div className="w-screen h-screen no-scrollbar">
          <div className="w-full h-full">
            <div className="flex w-full h-full">
              <Sidebar />
              <div className="flex flex-col w-full overflow-y-auto">
                <Navbar />
                <div className="w-full px-6 py-4 bg-[#f9fafb]">
                  <ThemeProvider theme={theme}>{children}</ThemeProvider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AppRouterCacheProvider>
    </>
  );
}
