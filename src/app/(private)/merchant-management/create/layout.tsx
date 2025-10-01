import { CreateMerchantProvider } from './hooks';

export default function CreateMerchantLayout({
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
