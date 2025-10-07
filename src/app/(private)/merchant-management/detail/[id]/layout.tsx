import { DetailMerchantProvider } from './hooks';

export default function MerchantManagementLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <DetailMerchantProvider>{children}</DetailMerchantProvider>
    </>
  );
}
