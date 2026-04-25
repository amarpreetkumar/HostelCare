import { useState, useRef, useEffect } from "react";

function Navbar() {

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {

    const handleClickOutside = (event) => {

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }

    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

  }, []);

  return (

<div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">

{/* Logo */}
<h1 className="text-2xl font-bold tracking-wide text-indigo-400">
HostelCare
</h1>

{/* User Section */}
<div ref={dropdownRef} className="relative">

<button
onClick={() => setOpen(!open)}
className="flex items-center gap-3 bg-gray-800 px-3 py-2 rounded-lg hover:bg-gray-700 transition"
>

{/* Avatar */}
<div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white flex items-center justify-center text-sm font-semibold">
{user.name.charAt(0).toUpperCase()}
</div>

<span className="font-medium">{user.name}</span>

<span className="text-sm text-gray-400">▼</span>

</button>

{/* Dropdown */}
{open && (

<div className="absolute right-0 mt-2 w-44 bg-gray-900 text-white shadow-xl rounded-xl border border-gray-700 overflow-hidden">

<div className="px-4 py-2 text-sm text-gray-300 border-b border-gray-700">
Role: {user.role}
</div>

<button
onClick={logout}
className="w-full text-left px-4 py-2 hover:bg-red-600 text-sm text-red-400 hover:text-white transition"
>
Logout
</button>

</div>

)}

</div>

</div>

  );

}

export default Navbar;