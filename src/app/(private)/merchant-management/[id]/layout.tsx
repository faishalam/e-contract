import { CreateMerchantProvider } from './hooks';

export default function MerchantManagementLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <CreateMerchantProvider>{children}</CreateMerchantProvider>
    </>
  );
}
