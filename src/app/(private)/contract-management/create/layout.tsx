import { CreateContractProvider } from './hooks';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <CreateContractProvider>{children}</CreateContractProvider>
    </>
  );
}
