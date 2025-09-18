import { EsignProvider } from './hooks';

export default function EsignLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <EsignProvider>{children}</EsignProvider>
    </>
  );
}
