import { CheckCircle2, X } from "lucide-react";
import { useState } from "react";

const statusStyles = {
  pending: "border border-[#FFAA0030] bg-[#FFAA0018] text-[#FFAA00]",
  "in-progress": "border border-[#FF537030] bg-[#FF537018] text-[#FF5370]",
  resolved: "border border-[#3ECF8E30] bg-[#3ECF8E18] text-[#3ECF8E]",
};

function ComplaintCard({ complaint }) {
  const [showImage, setShowImage] = useState(false);
  const statusClass = statusStyles[complaint.status] || "border-border-soft bg-subtle text-text-mid";

  return (
    <>
      <article className="animate-fadeup rounded-card border border-border-soft bg-elevated p-5 shadow-card transition-all duration-150 hover:border-border-med">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-base font-semibold text-text-high">{complaint.title}</h3>
          <span className={`inline-flex items-center gap-1.5 rounded-pill px-2.5 py-[3px] text-[11px] font-semibold capitalize ${statusClass}`}>
            <span className={`h-1.5 w-1.5 rounded-full bg-current ${complaint.status === "in-progress" ? "dot-pulse" : ""}`} />
            {complaint.status}
          </span>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-text-mid">{complaint.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-pill border border-border-soft bg-subtle px-2.5 py-1 text-[11px] text-text-mid">
            {complaint.category}
          </span>
          {complaint.assignedTo?.name && (
            <span className="rounded-pill border border-border-soft bg-subtle px-2.5 py-1 text-[11px] text-text-mid">
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
          <div className="mt-4 flex items-center gap-1.5 text-xs text-success">
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
              className="absolute right-3 top-3 cursor-pointer rounded-full bg-elevated p-2 text-text-high shadow-card transition-all duration-150 active:scale-[0.97]"
            >
              <X size={16} />
            </button>
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/${complaint.image}`}
              alt="preview"
              className="max-h-[80vh] rounded-xl border border-border-soft"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default ComplaintCard;
