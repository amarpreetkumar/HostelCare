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

const statusColors = ["#FFAA00", "#FF5370", "#3ECF8E"];

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-[10px] border border-border-soft bg-overlay px-3 py-2 shadow-card">
      {label && <p className="text-[11px] text-text-mid">{label}</p>}
      <p className="text-[13px] font-semibold text-text-high">{payload[0].value}</p>
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
    { label: role === "staff" ? "Assigned" : "Total Complaints", value: total, border: "border-l-[#FF6B35]", text: "text-primary", icon: ClipboardList, hint: role === "staff" ? "Assigned to you" : "All time submissions" },
    { label: "Pending", value: pending, border: "border-l-[#FFAA00]", text: "text-secondary", icon: Clock3, hint: "Awaiting review" },
    { label: "In Progress", value: inProgress, border: "border-l-[#FF5370]", text: "text-danger", icon: AlertCircle, hint: "Currently active" },
    { label: "Resolved", value: resolved, border: "border-l-[#3ECF8E]", text: "text-success", icon: CheckCircle2, hint: "Completed requests" },
  ];

  const latestComplaint = complaints[0];

  const formatDate = (value) =>
    value
      ? new Date(value).toLocaleDateString("en-IN", {
          month: "short",
          day: "numeric",
        })
      : "Waiting";

  const lifecycleSteps = useMemo(() => {
    if (!latestComplaint) return [];

    const isPending = latestComplaint.status === "pending";
    const isInProgress = latestComplaint.status === "in-progress";
    const isResolved = latestComplaint.status === "resolved";

    return [
      {
        label: "Submitted",
        date: formatDate(latestComplaint.createdAt),
        state: "done",
      },
      {
        label: "Reviewed",
        date: isPending ? "Waiting" : formatDate(latestComplaint.updatedAt),
        state: isPending ? "active" : "done",
      },
      {
        label: "Assigned",
        date: latestComplaint.assignedTo ? formatDate(latestComplaint.updatedAt) : "Waiting",
        state: isResolved ? "done" : isInProgress ? "active" : "waiting",
      },
      {
        label: "Resolved",
        date: isResolved ? formatDate(latestComplaint.updatedAt) : "Waiting",
        state: isResolved ? "done" : "waiting",
      },
    ];
  }, [latestComplaint]);

  const lifecycleMessage = useMemo(() => {
    if (!latestComplaint) return "";

    if (latestComplaint.status === "resolved") {
      return "This complaint has been resolved successfully.";
    }

    if (latestComplaint.status === "in-progress") {
      return `Your complaint is In Progress.${
        latestComplaint.assignedTo?.name ? ` Staff member ${latestComplaint.assignedTo.name} has been assigned.` : ""
      }`;
    }

    return "Your complaint has been submitted and is waiting for admin review.";
  }, [latestComplaint]);

  return (
    <Layout>
      <section className="space-y-5">
        <header className="animate-fadeup delay-1 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="font-display text-3xl font-semibold">
              {role === "admin" ? "Admin Dashboard" : "Dashboard"}
            </h1>
            <p className="mt-2 text-sm text-text-mid">Welcome back, {user?.name}</p>
          </div>
          {role === "student" && (
            <Link
              to="/create"
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-all duration-150 hover:brightness-110 active:scale-[0.97]"
              style={{ background: "linear-gradient(135deg,#FF6B35,#E85A25)", boxShadow: "0 2px 12px rgba(255,107,53,0.3)" }}
            >
              <Plus size={16} />
              New Complaint
            </Link>
          )}
        </header>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map(({ label, value, border, text, icon: Icon, hint }, index) => (
            <article
              key={label}
              className={`animate-fadeup delay-${index + 2} relative overflow-hidden rounded-card border border-border-soft border-l-4 bg-elevated p-5 shadow-card shadow-inner-soft ${border}`}
            >
              <p className="text-[11px] font-semibold uppercase tracking-widest text-text-low">{label}</p>
              <p className={`mt-2 font-display text-3xl font-semibold ${text}`}>
                {value}
              </p>
              <p className="mt-1 text-xs text-text-low">{hint}</p>
              <Icon className="absolute right-3 top-1/2 h-14 w-14 -translate-y-1/2 opacity-[0.04]" />
            </article>
          ))}
        </div>

        <div className={`grid gap-5 ${role === "admin" ? "lg:grid-cols-2" : "lg:grid-cols-[minmax(0,1fr)_340px]"}`}>
          <article className="animate-fadeup delay-5 rounded-card border border-border-soft bg-elevated p-6 shadow-card">
            <h2 className="mb-4 text-sm font-semibold">Complaint Status Overview</h2>
            <div className="mb-4 flex flex-wrap gap-4">
              {chartData.map((item, index) => (
                <div key={item.name} className="flex items-center gap-2 text-xs text-text-mid">
                  <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: statusColors[index] }} />
                  {item.name} {item.value}
                </div>
              ))}
            </div>
            <div className="relative h-56">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={chartData} dataKey="value" innerRadius={68} outerRadius={98} paddingAngle={3} stroke="none">
                    {chartData.map((entry, index) => (
                      <Cell key={entry.name} fill={statusColors[index]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display text-3xl font-semibold">{total}</span>
                <span className="text-xs text-text-mid">Total</span>
              </div>
            </div>
          </article>

          {role === "admin" ? (
            <article className="animate-fadeup delay-6 rounded-card border border-border-soft bg-elevated p-6 shadow-card">
              <h2 className="mb-5 text-sm font-semibold">Resolution Rate by Category</h2>
              {[
                ["Electricity", "67%", "bg-primary"],
                ["Water/Plumbing", "50%", "bg-info"],
                ["Cleaning", "100%", "bg-success"],
                ["Furniture", "0%", "bg-danger"],
              ].map(([label, value, color]) => (
                <div key={label} className="mb-5 last:mb-0">
                  <div className="mb-2 flex justify-between text-sm">
                    <span>{label}</span>
                    <span className="text-text-mid">{value}</span>
                  </div>
                  <div className="h-2 rounded-full bg-subtle">
                    <div className={`h-2 rounded-full transition-all duration-150 ${color}`} style={{ width: value }} />
                  </div>
                </div>
              ))}
            </article>
          ) : (
            <article className="animate-fadeup delay-6 rounded-card border border-border-soft bg-elevated p-6 shadow-card">
              <h2 className="mb-4 text-sm font-semibold">By Category</h2>
              <div className="h-64">
                <ResponsiveContainer>
                  <BarChart data={categoryData}>
                    <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
                    <XAxis dataKey="name" tick={{ fill: "#5C5C6E", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#5C5C6E", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="count" fill="#FF6B35" radius={[7, 7, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </article>
          )}
        </div>

        {role === "student" && latestComplaint && (
          <article className="animate-fadeup delay-6 rounded-card border border-border-soft bg-elevated p-6 shadow-card">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <h2 className="text-sm font-semibold">Complaint Lifecycle</h2>
              <span className="text-xs text-text-mid">
                {latestComplaint.title} #{latestComplaint._id?.slice(-6).toUpperCase()}
              </span>
            </div>
            <div className="mt-6 grid gap-5 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] md:items-start">
              {lifecycleSteps.map(({ label, date, state }, index) => (
                <div key={label} className="contents">
                  <div className="flex flex-col items-center text-center">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                        state === "done"
                          ? "border-success bg-[#3ECF8E18] text-success"
                          : state === "active"
                            ? "pulse-ember border-primary bg-[#FF6B3518] text-primary"
                            : "border-border-soft bg-subtle text-text-low"
                      }`}
                    >
                      {state === "done" ? <CheckCircle2 size={18} /> : state === "active" ? <Clock3 size={18} /> : <AlertCircle size={18} />}
                    </div>
                    <p className="mt-3 text-xs font-medium">{label}</p>
                    <p className="mt-1 text-[10px] text-text-low">{date}</p>
                  </div>
                  {index < 3 && (
                    <div
                      className={`hidden h-0.5 self-start md:mt-5 md:block ${
                        lifecycleSteps[index + 1].state === "done"
                          ? "bg-success"
                          : lifecycleSteps[index + 1].state === "active"
                            ? ""
                            : "bg-border-soft"
                      }`}
                      style={lifecycleSteps[index + 1].state === "active" ? { background: "linear-gradient(90deg,#3ECF8E,#FF6B35)" } : undefined}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-[#A78BFA30] bg-[#A78BFA18] p-3 text-sm text-info">
              <Info className="mt-0.5 shrink-0 text-info" size={16} />
              <p>{lifecycleMessage}</p>
            </div>
          </article>
        )}
      </section>
    </Layout>
  );
}

export default Dashboard;
