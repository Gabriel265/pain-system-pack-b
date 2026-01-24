// src/app/admin/layout.js
import Sidebar from "@/components/common/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-white ">

      <div className="flex flex-1">
  <Sidebar type="admin" />

  <main className="flex-1 p-4 sm:p-6 lg:p-10">
    {children}
  </main>
</div>
    </div>
  );
}