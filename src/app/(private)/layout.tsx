'use client';
import Navbar from '@/components/molecules/navbar';
import Sidebar from '@/components/molecules/sidebar';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const token = Cookies.get('accessToken');
    if (!token) {
      router.replace('/login');
    } else {
      setIsChecking(false);
    }
  }, []);

  if (isChecking) return null;
  return (
    <>
      <AppRouterCacheProvider>
        <div className="w-screen h-screen no-scrollbar">
          <div className="w-full h-full">
            <div className="flex w-full h-full">
              <Sidebar />
              <div className="flex flex-col w-full overflow-y-auto">
                <Navbar />
                <div className="w-full px-6 py-4 bg-[#f9fafb]">{children}</div>
              </div>
            </div>
          </div>
        </div>
      </AppRouterCacheProvider>
    </>
  );
}
