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
        <header className="animate-fade stagger-1 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="font-display text-3xl font-semibold">My Complaints</h1>
            <p className="mt-2 text-sm text-text-muted">Track all submitted complaints</p>
          </div>
          <Link
            to="/create"
            className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-accent-blue to-accent-purple px-4 py-3 text-sm font-medium text-white transition-all duration-150 hover:brightness-110 active:scale-[0.97]"
          >
            New Complaint
          </Link>
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
              type="text"
              placeholder="Search complaints..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-border-dark bg-bg-surface py-2 pl-9 pr-3 text-sm text-text-primary outline-none placeholder:text-text-muted focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/30 md:w-64"
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
          <div className="animate-fade stagger-3 mt-16 text-center">
            <Inbox className="mx-auto mb-3 text-text-muted" size={64} />
            <p className="text-sm text-text-muted">No complaints found</p>
            <button
              type="button"
              onClick={() => {
                setFilter("all");
                setSearch("");
              }}
              className="mt-4 rounded-lg border border-border-dark bg-bg-surface px-4 py-2 text-sm text-text-primary transition-all duration-150 hover:border-accent-blue/40 active:scale-[0.97]"
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
