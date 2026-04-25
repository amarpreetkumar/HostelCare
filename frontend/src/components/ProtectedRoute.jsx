import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {

 const user = JSON.parse(localStorage.getItem("user"));

 // not logged in
 if (!user) {
  return <Navigate to="/" />;
 }

 // role restriction
 if (role && user.role !== role) {
  return <Navigate to="/dashboard" />;
 }

 return children;
}

export default ProtectedRoute;