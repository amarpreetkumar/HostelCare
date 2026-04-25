import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../services/api";
import toast from "react-hot-toast";

function AdminPanel(){

const [complaints,setComplaints] = useState([]);

useEffect(()=>{
 fetchComplaints();
},[]);

const fetchComplaints = async () => {

 try{

  const res = await API.get("/complaints");

  setComplaints(res.data);

 }catch(error){
  console.log(error);
  toast.error("Failed to load complaints");
 }

};

const assignComplaint = async (complaintId) => {

 const staffId = prompt("Enter Staff User ID");

 if(!staffId) return;

 try{

  await API.put("/complaints/assign",{
   complaintId,
   staffId
  });

  toast.success("Complaint assigned successfully");

  fetchComplaints();

 }catch(error){

  console.log(error);
  toast.error("Assignment failed");

 }

};

return(

<Layout>

<div className="p-8">

{/* Header */}

<h1 className="text-3xl font-bold mb-2">
Admin Panel
</h1>

<p className="text-gray-500 mb-8">
Manage hostel maintenance complaints and assign staff.
</p>


{/* Empty State */}

{complaints.length === 0 && (

<p className="text-center text-gray-500 py-10">
No complaints available.
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


{/* Student Info */}

<p className="text-sm text-gray-500 mb-4">
Student: 
<span className="font-medium text-gray-700 ml-1">
{c.createdBy?.name}
</span>
</p>


{/* Assign Button */}

{c.status === "pending" && (

<button
 onClick={()=>assignComplaint(c._id)}
 className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm transition"
>
Assign Staff
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

export default AdminPanel;