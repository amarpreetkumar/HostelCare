import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Layout from "../components/Layout";
import API from "../services/api";

const statusStyles = {
  pending: "border border-[#FFAA0030] bg-[#FFAA0018] text-[#FFAA00]",
  "in-progress": "border border-[#FF537030] bg-[#FF537018] text-[#FF5370]",
  resolved: "border border-[#3ECF8E30] bg-[#3ECF8E18] text-[#3ECF8E]",
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
        <header className="animate-fadeup delay-1">
          <h1 className="font-display text-3xl font-semibold">Staff Panel</h1>
          <p className="mt-2 text-sm text-text-mid">View and resolve complaints assigned to you</p>
        </header>

        {complaints.length === 0 && (
          <p className="animate-fadeup delay-2 py-10 text-center text-sm text-text-mid">No assigned complaints.</p>
        )}

        <div className="grid gap-4 lg:grid-cols-2">
          {complaints.map((complaint, index) => (
            <article
              key={complaint._id}
              className={`animate-fadeup delay-${Math.min(index + 2, 6)} rounded-card border bg-elevated p-5 shadow-card transition-all duration-150 hover:border-border-med ${
                complaint.status === "in-progress"
                  ? "border-primary/40 shadow-[0_0_0_1px_rgba(255,107,53,0.1),0_4px_24px_rgba(255,107,53,0.08)]"
                  : "border-border-soft"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-sm font-semibold">{complaint.title}</h2>
                <span className={`inline-flex items-center gap-1.5 rounded-pill px-2.5 py-[3px] text-[11px] font-semibold capitalize ${statusStyles[complaint.status] || ""}`}>
                  <span className={`h-1.5 w-1.5 rounded-full bg-current ${complaint.status === "in-progress" ? "dot-pulse" : ""}`} />
                  {complaint.status}
                </span>
              </div>

              <p className="mt-2 text-xs leading-relaxed text-text-mid">{complaint.description}</p>

              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-pill border border-border-soft bg-subtle px-2.5 py-1 text-[11px] text-text-mid">
                  {complaint.category}
                </span>
              </div>

              {complaint.status === "resolved" ? (
                <div className="mt-4 flex items-center gap-1.5 text-xs text-success">
                  <CheckCircle2 size={14} />
                  Resolved
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => markResolved(complaint._id)}
                  className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-white transition-all duration-150 hover:brightness-110 active:scale-[0.97]"
                  style={{ background: "linear-gradient(135deg,#3ECF8E,#2BB57E)" }}
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
