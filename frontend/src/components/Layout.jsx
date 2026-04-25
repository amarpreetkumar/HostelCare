import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout({ children }) {

  return (

<div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">

  {/* Top Navbar */}
  <Navbar />

  {/* Page Body */}
  <div className="flex">

    {/* Sidebar */}
    <Sidebar />

    {/* Main Content */}
    <main className="flex-1 p-6">

      {children}

    </main>

  </div>

</div>

  );

}

export default Layout;