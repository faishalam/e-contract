import Navbar from "@/components/molecules/navbar";
import Sidebar from "@/components/molecules/sidebar";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="h-screen w-screen no-scrollbar">
        <Navbar />
        <div className="flex h-[calc(100vh-4.25rem)] overflow-y-hidden">
          <Sidebar />
          <div className="w-full h-full overflow-y-auto">{children}</div>
        </div>
      </div>
    </>
  );
}
