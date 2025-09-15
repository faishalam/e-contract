import { Suspense } from 'react';
import { CreateContractProvider } from './hooks';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Suspense>
        <CreateContractProvider>{children}</CreateContractProvider>
      </Suspense>
    </>
  );
}
