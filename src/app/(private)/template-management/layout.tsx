import { TemplateManagementProvider } from './hooks';

export default function TemplateManagementLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TemplateManagementProvider>{children}</TemplateManagementProvider>
    </>
  );
}
