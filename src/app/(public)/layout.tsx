export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="h-screen w-screen no-scrollbar">
        <div className="w-full h-[calc(100vh-4.25rem)]">{children}</div>
      </div>
    </>
  );
}
