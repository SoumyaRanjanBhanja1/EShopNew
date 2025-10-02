import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  let user = null;
  try {
    const stored = localStorage.getItem("user");
    if (stored && stored !== "undefined") {
      user = JSON.parse(stored);
    }
  } catch (err) {
    console.error("Error parsing user from localStorage:", err);
  }

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;