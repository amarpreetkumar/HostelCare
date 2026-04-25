import Layout from "../components/Layout";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import {
  ClipboardList,
  AlertTriangle,
  Clock,
  CheckCircle
} from "lucide-react";

import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {

const [total, setTotal] = useState(0);
const [pending, setPending] = useState(0);
const [inProgress, setInProgress] = useState(0);
const [resolved, setResolved] = useState(0);

const user = JSON.parse(localStorage.getItem("user"));

useEffect(() => {
  fetchComplaints();
}, []);

const fetchComplaints = async () => {
  try {
    // Debug logs
    console.log("User from localStorage:", user);

    // Normalize role to avoid case issues like "Admin" vs "admin"
    const role = (user?.role || "").toLowerCase();

    let endpoint = "/complaints/my"; // default (student)

    if (role === "admin") {
      endpoint = "/complaints";
    } else if (role === "staff") {
      endpoint = "/complaints/staff";
    }

    console.log("Dashboard endpoint:", endpoint);

    const res = await API.get(endpoint);

    // Some backends return { complaints: [...] }, some return [...]
    const complaints = Array.isArray(res.data)
      ? res.data
      : res.data?.complaints || [];

    console.log("Fetched complaints:", complaints);

    setTotal(complaints.length);

    setPending(
      complaints.filter(c => c.status === "pending").length
    );

    setInProgress(
      complaints.filter(c => c.status === "in-progress").length
    );

    setResolved(
      complaints.filter(c => c.status === "resolved").length
    );

  } catch (error) {
    console.log("Dashboard fetch error:", error);
  }
};

const chartData = [
  { name: "Pending", value: pending },
  { name: "In Progress", value: inProgress },
  { name: "Resolved", value: resolved }
];

const COLORS = ["#facc15", "#3b82f6", "#22c55e"];

return (

<Layout>

<div className="p-8">

{/* Header */}

<h1 className="text-3xl font-bold text-gray-800 mb-2">
Dashboard
</h1>

<p className="text-gray-500 mb-8">
Welcome back, <span className="font-semibold">{user.name}</span>
</p>


{/* Statistics Cards */}

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

{/* Total Complaints */}

<div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white p-6 rounded-xl shadow flex justify-between items-center hover:scale-[1.02] transition">

<div>
<p className="text-sm opacity-80">Total Complaints</p>
<p className="text-3xl font-bold">{total}</p>
</div>

<ClipboardList size={32} />

</div>


{/* Pending */}

<div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white p-6 rounded-xl shadow flex justify-between items-center hover:scale-[1.02] transition">

<div>
<p className="text-sm opacity-80">Pending</p>
<p className="text-3xl font-bold">{pending}</p>
</div>

<AlertTriangle size={32} />

</div>


{/* In Progress */}

<div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow flex justify-between items-center hover:scale-[1.02] transition">

<div>
<p className="text-sm opacity-80">In Progress</p>
<p className="text-3xl font-bold">{inProgress}</p>
</div>

<Clock size={32} />

</div>


{/* Resolved */}

<div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-xl shadow flex justify-between items-center hover:scale-[1.02] transition">

<div>
<p className="text-sm opacity-80">Resolved</p>
<p className="text-3xl font-bold">{resolved}</p>
</div>

<CheckCircle size={32} />

</div>

</div>


{/* Chart Section */}

<div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">

<h2 className="text-lg font-semibold mb-4">
Complaint Status Overview
</h2>

<div className="w-full h-72">

<ResponsiveContainer>

<PieChart>

<Pie
 data={chartData}
 dataKey="value"
 nameKey="name"
 cx="50%"
 cy="50%"
 outerRadius={100}
 label
>

{chartData.map((entry, index) => (
  <Cell key={index} fill={COLORS[index]} />
))}

</Pie>

<Tooltip />

</PieChart>

</ResponsiveContainer>

</div>

</div>

</div>

</Layout>

);

}

export default Dashboard;