import { AlertCircle, CheckCircle2, ClipboardList, Clock3, Info, Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Layout from "../components/Layout";
import API from "../services/api";

const statusColors = ["#F5A623", "#4F7EF7", "#22C97A"];

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-xl border border-border-dark bg-bg-card px-3 py-2 shadow-card">
      {label && <p className="text-xs text-text-muted">{label}</p>}
      <p className="text-sm font-semibold text-text-primary">{payload[0].value}</p>
    </div>
  );
}

function Dashboard() {
  const [complaints, setComplaints] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const role = (user?.role || "").toLowerCase();

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        let endpoint = "/complaints/my";
        if (role === "admin") endpoint = "/complaints";
        if (role === "staff") endpoint = "/complaints/staff";
        const res = await API.get(endpoint);
        setComplaints(Array.isArray(res.data) ? res.data : res.data?.complaints || []);
      } catch (error) {
        console.log("Dashboard fetch error:", error);
      }
    };

    fetchComplaints();
  }, [role]);

  const total = complaints.length;
  const pending = complaints.filter((item) => item.status === "pending").length;
  const inProgress = complaints.filter((item) => item.status === "in-progress").length;
  const resolved = complaints.filter((item) => item.status === "resolved").length;

  const chartData = [
    { name: "Pending", value: pending },
    { name: "In Progress", value: inProgress },
    { name: "Resolved", value: resolved },
  ];

  const categoryData = useMemo(() => {
    const grouped = complaints.reduce((acc, item) => {
      const key = item.category || "Other";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(grouped).map(([name, count]) => ({ name, count }));
  }, [complaints]);

  const stats = [
    { label: role === "staff" ? "Assigned" : "Total Complaints", value: total, color: "accent-blue", icon: ClipboardList, hint: role === "staff" ? "Assigned to you" : "All time submissions" },
    { label: "Pending", value: pending, color: "accent-amber", icon: Clock3, hint: "Awaiting review" },
    { label: "In Progress", value: inProgress, color: "accent-red", icon: AlertCircle, hint: "Currently active" },
    { label: "Resolved", value: resolved, color: "accent-green", icon: CheckCircle2, hint: "Completed requests" },
  ];

  return (
    <Layout>
      <section className="space-y-5">
        <header className="animate-fade stagger-1 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="font-display text-3xl font-semibold">
              {role === "admin" ? "Admin Dashboard" : "Dashboard"}
            </h1>
            <p className="mt-2 text-sm text-text-muted">Welcome back, {user?.name}</p>
          </div>
          {role === "student" && (
            <Link
              to="/create"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-accent-blue to-accent-purple px-4 py-3 text-sm font-medium text-white transition-all duration-150 hover:brightness-110 active:scale-[0.97]"
            >
              <Plus size={16} />
              New Complaint
            </Link>
          )}
        </header>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map(({ label, value, color, icon: Icon, hint }, index) => (
            <article
              key={label}
              className={`animate-fade stagger-${index + 2} relative overflow-hidden rounded-2xl border border-border-dark border-l-4 bg-bg-card p-5 shadow-card`}
              style={{ borderLeftColor: `var(--${color})` }}
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">{label}</p>
              <p className="mt-2 font-display text-3xl font-semibold" style={{ color: `var(--${color})` }}>
                {value}
              </p>
              <p className="mt-1 text-xs text-text-muted">{hint}</p>
              <Icon className="absolute right-4 top-1/2 -translate-y-1/2 opacity-5" size={48} />
            </article>
          ))}
        </div>

        <div className={`grid gap-5 ${role === "admin" ? "lg:grid-cols-2" : "lg:grid-cols-[minmax(0,1fr)_340px]"}`}>
          <article className="animate-fade stagger-5 rounded-2xl border border-border-dark bg-bg-card p-6 shadow-card">
            <h2 className="mb-4 text-sm font-semibold">Complaint Status Overview</h2>
            <div className="mb-4 flex flex-wrap gap-4">
              {chartData.map((item, index) => (
                <div key={item.name} className="flex items-center gap-2 text-xs text-text-muted">
                  <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: statusColors[index] }} />
                  {item.name} {item.value}
                </div>
              ))}
            </div>
            <div className="relative h-56">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={chartData} dataKey="value" innerRadius={70} outerRadius={100} paddingAngle={3}>
                    {chartData.map((entry, index) => (
                      <Cell key={entry.name} fill={statusColors[index]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display text-3xl font-semibold">{total}</span>
                <span className="text-xs text-text-muted">Total</span>
              </div>
            </div>
          </article>

          {role === "admin" ? (
            <article className="animate-fade stagger-6 rounded-2xl border border-border-dark bg-bg-card p-6 shadow-card">
              <h2 className="mb-5 text-sm font-semibold">Resolution Rate by Category</h2>
              {[
                ["Electricity", "67%", "bg-accent-blue"],
                ["Water/Plumbing", "50%", "bg-accent-teal"],
                ["Cleaning", "100%", "bg-accent-green"],
                ["Furniture", "0%", "bg-accent-red"],
              ].map(([label, value, color]) => (
                <div key={label} className="mb-5 last:mb-0">
                  <div className="mb-2 flex justify-between text-sm">
                    <span>{label}</span>
                    <span className="text-text-muted">{value}</span>
                  </div>
                  <div className="h-2 rounded-full bg-bg-surface">
                    <div className={`h-2 rounded-full transition-all duration-700 ${color}`} style={{ width: value }} />
                  </div>
                </div>
              ))}
            </article>
          ) : (
            <article className="animate-fade stagger-6 rounded-2xl border border-border-dark bg-bg-card p-6 shadow-card">
              <h2 className="mb-4 text-sm font-semibold">By Category</h2>
              <div className="h-64">
                <ResponsiveContainer>
                  <BarChart data={categoryData}>
                    <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis dataKey="name" tick={{ fill: "#8B95A8", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#8B95A8", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="count" fill="#4F7EF7" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </article>
          )}
        </div>

        {role === "student" && (
          <article className="animate-fade stagger-6 rounded-2xl border border-border-dark bg-bg-card p-6 shadow-card">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <h2 className="text-sm font-semibold">Complaint Lifecycle</h2>
              <span className="text-xs text-text-muted">Fan&apos;s Issue #HC-006</span>
            </div>
            <div className="mt-6 grid gap-5 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] md:items-start">
              {[
                ["Submitted", "May 14", "done"],
                ["Reviewed", "May 14", "done"],
                ["Assigned", "May 15", "active"],
                ["Resolved", "Waiting", "waiting"],
              ].map(([label, date, state], index) => (
                <div key={label} className="contents">
                  <div className="flex flex-col items-center text-center">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                        state === "done"
                          ? "border-accent-green bg-accent-green/15 text-accent-green"
                          : state === "active"
                            ? "border-accent-blue bg-accent-blue/15 text-accent-blue"
                            : "border-border-dark bg-bg-surface text-text-muted"
                      }`}
                    >
                      {state === "done" ? <CheckCircle2 size={18} /> : state === "active" ? <Clock3 size={18} /> : <AlertCircle size={18} />}
                    </div>
                    <p className="mt-3 text-xs font-medium">{label}</p>
                    <p className="mt-1 text-[10px] text-text-muted">{date}</p>
                  </div>
                  {index < 3 && (
                    <div
                      className={`hidden h-0.5 self-start md:mt-5 md:block ${
                        index === 0 ? "bg-accent-green" : index === 1 ? "bg-gradient-to-r from-accent-green to-accent-blue" : "border-t border-dashed border-border-dark"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-accent-blue/20 bg-accent-blue/[0.08] p-3 text-sm text-text-primary">
              <Info className="mt-0.5 shrink-0 text-accent-blue" size={16} />
              <p>Your complaint is In Progress. Staff member Raj Kumar has been assigned and is working on the issue.</p>
            </div>
          </article>
        )}
      </section>
    </Layout>
  );
}

export default Dashboard;
