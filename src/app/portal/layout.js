// src/app/portal/layout.js
import Sidebar from "@/components/common/Sidebar";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export default function PortalLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      
      <Header />

      <div className="flex flex-1">
  <Sidebar type="portal" />

  <main className="flex-1 p-4 sm:p-6 lg:p-10">
    {children}
  </main>
</div>

     <Footer />
    </div>
  );
}