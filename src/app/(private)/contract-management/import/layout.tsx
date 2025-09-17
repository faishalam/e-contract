import { Suspense } from 'react';
import { ImportContractProvider } from './hooks';

export default function ContractManagementLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Suspense>
        <ImportContractProvider>{children}</ImportContractProvider>
      </Suspense>
    </>
  );
}
