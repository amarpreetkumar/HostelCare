import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <Navbar onMenuToggle={() => setSidebarOpen(true)} />
      <div className="flex">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="min-h-[calc(100vh-3.5rem)] flex-1 overflow-y-auto bg-bg-primary p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
