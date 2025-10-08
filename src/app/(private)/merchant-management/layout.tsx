import { MerchantManagementProvider } from './hooks';

export default function MerchantManagementLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MerchantManagementProvider>{children}</MerchantManagementProvider>
    </>
  );
}
