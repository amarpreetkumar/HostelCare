import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import Layout from "../components/Layout";
import API from "../services/api";

const statusStyles = {
  pending: "border-accent-amber/20 bg-accent-amber/10 text-accent-amber",
  "in-progress": "border-accent-blue/20 bg-accent-blue/10 text-accent-blue",
  resolved: "border-accent-green/20 bg-accent-green/10 text-accent-green",
};

function AdminPanel() {
  const [complaints, setComplaints] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchComplaints();
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

  const assignComplaint = async (complaintId) => {
    const staffId = prompt("Enter Staff User ID");
    if (!staffId) return;

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
        <header className="animate-fade stagger-1">
          <h1 className="font-display text-3xl font-semibold">Admin Panel</h1>
          <p className="mt-2 text-sm text-text-muted">Manage and assign all hostel complaints</p>
        </header>

        <div className="animate-fade stagger-2 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
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
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-150 active:scale-[0.97] ${
                  filter === value
                    ? "bg-accent-blue text-white"
                    : "border border-border-dark bg-bg-surface text-text-muted hover:text-text-primary"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search complaints"
              className="w-full rounded-lg border border-border-dark bg-bg-surface py-2 pl-9 pr-3 text-sm text-text-primary outline-none placeholder:text-text-muted focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/30 md:w-64"
            />
          </div>
        </div>

        <div className="animate-fade stagger-3 overflow-hidden rounded-2xl border border-border-dark bg-bg-card shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px]">
              <thead className="bg-bg-secondary">
                <tr>
                  {["#", "Complaint", "Student", "Status", "Assign To", "Actions"].map((heading) => (
                    <th key={heading} className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredComplaints.map((complaint) => (
                  <tr key={complaint._id} className="border-t border-border-dark transition-colors hover:bg-white/[0.02]">
                    <td className="px-6 py-4 text-sm text-text-muted">{complaint._id?.slice(-6)}</td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium">{complaint.title}</p>
                      <span className="mt-1 inline-flex rounded-full border border-border-dark bg-bg-surface px-2.5 py-1 text-[11px] text-text-muted">
                        {complaint.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">{complaint.createdBy?.name}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold capitalize ${statusStyles[complaint.status] || ""}`}>
                        <span className={`h-1.5 w-1.5 rounded-full bg-current ${complaint.status === "in-progress" ? "status-pulse" : ""}`} />
                        {complaint.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-text-muted">
                      {complaint.assignedTo?.name || "Unassigned"}
                    </td>
                    <td className="px-6 py-4">
                      {complaint.status === "pending" ? (
                        <button
                          type="button"
                          onClick={() => assignComplaint(complaint._id)}
                          className="rounded-lg border border-accent-blue/20 bg-accent-blue/10 px-3 py-1.5 text-xs font-semibold text-accent-blue transition-all duration-150 hover:bg-accent-blue hover:text-white active:scale-[0.97]"
                        >
                          Assign
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => assignComplaint(complaint._id)}
                          className="rounded-lg border border-border-dark bg-bg-surface px-3 py-1.5 text-xs text-text-primary transition-all duration-150 hover:border-accent-blue/40 active:scale-[0.97]"
                        >
                          Reassign
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredComplaints.length === 0 && (
            <p className="px-6 py-10 text-center text-sm text-text-muted">No complaints available.</p>
          )}
        </div>
      </section>
    </Layout>
  );
}

export default AdminPanel;
