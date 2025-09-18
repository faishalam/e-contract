import { PartnerManagementProvider } from './hooks';

export default function PartnerManagementLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PartnerManagementProvider>{children}</PartnerManagementProvider>
    </>
  );
}
