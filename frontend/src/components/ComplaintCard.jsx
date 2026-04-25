import { useState } from "react";
function ComplaintCard({ complaint }) {

 let statusColor = "bg-gray-500";

 if (complaint.status === "pending") {
   statusColor = "bg-yellow-500";
 }

 if (complaint.status === "in-progress") {
   statusColor = "bg-blue-500";
 }

 if (complaint.status === "resolved") {
   statusColor = "bg-green-500";
 }
const [showImage, setShowImage] = useState(false);
 return (

<div className="bg-white shadow-md rounded-xl p-5 mb-5 border hover:shadow-lg transition">

{/* top row */}
<div className="flex justify-between items-center mb-2">

<h3 className="text-lg font-semibold">
 {complaint.title}
</h3>

<span className={`${statusColor} text-white text-xs px-3 py-1 rounded-full`}>
 {complaint.status}
</span>

</div>


{/* description */}
<p className="text-gray-600 text-sm mb-3">
 {complaint.description}
</p>


{/* category */}
<div className="mb-3">
<span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">
 Category: {complaint.category}
</span>
</div>


{/* image */}
{complaint.image && (

<img
 src={`http://localhost:5000/${complaint.image}`}
 alt="complaint"
 className="rounded-lg w-full max-h-52 object-cover cursor-pointer"
 onClick={() => setShowImage(true)}
/>
)}


{showImage && (

<div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">

<div className="relative">

<button
 onClick={() => setShowImage(false)}
 className="absolute top-2 right-2 bg-white rounded-full px-3 py-1 shadow"
>
 ✕
</button>

<img
 src={`http://localhost:5000/${complaint.image}`}
 alt="preview"
 className="max-h-[80vh] rounded-lg"
/>

</div>

</div>

)}
</div>



)

}

export default ComplaintCard;