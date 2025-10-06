'use client';
import Navbar from '@/components/molecules/navbar';
import Sidebar from '@/components/molecules/sidebar';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { UserProfileProvider } from '@/context/profileProvider/hooks';

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const accessToken = Cookies.get('accessToken');
  const refreshToken = Cookies.get('refreshToken');

  useEffect(() => {
    if (!accessToken && !refreshToken) {
      router.replace('/login');
      return;
    }
  }, [accessToken, refreshToken, router]);

  return (
    <AppRouterCacheProvider>
      <UserProfileProvider>
        <div className="flex h-screen w-screen overflow-hidden">
          <Sidebar />
          <div className="flex flex-col flex-1 min-w-0 h-screen">
            <Navbar />
            <main className="flex-1 overflow-y-auto overflow-x-hidden bg-[#f9fafb]">
              <div className="p-6 h-full">{children}</div>
            </main>
          </div>
        </div>
      </UserProfileProvider>
    </AppRouterCacheProvider>
  );
}
