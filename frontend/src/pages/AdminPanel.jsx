import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import Layout from "../components/Layout";
import API from "../services/api";

const statusStyles = {
  pending: "border border-[#FFAA0030] bg-[#FFAA0018] text-[#FFAA00]",
  "in-progress": "border border-[#FF537030] bg-[#FF537018] text-[#FF5370]",
  resolved: "border border-[#3ECF8E30] bg-[#3ECF8E18] text-[#3ECF8E]",
};

function AdminPanel() {
  const [complaints, setComplaints] = useState([]);
  const [staffUsers, setStaffUsers] = useState([]);
  const [staffLoading, setStaffLoading] = useState(true);
  const [staffLoadFailed, setStaffLoadFailed] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState({});
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchComplaints();
    fetchStaffUsers();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await API.get("/complaints");
      setComplaints(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load complaints");
    }
  };

  const fetchStaffUsers = async () => {
    try {
      setStaffLoading(true);
      setStaffLoadFailed(false);
      const res = await API.get("/auth/staff");
      setStaffUsers(res.data);
    } catch (error) {
      console.log(error);
      setStaffLoadFailed(true);
      toast.error("Failed to load staff members");
    } finally {
      setStaffLoading(false);
    }
  };

  const assignComplaint = async (complaintId) => {
    const staffId = selectedStaff[complaintId];

    if (!staffId) {
      toast.error("Select a staff member first");
      return;
    }

    try {
      await API.put("/complaints/assign", { complaintId, staffId });
      toast.success("Complaint assigned successfully");
      fetchComplaints();
    } catch (error) {
      console.log(error);
      toast.error("Assignment failed");
    }
  };

  const filteredComplaints = useMemo(
    () =>
      complaints.filter((item) => {
        const matchesStatus = filter === "all" || item.status === filter;
        const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
        return matchesStatus && matchesSearch;
      }),
    [complaints, filter, search],
  );

  return (
    <Layout>
      <section className="space-y-5">
        <header className="animate-fadeup delay-1">
          <h1 className="font-display text-3xl font-semibold">Admin Panel</h1>
          <p className="mt-2 text-sm text-text-mid">Manage and assign all hostel complaints</p>
        </header>

        <div className="animate-fadeup delay-2 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-1.5 rounded-xl border border-border-soft bg-base p-1">
            {[
              ["all", "All"],
              ["pending", "Pending"],
              ["in-progress", "In Progress"],
              ["resolved", "Resolved"],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setFilter(value)}
                className={`cursor-pointer rounded-lg px-4 py-1.5 text-xs font-semibold transition-all duration-150 hover:text-text-high active:scale-[0.97] ${
                  filter === value
                    ? "border border-border-soft bg-elevated text-text-high shadow-card"
                    : "text-text-low"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-low" size={16} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search complaints"
              className="w-full rounded-xl border border-border-soft bg-subtle py-2.5 pl-9 pr-3 text-sm text-text-high outline-none transition-all duration-150 placeholder:text-text-low focus:border-primary focus:ring-2 focus:ring-[rgba(255,107,53,0.15)] md:w-64"
            />
          </div>
        </div>

        <div className="animate-fadeup delay-3 overflow-hidden rounded-card border border-border-soft bg-elevated shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px]">
              <thead className="bg-overlay">
                <tr>
                  {["#", "Complaint", "Student", "Status", "Assign To", "Actions"].map((heading) => (
                    <th key={heading} className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-widest text-text-low">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredComplaints.map((complaint) => (
                  <tr key={complaint._id} className="border-t border-border-soft transition-all duration-150 hover:bg-overlay/60">
                    <td className="px-5 py-4 text-sm text-text-mid">{complaint._id?.slice(-6)}</td>
                    <td className="px-5 py-4 text-sm text-text-high">
                      <p className="text-sm font-medium">{complaint.title}</p>
                      <span className="mt-1 inline-flex rounded-pill border border-border-soft bg-subtle px-2.5 py-1 text-[11px] text-text-mid">
                        {complaint.category}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-text-high">{complaint.createdBy?.name}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 rounded-pill px-2.5 py-[3px] text-[11px] font-semibold capitalize ${statusStyles[complaint.status] || ""}`}>
                        <span className={`h-1.5 w-1.5 rounded-full bg-current ${complaint.status === "in-progress" ? "dot-pulse" : ""}`} />
                        {complaint.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <select
                        value={selectedStaff[complaint._id] || complaint.assignedTo?._id || ""}
                        onChange={(e) =>
                          setSelectedStaff((current) => ({
                            ...current,
                            [complaint._id]: e.target.value,
                          }))
                        }
                        className="min-w-44 cursor-pointer appearance-none rounded-xl border border-border-soft bg-subtle px-4 py-2.5 text-xs text-text-high outline-none transition-all duration-150 focus:border-primary focus:ring-2 focus:ring-[rgba(255,107,53,0.15)]"
                      >
                        <option value="">
                          {staffLoading
                            ? "Loading staff..."
                            : staffLoadFailed
                              ? "Failed to load staff"
                              : staffUsers.length === 0
                                ? "No staff users found"
                                : "Assign staff..."}
                        </option>
                        {staffUsers.map((staff) => (
                          <option key={staff._id} value={staff._id}>
                            {staff.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-5 py-4">
                      <button
                        type="button"
                        onClick={() => assignComplaint(complaint._id)}
                        className={`cursor-pointer rounded-xl px-3 py-2 text-xs font-semibold transition-all duration-150 active:scale-[0.97] ${
                          complaint.assignedTo
                            ? "border border-border-soft bg-overlay text-text-mid hover:border-border-med hover:text-text-high"
                            : "border border-primary/20 bg-primary-dim text-primary hover:brightness-110"
                        }`}
                      >
                        {complaint.assignedTo ? "Reassign" : "Assign"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredComplaints.length === 0 && (
            <p className="px-6 py-10 text-center text-sm text-text-mid">No complaints available.</p>
          )}
        </div>
      </section>
    </Layout>
  );
}

export default AdminPanel;
