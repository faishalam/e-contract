'use client';
import { LoginProvider } from './hooks';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  useEffect(() => {
    const token = Cookies.get('accessToken');
    if (token) {
      router.replace('/dashboard');
    }
  }, []);
  return (
    <>
      <LoginProvider>{children}</LoginProvider>
    </>
  );
}
