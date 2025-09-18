import { ContractManagementProvider } from './hooks';

export default function ContractManagementLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ContractManagementProvider>{children}</ContractManagementProvider>
    </>
  );
}
