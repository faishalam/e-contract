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
    <>
      <AppRouterCacheProvider>
        <UserProfileProvider>
          <div className="w-screen h-screen no-scrollbar">
            <div className="w-full h-full">
              <div className="flex w-full h-full">
                <Sidebar />
                <div className="flex flex-col w-full overflow-y-auto">
                  <Navbar />
                  <div className="w-full px-6 py-4 bg-[#f9fafb] h-screen">{children}</div>
                </div>
              </div>
            </div>
          </div>
        </UserProfileProvider>
      </AppRouterCacheProvider>
    </>
  );
}
