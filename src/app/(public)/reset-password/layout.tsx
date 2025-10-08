'use client';

import { ResetPasswordProvider } from './hooks';

export default function ResetPasswordPage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ResetPasswordProvider>{children}</ResetPasswordProvider>
    </>
  );
}
