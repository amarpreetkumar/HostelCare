import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateComplaint from "./pages/CreateComplaint";
import MyComplaints from "./pages/MyComplaints";
import AdminPanel from "./pages/AdminPanel";
import Register from "./pages/Register";
import StaffPanel from "./pages/StaffPanel";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
               <Route path="/register" element={<Register />} />

       <Route
 path="/dashboard"
 element={
  <ProtectedRoute>
   <Dashboard />
  </ProtectedRoute>
 }
/>

<Route
 path="/create"
 element={
  <ProtectedRoute role="student">
   <CreateComplaint />
  </ProtectedRoute>
 }
/>

<Route
 path="/my-complaints"
 element={
  <ProtectedRoute role="student">
   <MyComplaints />
  </ProtectedRoute>
 }
/>

<Route
 path="/admin"
 element={
  <ProtectedRoute role="admin">
   <AdminPanel />
  </ProtectedRoute>
 }
/>

<Route
 path="/staff"
 element={
  <ProtectedRoute role="staff">
   <StaffPanel />
  </ProtectedRoute>
 }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
