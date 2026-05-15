import { Bell, ChevronDown, LogOut, Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function Navbar({ onMenuToggle }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-border-dark bg-bg-secondary px-4 md:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuToggle}
          className="rounded-lg border border-border-dark bg-bg-surface p-2 text-text-muted transition-all duration-150 hover:text-text-primary active:scale-[0.97] lg:hidden"
        >
          <Menu size={18} />
        </button>
        <h1 className="bg-gradient-to-r from-accent-blue to-accent-teal bg-clip-text font-display text-2xl font-semibold text-transparent">
          HostelCare
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="relative rounded-lg border border-border-dark bg-bg-surface p-2 text-text-muted transition-all duration-150 hover:text-text-primary active:scale-[0.97]"
        >
          <Bell size={18} />
          <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent-red px-1 text-[10px] font-semibold text-white">
            3
          </span>
        </button>

        <div ref={dropdownRef} className="relative">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3 rounded-xl border border-border-dark bg-bg-surface px-2 py-1.5 transition-all duration-150 hover:border-accent-blue/40 active:scale-[0.97]"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-accent-blue to-accent-teal text-xs font-semibold text-white">
              {initials || "HC"}
            </div>
            <div className="hidden text-left sm:block">
              <p className="text-sm font-medium text-text-primary">{user?.name}</p>
              <p className="text-[11px] capitalize text-text-muted">{user?.role}</p>
            </div>
            <ChevronDown size={16} className="text-text-muted" />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-xl border border-border-dark bg-bg-card shadow-card">
              <div className="border-b border-border-dark px-4 py-3">
                <p className="text-sm font-medium text-text-primary">{user?.name}</p>
                <p className="text-xs capitalize text-text-muted">{user?.role}</p>
              </div>
              <button
                type="button"
                onClick={logout}
                className="flex w-full items-center gap-2 px-4 py-3 text-sm text-accent-red transition-all duration-150 hover:bg-accent-red/10 active:scale-[0.97]"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
