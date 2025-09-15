import Navbar from '@/components/molecules/navbar';
import Sidebar from '@/components/molecules/sidebar';

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="h-screen w-screen no-scrollbar">
        <div className="flex h-full overflow-y-hidden">
          <Sidebar />
          <div className="flex flex-col w-full overflow-y-auto">
            <Navbar />
            <div className="w-full px-6 py-4 bg-[#f9fafb]">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
