// src/components/RoleRoute.jsx
import { Navigate } from "react-router-dom";

const RoleRoute = ({ children, role }) => {
  const userRole = localStorage.getItem("role");

  if (userRole !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RoleRoute;
