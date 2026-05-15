import { CheckCircle2, X } from "lucide-react";
import { useState } from "react";

const statusStyles = {
  pending: "border-accent-amber/20 bg-accent-amber/10 text-accent-amber",
  "in-progress": "border-accent-blue/20 bg-accent-blue/10 text-accent-blue",
  resolved: "border-accent-green/20 bg-accent-green/10 text-accent-green",
};

function ComplaintCard({ complaint }) {
  const [showImage, setShowImage] = useState(false);
  const statusClass = statusStyles[complaint.status] || "border-border-dark bg-bg-surface text-text-muted";

  return (
    <>
      <article className="animate-fade rounded-2xl border border-border-dark bg-bg-card p-5 shadow-card">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-base font-semibold text-text-primary">{complaint.title}</h3>
          <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold capitalize ${statusClass}`}>
            <span className={`h-1.5 w-1.5 rounded-full bg-current ${complaint.status === "in-progress" ? "status-pulse" : ""}`} />
            {complaint.status}
          </span>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-text-muted">{complaint.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full border border-border-dark bg-bg-surface px-2.5 py-1 text-[11px] text-text-muted">
            {complaint.category}
          </span>
          {complaint.assignedTo?.name && (
            <span className="rounded-full border border-border-dark bg-bg-surface px-2.5 py-1 text-[11px] text-text-muted">
              Assigned to {complaint.assignedTo.name}
            </span>
          )}
        </div>

        {complaint.image && (
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/${complaint.image}`}
            alt="complaint"
            className="mt-4 max-h-32 w-full cursor-pointer rounded-xl object-cover"
            onClick={() => setShowImage(true)}
          />
        )}

        {complaint.status === "resolved" && (
          <div className="mt-4 flex items-center gap-1.5 text-xs text-accent-green">
            <CheckCircle2 size={14} />
            Resolved
          </div>
        )}
      </article>

      {showImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setShowImage(false)}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setShowImage(false)}
              className="absolute right-3 top-3 rounded-full bg-bg-card p-2 text-text-primary shadow-card transition-all duration-150 active:scale-[0.97]"
            >
              <X size={16} />
            </button>
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/${complaint.image}`}
              alt="preview"
              className="max-h-[80vh] rounded-xl border border-border-dark"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default ComplaintCard;
