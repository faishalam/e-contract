import { UserManagementProvider } from './hooks';

export default function UserManagementLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <UserManagementProvider>{children}</UserManagementProvider>
    </>
  );
}
