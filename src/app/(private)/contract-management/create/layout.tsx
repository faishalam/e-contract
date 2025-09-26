import { Suspense } from 'react';
import { CreateContractProvider } from './hooks';
import { GoogleDocsProvider } from './context/useGoogleDocs';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Suspense>
        <CreateContractProvider>
          <GoogleDocsProvider>{children}</GoogleDocsProvider>
        </CreateContractProvider>
      </Suspense>
    </>
  );
}
