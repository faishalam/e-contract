import { GoogleDocsProvider } from './hooks/useGDocsHooks';
import { TemplateProvider } from './hooks/hooks';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <GoogleDocsProvider>
        <TemplateProvider>{children}</TemplateProvider>
      </GoogleDocsProvider>
    </>
  );
}
