import { ClipboardList, LayoutDashboard, LogOut, PlusCircle, Shield, Wrench } from "lucide-react";
import { NavLink } from "react-router-dom";

function Sidebar({ open, onClose }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const initials = user?.name
    ?.split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    ...(user?.role === "student"
      ? [
          { to: "/create", label: "Create Complaint", icon: PlusCircle },
          { to: "/my-complaints", label: "My Complaints", icon: ClipboardList, badge: "6" },
        ]
      : []),
    ...(user?.role === "admin" ? [{ to: "/admin", label: "Admin Panel", icon: Shield }] : []),
    ...(user?.role === "staff" ? [{ to: "/staff", label: "Staff Panel", icon: Wrench }] : []),
  ];

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
        />
      )}
      <aside
        className={`fixed inset-y-14 left-0 z-40 flex w-60 flex-col border-r border-border-dark bg-bg-secondary p-4 transition-transform duration-200 lg:sticky lg:top-14 lg:h-[calc(100vh-3.5rem)] lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="space-y-2">
          {navItems.map(({ to, label, icon: Icon, badge }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `relative flex items-center gap-3 overflow-hidden rounded-xl px-4 py-3 text-sm transition-all duration-150 ${
                  isActive
                    ? "bg-gradient-to-r from-accent-blue/15 to-transparent text-text-primary before:absolute before:inset-y-2 before:left-0 before:w-1 before:rounded-full before:bg-gradient-to-b before:from-accent-blue before:to-accent-teal"
                    : "text-text-muted hover:bg-bg-surface hover:text-text-primary"
                }`
              }
            >
              <Icon size={18} />
              <span>{label}</span>
              {badge && (
                <span className="ml-auto rounded-pill bg-accent-blue px-2 py-0.5 text-[11px] font-semibold text-white">
                  {badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto rounded-card border border-border-dark bg-bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent-blue to-accent-teal text-sm font-semibold text-white">
              {initials || "HC"}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-text-primary">{user?.name}</p>
              <p className="text-xs capitalize text-text-muted">{user?.role}</p>
            </div>
            <button
              type="button"
              onClick={logout}
              className="ml-auto rounded-lg p-2 text-text-muted transition-all duration-150 hover:bg-bg-surface hover:text-text-primary active:scale-[0.97]"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
