import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Register(){

 const [name,setName] = useState("");
 const [email,setEmail] = useState("");
 const [password,setPassword] = useState("");

 const navigate = useNavigate();

 const handleRegister = async (e) => {

  e.preventDefault();

  try{

   await API.post("/auth/register",{
    name,
    email,
    password,
    role:"student"
   });

   alert("Registration successful");

   navigate("/");

  }catch(error){

   alert(error.response?.data?.message || "Registration failed");

  }

 };

 return(

 <div className="min-h-screen flex items-center justify-center bg-gray-100">

  <div className="bg-white shadow-lg rounded-lg p-8 w-96">

   <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
    HostelCare
   </h1>

   <p className="text-center text-gray-500 mb-6">
    Create a new account
   </p>

   <form onSubmit={handleRegister} className="space-y-4">

    <input
     type="text"
     placeholder="Full Name"
     value={name}
     onChange={(e)=>setName(e.target.value)}
     className="w-full border rounded p-2"
    />

    <input
     type="email"
     placeholder="Email"
     value={email}
     onChange={(e)=>setEmail(e.target.value)}
     className="w-full border rounded p-2"
    />

    <input
     type="password"
     placeholder="Password"
     value={password}
     onChange={(e)=>setPassword(e.target.value)}
     className="w-full border rounded p-2"
    />

    <button
     type="submit"
     className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
    >
     Register
    </button>

<p className="text-sm text-center mt-4">
 Already have an account?{" "}
 <a href="/" className="text-blue-600 font-medium">
  Login
 </a>
</p>
   </form>

  </div>

 </div>

 )

}

export default Register;