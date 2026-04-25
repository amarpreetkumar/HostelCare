import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../services/api";
import toast from "react-hot-toast";

function StaffPanel(){

const [complaints,setComplaints] = useState([]);

useEffect(()=>{
 fetchComplaints();
},[]);

const fetchComplaints = async () => {

 try{

  const res = await API.get("/complaints/staff");

  setComplaints(res.data);

 }catch(error){

  console.log(error);
  toast.error("Failed to load complaints");

 }

};

const markResolved = async (complaintId) => {

 try{

  await API.put("/complaints/status",{
   complaintId,
   status:"resolved"
  });

  toast.success("Complaint resolved successfully");

  fetchComplaints();

 }catch(error){

  console.log(error);
  toast.error("Failed to update complaint");

 }

};

return(

<Layout>

<div className="p-8">

{/* Header */}

<h1 className="text-3xl font-bold mb-2">
Staff Panel
</h1>

<p className="text-gray-500 mb-8">
View and resolve maintenance complaints assigned to you.
</p>


{/* Empty State */}

{complaints.length === 0 && (

<p className="text-center text-gray-500 py-10">
No assigned complaints.
</p>

)}


{/* Complaint Grid */}

<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

{complaints.map((c)=>{

let statusColor = "bg-gray-500";

if(c.status === "pending") statusColor = "bg-yellow-500";
if(c.status === "in-progress") statusColor = "bg-blue-500";
if(c.status === "resolved") statusColor = "bg-green-500";

return(

<div
 key={c._id}
 className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-xl transition"
>

{/* Header */}

<div className="flex justify-between items-center mb-3">

<h3 className="text-lg font-semibold text-gray-800">
{c.title}
</h3>

<span className={`${statusColor} text-white text-xs px-3 py-1 rounded-full capitalize`}>
{c.status}
</span>

</div>


{/* Description */}

<p className="text-gray-600 text-sm mb-4">
{c.description}
</p>


{/* Action Button */}

{c.status !== "resolved" && (

<button
 onClick={()=>markResolved(c._id)}
 className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition"
>
Mark as Resolved
</button>

)}

</div>

)

})}

</div>

</div>

</Layout>

)

}

export default StaffPanel;