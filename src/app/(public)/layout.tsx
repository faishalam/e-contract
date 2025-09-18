'use client';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const token = Cookies.get('accessToken');
    if (token) {
      router.replace('/dashboard');
    } else {
      setIsChecking(false);
    }
  }, []);

  if (isChecking) return null;
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
