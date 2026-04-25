import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";
import ComplaintCard from "../components/ComplaintCard";
import SkeletonCard from "../components/SkeletonCard";

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

 const filteredComplaints = complaints.filter((c) => {

  const matchesStatus =
   filter === "all" || c.status === filter;

  const matchesSearch =
   c.title.toLowerCase().includes(search.toLowerCase());

  return matchesStatus && matchesSearch;

 });

 return (

<Layout>

<div className="p-6">

<h1 className="text-2xl font-bold mb-6">
My Complaints
</h1>

{/* Search */}

<input
 type="text"
 placeholder="Search complaints..."
 value={search}
 onChange={(e) => setSearch(e.target.value)}
 className="w-full border p-2 rounded mb-4"
/>

{/* Filters */}

<div className="flex gap-3 mb-6">

<button
 onClick={() => setFilter("all")}
 className={`px-3 py-1 rounded ${
  filter === "all" ? "bg-gray-400 text-white" : "bg-gray-200"
 }`}
>
 All
</button>

<button
 onClick={() => setFilter("pending")}
 className={`px-3 py-1 rounded ${
  filter === "pending" ? "bg-yellow-500 text-white" : "bg-yellow-200"
 }`}
>
 Pending
</button>

<button
 onClick={() => setFilter("in-progress")}
 className={`px-3 py-1 rounded ${
  filter === "in-progress" ? "bg-blue-500 text-white" : "bg-blue-200"
 }`}
>
 In Progress
</button>

<button
 onClick={() => setFilter("resolved")}
 className={`px-3 py-1 rounded ${
  filter === "resolved" ? "bg-green-500 text-white" : "bg-green-200"
 }`}
>
 Resolved
</button>

</div>

{/* Loading Skeleton */}

{loading && (

<div className="grid md:grid-cols-2 gap-4">

<SkeletonCard />
<SkeletonCard />
<SkeletonCard />
<SkeletonCard />

</div>

)}

{/* Empty State */}

{!loading && filteredComplaints.length === 0 && (

<div className="text-center mt-10">

<p className="text-5xl mb-3">📭</p>

<p className="text-gray-500 text-lg">
 No complaints found
</p>

</div>

)}

{/* Complaints List */}

{!loading && filteredComplaints.length > 0 && (

<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

{filteredComplaints.map((c) => (
 <ComplaintCard key={c._id} complaint={c} />
))}

</div>

)}

</div>

</Layout>

 );

}

export default MyComplaints;