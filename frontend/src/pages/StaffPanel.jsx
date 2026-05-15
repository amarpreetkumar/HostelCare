import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Layout from "../components/Layout";
import API from "../services/api";

const statusStyles = {
  pending: "border-accent-amber/20 bg-accent-amber/10 text-accent-amber",
  "in-progress": "border-accent-blue/20 bg-accent-blue/10 text-accent-blue",
  resolved: "border-accent-green/20 bg-accent-green/10 text-accent-green",
};

function StaffPanel() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await API.get("/complaints/staff");
      setComplaints(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load complaints");
    }
  };

  const markResolved = async (complaintId) => {
    try {
      await API.put("/complaints/status", { complaintId, status: "resolved" });
      toast.success("Complaint resolved successfully");
      fetchComplaints();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update complaint");
    }
  };

  return (
    <Layout>
      <section className="space-y-5">
        <header className="animate-fade stagger-1">
          <h1 className="font-display text-3xl font-semibold">Staff Panel</h1>
          <p className="mt-2 text-sm text-text-muted">View and resolve complaints assigned to you</p>
        </header>

        {complaints.length === 0 && (
          <p className="animate-fade stagger-2 py-10 text-center text-sm text-text-muted">No assigned complaints.</p>
        )}

        <div className="grid gap-4 lg:grid-cols-2">
          {complaints.map((complaint, index) => (
            <article
              key={complaint._id}
              className={`animate-fade stagger-${Math.min(index + 2, 6)} rounded-2xl border bg-bg-card p-5 shadow-card ${
                complaint.status === "in-progress"
                  ? "border-accent-blue/40 shadow-[0_0_0_1px_rgba(79,126,247,0.15)]"
                  : "border-border-dark"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-sm font-semibold">{complaint.title}</h2>
                <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold capitalize ${statusStyles[complaint.status] || ""}`}>
                  <span className={`h-1.5 w-1.5 rounded-full bg-current ${complaint.status === "in-progress" ? "status-pulse" : ""}`} />
                  {complaint.status}
                </span>
              </div>

              <p className="mt-2 text-xs leading-relaxed text-text-muted">{complaint.description}</p>

              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full border border-border-dark bg-bg-surface px-2.5 py-1 text-[11px] text-text-muted">
                  {complaint.category}
                </span>
              </div>

              {complaint.status === "resolved" ? (
                <div className="mt-4 flex items-center gap-1.5 text-xs text-accent-green">
                  <CheckCircle2 size={14} />
                  Resolved
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => markResolved(complaint._id)}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-accent-green to-accent-teal py-2.5 text-sm font-medium text-white transition-all duration-150 hover:brightness-110 active:scale-[0.97]"
                >
                  <CheckCircle2 size={16} />
                  Mark as Resolved
                </button>
              )}
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}

export default StaffPanel;
