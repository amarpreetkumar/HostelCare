import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  PlusCircle,
  ClipboardList,
  Wrench,
  Shield,
} from "lucide-react";

function Sidebar() {

  const user = JSON.parse(localStorage.getItem("user"));

  return (

<div className="w-64 min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6 sticky top-0">

<h2 className="text-xl font-semibold mb-8 text-gray-300 uppercase tracking-wider">
Menu
</h2>

<div className="flex flex-col space-y-3">

<NavLink
to="/dashboard"
className={({ isActive }) =>
`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
isActive
? "bg-indigo-600 text-white"
: "hover:bg-gray-700 text-gray-300"
}`
}
>
<LayoutDashboard size={18} />
<span>Dashboard</span>
</NavLink>

{user.role === "student" && (

<>

<NavLink
to="/create"
className={({ isActive }) =>
`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
isActive
? "bg-indigo-600 text-white"
: "hover:bg-gray-700 text-gray-300"
}`
}
>
<PlusCircle size={18} />
<span>Create Complaint</span>
</NavLink>

<NavLink
to="/my-complaints"
className={({ isActive }) =>
`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
isActive
? "bg-indigo-600 text-white"
: "hover:bg-gray-700 text-gray-300"
}`
}
>
<ClipboardList size={18} />
<span>My Complaints</span>
</NavLink>

</>

)}

{user.role === "admin" && (

<NavLink
to="/admin"
className={({ isActive }) =>
`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
isActive
? "bg-indigo-600 text-white"
: "hover:bg-gray-700 text-gray-300"
}`
}
>
<Shield size={18} />
<span>Admin Panel</span>
</NavLink>

)}

{user.role === "staff" && (

<NavLink
to="/staff"
className={({ isActive }) =>
`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
isActive
? "bg-indigo-600 text-white"
: "hover:bg-gray-700 text-gray-300"
}`
}
>
<Wrench size={18} />
<span>Staff Panel</span>
</NavLink>

)}

</div>

{/* User Role Section */}

<div className="absolute bottom-6 left-6 right-6 text-sm text-gray-400">

<div className="border-t border-gray-700 pt-4">

<p>Logged in as</p>

<p className="font-semibold text-white uppercase">
{user.role}
</p>

</div>

</div>

</div>

  );

}

export default Sidebar;