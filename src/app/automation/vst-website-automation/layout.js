import Sidebar from "@/components/common/Sidebar";

export default function VSTLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      

      <div className="flex flex-1">
  <Sidebar type="vst" />
  <main className="flex-1 p-4 sm:p-6 lg:p-10">
    {children}
  </main>
</div>
    </div>
  );
}