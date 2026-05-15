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
          className="fixed inset-0 z-30 cursor-pointer bg-black/50 lg:hidden"
        />
      )}
      <aside
        className={`fixed inset-y-14 left-0 z-40 flex w-60 flex-col border-r border-border-soft bg-base p-4 transition-all duration-150 lg:sticky lg:top-14 lg:h-[calc(100vh-3.5rem)] lg:translate-x-0 ${
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
                `relative mx-2 flex cursor-pointer items-center gap-3 overflow-hidden rounded-xl px-3 py-2.5 text-sm transition-all duration-150 ${
                  isActive
                    ? "border-l-2 border-primary bg-primary-dim font-medium text-primary"
                    : "text-text-mid hover:bg-overlay hover:text-text-high"
                }`
              }
            >
              <Icon size={18} />
              <span>{label}</span>
              {badge && (
                <span className="ml-auto rounded-pill bg-primary/20 px-2 py-0.5 text-[10px] font-semibold text-primary">
                  {badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="mx-3 mt-auto rounded-xl bg-overlay p-3">
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-white"
              style={{ background: "linear-gradient(135deg,#3ECF8E,#A78BFA)" }}
            >
              {initials || "HC"}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-text-high">{user?.name}</p>
              <p className="text-xs capitalize text-text-mid">{user?.role}</p>
            </div>
            <button
              type="button"
              onClick={logout}
              className="ml-auto cursor-pointer rounded-lg p-2 text-text-mid transition-all duration-150 hover:bg-subtle hover:text-text-high active:scale-[0.97]"
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
