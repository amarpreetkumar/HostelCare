import { Bell, CheckCircle2, ChevronDown, Clock3, LogOut, Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import API from "../services/api";

function Navbar({ onMenuToggle }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
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
        setProfileOpen(false);
        setNotificationsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const role = user?.role;
        let endpoint = "/complaints/my";
        if (role === "admin") endpoint = "/complaints";
        if (role === "staff") endpoint = "/complaints/staff";

        const res = await API.get(endpoint);
        const complaints = Array.isArray(res.data) ? res.data : res.data?.complaints || [];
        setNotifications(
          complaints.slice(0, 5).map((complaint) => ({
            id: complaint._id,
            title: complaint.title,
            status: complaint.status,
            createdAt: complaint.updatedAt || complaint.createdAt,
          })),
        );
      } catch (error) {
        console.log("Notification fetch error:", error);
      }
    };

    fetchNotifications();
  }, [user?.role]);

  const unreadCount = notifications.filter((item) => item.status !== "resolved").length;

  const statusCopy = {
    pending: "Pending review",
    "in-progress": "In progress",
    resolved: "Resolved",
  };

  return (
    <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-border-soft bg-base px-4 md:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuToggle}
          className="cursor-pointer rounded-lg border border-border-soft bg-overlay p-2 text-text-mid transition-all duration-150 hover:text-text-high active:scale-[0.97] lg:hidden"
        >
          <Menu size={18} />
        </button>
        <h1
          className="font-display text-lg font-bold"
          style={{
            background: "linear-gradient(135deg,#FF6B35,#FFAA00)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          HostelCare
        </h1>
      </div>

      <div ref={dropdownRef} className="flex items-center gap-3">
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              setProfileOpen(false);
            }}
            className="relative cursor-pointer rounded-lg border border-border-soft bg-overlay p-2 text-text-mid transition-all duration-150 hover:text-text-high active:scale-[0.97]"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[10px] font-semibold text-white">
                {unreadCount}
              </span>
            )}
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 overflow-hidden rounded-xl border border-border-soft bg-overlay shadow-card">
              <div className="border-b border-border-soft px-4 py-3">
                <p className="text-sm font-medium text-text-high">Recent activity</p>
                <p className="text-xs text-text-mid">{unreadCount} active complaint updates</p>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="px-4 py-6 text-sm text-text-mid">No complaint activity yet.</p>
                ) : (
                  notifications.map((item) => (
                    <div key={item.id} className="flex gap-3 border-b border-border-soft px-4 py-3 last:border-b-0">
                      {item.status === "resolved" ? (
                        <CheckCircle2 className="mt-0.5 shrink-0 text-success" size={16} />
                      ) : (
                        <Clock3 className="mt-0.5 shrink-0 text-primary" size={16} />
                      )}
                      <div className="min-w-0">
                        <p className="truncate text-sm text-text-high">{item.title}</p>
                        <p className="mt-1 text-xs capitalize text-text-mid">{statusCopy[item.status]}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setProfileOpen(!profileOpen);
              setNotificationsOpen(false);
            }}
            className="flex cursor-pointer items-center gap-3 rounded-xl border border-border-soft bg-overlay px-2 py-1.5 transition-all duration-150 hover:border-border-med active:scale-[0.97]"
          >
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold text-white"
              style={{ background: "linear-gradient(135deg,#FF6B35,#A78BFA)" }}
            >
              {initials || "HC"}
            </div>
            <div className="hidden text-left sm:block">
              <p className="text-sm font-medium text-text-high">{user?.name}</p>
              <p className="text-[11px] capitalize text-text-mid">{user?.role}</p>
            </div>
            <ChevronDown size={16} className="text-text-mid" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-xl border border-border-soft bg-overlay shadow-card">
              <div className="border-b border-border-soft px-4 py-3">
                <p className="text-sm font-medium text-text-high">{user?.name}</p>
                <p className="text-xs capitalize text-text-mid">{user?.role}</p>
              </div>
              <button
                type="button"
                onClick={logout}
                className="flex w-full cursor-pointer items-center gap-2 px-4 py-3 text-sm text-danger transition-all duration-150 hover:bg-danger-dim active:scale-[0.97]"
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
