import { DashboardProvider } from './hooks';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <DashboardProvider>{children}</DashboardProvider>
    </>
  );
}
