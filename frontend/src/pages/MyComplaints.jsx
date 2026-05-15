import { Inbox, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ComplaintCard from "../components/ComplaintCard";
import Layout from "../components/Layout";
import SkeletonCard from "../components/SkeletonCard";
import API from "../services/api";

function MyComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await API.get("/complaints/my");
      setComplaints(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredComplaints = complaints.filter((item) => {
    const matchesStatus = filter === "all" || item.status === filter;
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <Layout>
      <section className="space-y-5">
        <header className="animate-fadeup delay-1 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="font-display text-3xl font-semibold">My Complaints</h1>
            <p className="mt-2 text-sm text-text-mid">Track all submitted complaints</p>
          </div>
          <Link
            to="/create"
            className="inline-flex cursor-pointer items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-all duration-150 hover:brightness-110 active:scale-[0.97]"
            style={{ background: "linear-gradient(135deg,#FF6B35,#E85A25)", boxShadow: "0 2px 12px rgba(255,107,53,0.3)" }}
          >
            New Complaint
          </Link>
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
              type="text"
              placeholder="Search complaints..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-border-soft bg-subtle py-2.5 pl-9 pr-3 text-sm text-text-high outline-none transition-all duration-150 placeholder:text-text-low focus:border-primary focus:ring-2 focus:ring-[rgba(255,107,53,0.15)] md:w-64"
            />
          </div>
        </div>

        {loading && (
          <div className="grid gap-4 md:grid-cols-2">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        )}

        {!loading && filteredComplaints.length === 0 && (
          <div className="animate-fadeup delay-3 mt-16 text-center">
            <Inbox className="mx-auto mb-3 text-text-low" size={64} />
            <p className="text-sm text-text-mid">No complaints found</p>
            <button
              type="button"
              onClick={() => {
                setFilter("all");
                setSearch("");
              }}
              className="mt-4 cursor-pointer rounded-xl border border-border-soft bg-overlay px-3 py-2 text-sm text-text-mid transition-all duration-150 hover:border-border-med hover:text-text-high active:scale-[0.97]"
            >
              Clear filters
            </button>
          </div>
        )}

        {!loading && filteredComplaints.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2">
            {filteredComplaints.map((complaint) => (
              <ComplaintCard key={complaint._id} complaint={complaint} />
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}

export default MyComplaints;
